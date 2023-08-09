// import required libraries
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// import routes and connection
const routes = require('./controllers');
const sequelize = require('./config/connection.js');
const helpers = require('./utils/helpers');

// declare express and port
const app = express();
const PORT = process.env.PORT || 3001;

// declare the session
const sess = {
    secret: '',
    cookie: {
        // store cookie in milliseconds
        maxAge: 24 * 60 * 60 * 1000, // cookie expires in 1 day
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
    }),
};

app.use(session(sess));

const hbs = exphbs.create({helpers});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () =>
        console.log(
        `\nServer running on port ${PORT}. Visit http://localhost:${PORT} and create an account!`
        )
    );
});
