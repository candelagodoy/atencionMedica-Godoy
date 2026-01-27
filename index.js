
var cookieParser = require('cookie-parser');
var session = require('express-session');

var path = require('path');
var express  = require('express');
const historiaClinicaRouter=require("./routes/historiaClinica")
const turnoRouter = require("./routes/turno");
const agendaRouter = require('./routes/agenda');
const consultaRouter = require("./routes/consulta")
const loginRouter = require("./routes/login")

const { log } = require('console');

const app = express();

app.use(express.urlencoded({extended:true}))
app.use(cookieParser());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));

app.use(session(
    {
    secret: 'secreto',
    resave: false,
    saveUninitialized: true
    })
)

/* app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    next();
}); */
app.use("/agenda", agendaRouter)
app.use("/turno", turnoRouter)
app.use("/historiaClinica", historiaClinicaRouter )
app.use("/consulta", consultaRouter)
app.use("/login", loginRouter)




app.listen(3000, () => {
    console.log("App en puerto 3000");
});