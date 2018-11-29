import { Injectable, Bootstrappable } from '@zetapush/core';
import { Gda, GdaConfigurer, GdaDataType } from '@zetapush/platform-legacy';
import { TodoList, TodoItem } from './model';
import {
  TABLE_TODO_LISTS,
  COLUMN_TODO_LIST_INFO,
  COLUMN_TODO_LIST_ITEMS,
  COLUMN_TODO_ITEM_INFO,
  TABLE_TODO_ITEMS
} from './constants';
import { uuid } from './utils';

/**
 * # Goal of this sample: Show how to store objects indexed by keys
 *
 * The sample will provide an API to store and load data for a TODO list.
 * Each TODO list may have several TODO items.
 *
 * Each TODO items have the following format:
 * ```
 * {
 *   id: string;
 *   title: string;
 *   description?: string;
 *   creationDate: Date;
 *   done: boolean;
 *   doneDate?: Date;
 * }
 * ```
 *
 * Each TODO list has the following format:
 * ```
 * {
 *   id: string;
 *   name: string;
 * }
 * ```
 *
 *
 * # Use of ZetaPush Gda database service
 *
 * Each TODO item is stored in a Gda table and indexed by the generated identifier of the item.
 * That Gda table is named 'todoitems'.
 *
 * Another table is used to store TODO list data and also store association between a TODO list and the TODO items.
 * The Gda table for association is named 'todolists'.
 * The association table uses the TODO list generated id as key.
 *
 *
 * **NOTE**: This sample is voluntary more complex that it could be. The sample doesn't
 * show how to use Gda.range() method to make search on partial key.
 *
 * **NOTE**: This sample could be written differently for better performance for
 * lists that contain many many items. But this is not the aim of this sample.
 */
@Injectable()
export default class MyTodoApi implements Bootstrappable {
  constructor(private gdaConfigurer: GdaConfigurer, private gda: Gda) {}

  async onApplicationBootstrap() {
    /**
     * Create the table for the lists. Each TODO list has:
     * - A column for its own information
     * - A column for the associated items (identifiers)
     */
    this.gdaConfigurer.createTable({
      name: TABLE_TODO_LISTS,
      columns: [
        {
          // column for TODO list information
          name: COLUMN_TODO_LIST_INFO,
          type: GdaDataType.OBJECT
        },
        {
          // column for associated items
          name: COLUMN_TODO_LIST_ITEMS,
          type: GdaDataType.OBJECT
        }
      ]
    });
    /**
     * Create the table for the items. Each TODO item has only one
     * column for its own information.
     *
     * **NOTE**: we could also have one column per field.
     */
    this.gdaConfigurer.createTable({
      name: TABLE_TODO_ITEMS,
      columns: [
        {
          // column for TODO item information
          name: COLUMN_TODO_ITEM_INFO,
          type: GdaDataType.OBJECT
        }
      ]
    });
  }

  async newTodoList(name: string): Promise<TodoList> {
    // generate a unique identifier
    const id = uuid();
    // prepare TODO list info object to store
    const todoList: TodoList = {
      id,
      name
    };
    // we use `puts` here in order to add several columns at once
    // i.e. add several columns for one row
    await this.gda.puts({
      table: TABLE_TODO_LISTS,
      rows: [
        {
          key: id,
          data: {
            // store data for the first column (TODO list info)
            [COLUMN_TODO_LIST_INFO]: todoList,
            // store data for second column (associated TODO items, empty here)
            [COLUMN_TODO_LIST_ITEMS]: []
          }
        }
      ]
    });
    return todoList;
  }

  async addTodoItem({
    todolistId,
    title,
    description
  }: {
    todolistId: string;
    title: string;
    description?: string;
  }): Promise<TodoItem> {
    // generate a unique identifier
    const id = uuid();
    // prepare TODO item info object to store
    const todoItem: TodoItem = {
      id,
      title,
      description,
      creationDate: Date.now(),
      done: false
    };
    // store information about the TODO item
    await this.gda.put({
      table: TABLE_TODO_ITEMS,
      key: id,
      column: COLUMN_TODO_ITEM_INFO,
      data: todoItem
    });

    // retrieve current items associated to the TODO list
    const { result } = await this.gda.get({
      table: TABLE_TODO_LISTS,
      key: todolistId
    });
    if (!result) {
      throw new Error(`No matching TODO list with id ${todolistId}`);
    }
    // append the item to the list
    const itemIds: string[] = Array.from(result[COLUMN_TODO_LIST_ITEMS]);
    itemIds.push(id);
    // update the associated items in database
    await this.gda.put({
      table: TABLE_TODO_LISTS,
      key: todolistId,
      column: COLUMN_TODO_LIST_ITEMS,
      data: itemIds
    });

    return todoItem;
  }

  async markTodoItemDone(todoItemId: string): Promise<TodoItem> {
    // retrieve the object
    const { result } = await this.gda.get({
      table: TABLE_TODO_ITEMS,
      key: todoItemId
    });
    if (!result) {
      throw new Error(`No matching TODO item with id ${todoItemId}`);
    }
    const todoitem = result[COLUMN_TODO_ITEM_INFO];
    // update the item
    todoitem.done = true;
    todoitem.doneDate = Date.now();
    await this.gda.put({
      table: TABLE_TODO_ITEMS,
      key: todoItemId,
      column: COLUMN_TODO_ITEM_INFO,
      data: todoitem
    });
    return todoitem;
  }

  async getTodoLists(): Promise<TodoList[]> {
    // load the whole list (you could also request a particular page)
    const { result } = await this.gda.list({
      table: TABLE_TODO_LISTS
    });
    if (!result) {
      return [];
    }
    // results are paginated even if you ask for full list
    const pageContent = result.content;
    // extract only TODO list info (not associated items)
    return pageContent.map((row) => row[COLUMN_TODO_LIST_INFO]);
  }

  async getTodoListItems(todoListId: string): Promise<TodoItem[]> {
    // load list of associated items (ids only)
    const { result } = await this.gda.get({
      table: TABLE_TODO_LISTS,
      key: todoListId
    });
    if (!result) {
      throw new Error(`No matching TODO list with id ${todoListId}`);
    }
    const itemIds: string[] = Array.from(result[COLUMN_TODO_LIST_ITEMS]);
    // get each item from its id
    const itemsResponse = await this.gda.mget({
      table: TABLE_TODO_ITEMS,
      keys: itemIds
    });
    if (!itemsResponse.result) {
      return [];
    }
    // extract only TODO item info
    return itemsResponse.result.map((row) => row[COLUMN_TODO_ITEM_INFO]);
  }
}
