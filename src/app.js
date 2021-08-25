const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const app = express();
const http = require('http');
const server = http.createServer(app);
const socketio = require('socket.io');
const io = socketio(server);

io.on('connection', socket => {
    socket.on('connected', () => {
        console.log("User connected");
    });
});

//settings
app.set('port', process.env.PORT || 8000)

//middlewares
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
// app.use(express.urlencoded({ extended: true}));
app.use(fileUpload());

//routes
app.use('/api/mails', require('./routes/mails'));
app.use('/api/buys', require('./routes/buys'));

module.exports = app;