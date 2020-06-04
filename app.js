const Hapi=require('hapi');
//Init server
const server = new Hapi.Server({ port: 3000, host: 'localhost' });
//Home route

server.route({
  method: 'GET',
  path: '/',
  handler: function (request, h) {
  return 'hello world';
    }
  });

// Start Server
server.start(err => {
    if (err) {
        // Fancy error handling here
        console.error(err);
        throw err;
    }
    console.log(`Server started at ${ server.info.uri }`);
});