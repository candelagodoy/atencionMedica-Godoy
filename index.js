const express  = require('express');
const pug = require('pug');
const app = express();
const historiaClinicaRouter=require("./routes/historiaClinica")
const turnoRouter = require("./routes/turno");
const agendaRouter = require('./routes/agenda');
const consultaRouter = require("./routes/consulta")
const path = require('path');

app.use(express.urlencoded({extended:true}))

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
//app.set('views', './views');

app.use(express.static(path.join(__dirname, 'public')));

/* app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    next();
}); */
app.use("/", agendaRouter)
app.use("/turno", turnoRouter)
app.use("/historiaClinica", historiaClinicaRouter )
app.use("/consulta", consultaRouter)



app.listen(3000, () => {
    console.log("App en puerto 3000");
});