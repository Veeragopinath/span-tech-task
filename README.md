# Span Technologies task

## Initial Setup

use node version v16.15.1 above

# install dependencies

$ npm install

### Important: Use two different terminals for running the client server and the JSON server.

# Running the Development Server

To start the client development server, which listens on localhost:3000, run:

$ npm run dev

# Running the JSON Server

To start the JSON server, which listens on localhost:3001, run:

$ npm run json-server

# build for production and launch server

$ npm run build
$ npm run start



For detailed explanation on how things work, check out the [documentation](https://nuxtjs.org).

### `assets`

The assets directory contains your uncompiled assets such as Stylus or Sass files, images, or fonts.

### `components`

The components directory contains your Vue.js components. Components make up the different parts of your page and can be reused and imported into your pages, layouts and even other components.


### `pages`

This directory contains your application views and routes. Nuxt will read all the `*.vue` files inside this directory and setup Vue Router automatically.

### `plugins`

The plugins directory contains JavaScript plugins that you want to run before instantiating the root Vue.js Application. This is the place to add Vue plugins and to inject functions or constants. Every time you need to use `Vue.use()`, you should create a file in `plugins/` and add its path to plugins in `nuxt.config.js`.


### `db.json`

This file contains your data. The json-server will serve the data from the db.json file and Axios will be able to consume it.
```