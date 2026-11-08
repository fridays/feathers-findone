# feathers-findone

[![npm version](https://img.shields.io/npm/v/feathers-findone)](https://www.npmjs.com/package/feathers-findone) [![npm downloads](https://img.shields.io/npm/dm/feathers-findone)](https://www.npmjs.com/package/feathers-findone)

Adds a `.findOne()` method to services in [Feathers.js](https://github.com/feathersjs/feathers)

## Install

```bash
npm install feathers-findone
```

Configure on server and client:

```javascript
const findOne = require('feathers-findone')

app.configure(findOne())
```
Please note that you must configure *findOne* **before** any services are registered.

## Use

```javascript
app.service('messages').findOne({/* params */})
```
---
All it does is set `query.$limit = 1` on a copy of the params and return the first result of `.find()`, or `undefined` if there is none
