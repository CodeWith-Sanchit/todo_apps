# TODO Applications

We will build a simple TODO application using different libraries and frameworks using Javascript or Typescript.

- [x] JSON server to support the following CRUD Applications - Port:8080
---
- [x] Javascript (No Library / Framework) - Port:3001
- [x] React - Port:3002
- [x] Angular - Port:3003
- [x] Vue - Port:3004
- [x] Solid - Port:3005
- [x] Svelte - Port:3006

## Prerequisite

- API endpoind which support CRUD operations : JSON Server (https://www.npmjs.com/package/json-server), source code - ./todo_json_server

## Features

- List of TODO items
- Option to add TODO
- Option to delete TODO
- Option to Update TODO

## Developer Guide
- To install node modules and start all applications, run the following command
`npm run dev`

## Run with Docker
#### Build Docker image on Local dev env
- `docker build . -t todo_apps`

#### Pull from Github package registry
- `docker pull ghcr.io/codewith-sanchit/todo_apps:main`

#### Run
- `docker run -p 80:8080 -p 8080:8080 ghcr.io/codewith-sanchit/todo_apps:main`

#### Access the following applications in Browser
- Javascript - http://localhost/javascript/
- React - http://localhost/react/
- Angular - http://localhost/angular/
- Vue - http://localhost/vue/
- Solid - http://localhost/solid/
- Svelte - http://localhost/svelte/

- JSON Server - http://localhost:8080