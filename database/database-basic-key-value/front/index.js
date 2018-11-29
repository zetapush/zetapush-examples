const client = new ZetaPushClient.WeakClient();
const api = client.createProxyTaskService();
client.connect().then(() => {
  // initial load
  load();
});

const todolists = [];
const todoitems = {};

const load = () => {
  api
    // Load TODO list
    .getTodoLists()
    // update lists in the vue
    .then((lists) => {
      todolists.splice(0, todolists.length, ...lists);
      return lists;
    })
    // load items for each list
    .then((lists) => Promise.all(lists.map((list) => api.getTodoListItems(list.id))))
    // update items the vue
    .then((items) => {
      todolists.forEach((list, index) => {
        console.log('set items of TODO list', list.name, 'with', items[index]);
        // Vue can't detect change on new properties => force it
        app.$set(app.todoitems, list.id, items[index]);
      });
    });
};

var app = new Vue({
  el: '#app',
  data: {
    todolists,
    todoitems,
    todolistName: ''
  },
  methods: {
    addTodoList: function() {
      api.newTodoList(this.todolistName).then(load);
      this.todolistName = '';
    },
    addTodoItem: function(todolistId) {
      const title = document.getElementById(todolistId + '-title').value;
      const desc = document.getElementById(todolistId + '-desc').value;
      api
        .addTodoItem({
          todolistId,
          title,
          description: desc
        })
        .then(load);
    },
    markDone: function(id) {
      api.markTodoItemDone(id).then(load);
    }
  }
});
