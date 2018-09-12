# ZetaPush Celtia Example

## Goal of this sample: Show how to store objects indexed by keys

The sample will provide an API to store and load data for a TODO list.
Each TODO list may have several TODO items.

Each TODO items have the following format:

```
{
  id: string;
  title: string;
  description?: string;
  creationDate: Date;
  done: boolean;
  doneDate?: Date;
}
```

Each TODO list has the following format:

```
{
  id: string;
  name: string;
}
```

## Use of ZetaPush Gda database service

Each TODO item is stored in a Gda table and indexed by the generated identifier of the item.
That Gda table is named 'todoitems'.

Another table is used to store TODO list data and also store association between a TODO list and the TODO items.
The Gda table for association is named 'todolists'.
The association table uses the TODO list generated id as key.

**NOTE**: This sample is voluntary more complex that it could be. The sample doesn't
show how to use Gda.range() method to make search on partial key.

**NOTE**: This sample could be written differently for better performance for
lists that contain many many items. But this is not the aim of this sample.

## Installation

```console
npm install
```

## Run the sample

Run your code on your local platform

```console
npm run start -- --serve-front
```

## Project structure

```console
.
└──
  ├── front
  │  ├── todolist.css
  │  ├── index.html
  │  └── index.js
  ├── worker
  │  ├── constants.ts
  │  ├── model.ts
  │  ├── utils.ts
  │  └── index.js (exposed api implementation)
  └── package.json
```
