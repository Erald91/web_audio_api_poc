const express = require('express');
const path = require('path');

const app = express();

app.use('/', express.static(path.join(__dirname, '..', 'public')));

const server = app.listen(3001, () => {
  console.log('Server listening http://%s:%s', server.address().address, server.address().port);
});
