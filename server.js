const path = require('path');
const express = require('express');
const app = express();
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const env = require('dotenv').load();
const exphbs = require('express-handlebars');
const router  = express.Router();
const http = require('http').Server(app);
const io = require('socket.io')(http);
// BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Passport
app.use(
  session({ secret: 'rHUyjs6RmVOD06OdOTsVAyUUCxVXaWci', resave: true, saveUninitialized: true })
); // session secret
app.use(passport.initialize());
app.use(passport.session());

// Handlebars
const viewsPath = path.join(__dirname, 'views');
const layoutsPath = path.join(viewsPath, 'layouts');
const partialsPath = path.join(viewsPath, 'partials');
app.set('views', viewsPath);

const exphbsConfig = exphbs.create({
  defaultLayout: 'main',
  layoutsDir: layoutsPath,
  partialsDir: [partialsPath],
  extname: '.hbs'
});

app.engine('hbs', exphbsConfig.engine);
app.set('view engine', '.hbs');

// Models
const models = require('./models');

// Express static assets
app.use(express.static("public"));

// Routes
const authRoute = require('./controllers/auth.js')(app, passport, models.user, express, router);

// Load passport strategies
require('./config/passport/passport.js')(passport, models.user);

io.on('connection', function(socket){
    console.log('user connected!');

    socket.on('join', function(name){
        user[socket.id] = name; //create entry in 'user' with new user
        socket.emit("update", "You have connected to the server.");
        io.sockets.emit("update", name + " has joined the server.");
        io.sockets.emit("update_people_list", user);
    });

    socket.on('disconnect', function(){
        console.log('user disconnected!');
        if(user[socket.id] != ""){
            io.sockets.emit("update", user[socket.id] + " has left the server.");
            delete user[socket.id];
            io.sockets.emit("update_people_list", user);
        }
    });

    socket.on('chat message', function(msg){
        console.log('message: ' + msg);
        io.sockets.emit('chat message', user[socket.id], msg);
    });
});

// Sync Database
models.sequelize
  .sync()
  .then(function() {
    console.log('Database Connected');
    http.listen(process.env.PORT || 3000, function(){
      console.log('listening on', http.address().port);
    });

    // app.listen(3000, function(err) {
    //   if (!err) console.log('Connected at http://localhost:3000');
    //   else console.log(err);
    // });
  })
  .catch(function(err) {
    console.log(err, 'Error on Database Sync. Please try again!');
  });
