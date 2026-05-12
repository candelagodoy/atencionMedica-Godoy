
var cookieParser = require('cookie-parser');
var session = require('express-session');

var path = require('path');
var express  = require('express');
const methodOverride = require("method-override");
const turnoRouter = require("./routes/turno");
const agendaRouter = require('./routes/agenda');
const consultaRouter = require("./routes/consulta")
const loginRouter = require("./routes/login")
const diagnosticoRouter = require("./routes/diagnostico")
const medicamentoRouter = require("./routes/medicamento")
const antecedentesRouter = require("./routes/antecedentes")
const habitoRouter = require("./routes/habito")
const consultaAlergiaRouter = require("./routes/consultaAlergia")
const plantillaRouter = require("./routes/plantilla")

const { log } = require('console');

const app = express();


app.use(express.urlencoded({extended:true}))
app.use(cookieParser());
app.use(methodOverride("_method"));

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

app.use((req, res, next) => {
    res.locals.usuario = req.session.usuario;
    next();
}); 

app.use("/agenda", agendaRouter)
app.use("/turno", turnoRouter)
app.use("/consulta", consultaRouter)
app.use("/login", loginRouter)
app.use("/diagnostico", diagnosticoRouter) 
app.use("/medicamento", medicamentoRouter)
app.use("/antecedentes", antecedentesRouter)
app.use("/habito", habitoRouter)
app.use("/consultaAlergia", consultaAlergiaRouter)
app.use("/plantillas", plantillaRouter)



app.listen(3000, () => {
    console.log("App en puerto 3000");
});