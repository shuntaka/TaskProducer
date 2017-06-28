import amqp from 'amqplib';
import express from 'express';
import uuid from 'uuid/v1';
import bodyParser from 'body-parser';

let connection;
let channel;

const app = express();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.post('/RPA/createJob', (req, res) => {
  console.log(req.body);
  const jobObj = req.body;
  const jobId = uuid();
  channel.sendToQueue('jobs_queue',
    new Buffer(JSON.stringify(Object.assign(jobObj, { jobId }))));
  res.end('job created succesfully');
});

amqp
  .connect('amqp://localhost')
  .then((conn) => {
    connection = conn;
    return conn.createChannel();
  })
  .then((ch) => {
    channel = ch;
  })
  .then(() => {
    const server = app.listen(8081, '127.0.0.1', () => {
      const host = server.address().address;
      const port = server.address().port;
      console.log('running at http://' + host + ':' + port)
    });
  })
 .catch(console.warn);
