const fs = require('fs');
fs.writeFileSync('db.json',`{
    "todos": [
      {
        "value": "Javascript",
        "status": false,
        "id": 1
      },
      {
        "value": "React",
        "status": false,
        "id": 2
      },
      {
        "value": "Angular",
        "status": false,
        "id": 3
      },
      {
        "value": "Vue",
        "status": false,
        "id": 4
      },
      {
        "value": "Solid",
        "status": false,
        "id": 5
      },
      {
        "value": "Svelte",
        "status": false,
        "id": 6
      }
    ]
  }`)

const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()


server.use(middlewares)
server.use(router)

server.listen(process.env.PORT, () => {
  console.log('JSON Server is running')
})