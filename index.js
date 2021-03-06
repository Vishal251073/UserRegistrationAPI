const http = require('http');
const app = require('./app');
const server = http.createServer(app);

const { PORT=3000, LOCAL_ADDRESS='0.0.0.0' } = process.env
server.listen(PORT, LOCAL_ADDRESS, () => {
  const address = server.address();
  console.log('server listening at', address);
});
// server.listen(5000);