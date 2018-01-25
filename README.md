# feathers-findone

[![npm version](https://d25lcipzij17d.cloudfront.net/badge.svg?id=js&type=6&v=1.0.2&x2=0)](https://www.npmjs.com/package/feathers-findone)

Adds a `.findOne()` method to services in [Feathers.js v3](https://github.com/feathersjs/feathers)

## Install

```bash
npm install feathers-findone --save
```

Configure on server and client:

```javascript
const findOne = require('feathers-findone')

app.configure(findOne())
```

## Use

```javascript
app.service('messages').findOne({/* params */})
```
---
All it does is set `query.$limit = 1` to the params and return the first result of `.find()`
