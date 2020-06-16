'user strict'

const Hapi     = require('hapi');
const mongoose = require("mongoose");

//require('./utils/database');
const server = Hapi.server({
  port: 4000,
  host: '192.168.1.154',
  routes: { 
    cors: true
    /*{
      origin:["192.168.1.154:4000", "192.168.1.154:8080", "localhost:4000", "localhost:8080"]
    }*/
  }
});

server.app.db = mongoose.connect(
  'mongodb://localhost/hapijstasks',
  { useNewUrlParser: true,
    useUnifiedTopology: true}
)

const init = async() => {
  await server.register(
    {plugin: require('./routes/tasks')},
    {
      routes: {
        prefix: '/api'
      }
    }
  )
  .catch(err => {
    console.log(err);
  })

  await server.start();
  console.log(`Server running at: ${server.info.uri}`)
}

init();


/*
const routes   = require('./routes');
const startServer = async () => {
  try {
    routes.forEach((route)=>{
      server.route(route);
    });
await server.start();
    console.log(`Server running at: ${server.info.uri}`);
  } catch (err) {
    console.error(err);
  }
};
startServer();
module.exports = server;
*/