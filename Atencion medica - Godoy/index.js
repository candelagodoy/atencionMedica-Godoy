const express  = require('express');
const pug = require('pug');
const app = express();
const historiaClinicaRouter=require("./routes/historiaClinica")
const turnoRouter = require("./routes/turno");
const agendaRouter = require('./routes/agenda');
const consultaRouter = require("./routes/consulta")


app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.static('public'));

app.use("/turno", turnoRouter )
app.use("/historiaClinica", historiaClinicaRouter )
app.use("/agenda", agendaRouter)
app.use("/consulta", consultaRouter)



app.listen(3000, () => {
    console.log("App en puerto 3306");
});