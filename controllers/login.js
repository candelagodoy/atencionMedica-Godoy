const { where } = require("sequelize");
const { Usuario, Medico, Persona, Agenda, MedicoEspecialidad, Especialidad } = require("../models/index");
const bcrypt = require("bcrypt");

const mostrarLogin = (req, res) => {
    res.render("../views/login.pug");
}

const mostrarRegistro = (req, res) => {
    res.render("../views/registro.pug");
}

const login = async (req, res) => {

    try{
        const { email, contraseña } = req.body;

        const user = await Usuario.findOne({
            where: {
                email: email
            },
            include: [
            {
                model: Medico,
                as: 'medico',
                include: [
                    {
                        model: Persona,
                        as: 'persona'
                    },
                    {
                        model: MedicoEspecialidad,
                        as: 'medicoespecialidad',
                        include: [
                            {
                                model: Agenda,
                                as: 'agenda'
                            }
                        ]
                }
                    
                ]
              
            }
        ]
        })


        if(user){
            const validaContraseña = await bcrypt.compare(contraseña, user.contraseña);
            if(validaContraseña){
                req.session.usuario = {
                    id: user.idUsuario,
                    idMedicoFK: user.medico.idPersona,
                    email: user.email,
                    nombre: user.medico.persona.nombre,
                    apellido: user.medico.persona.apellido,
                    dni: user.medico.persona.dni,
                    matricula: user.medico.medicoespecialidad[0].matricula,
                   
                };
                console.log(req.session.usuario);

                res.redirect("/agenda");
            }
            else{
                res.render("../views/login.pug", {error: "Contraseña incorrecta"});
            }
        }
        else{
            res.render("../views/login.pug", {error: "El usuario no existe"});
        }
    }
    catch(error){
        console.log(error);
    }

}

const registro = async (req, res) => {
  
    const body = req.body;
    if (!(body.email && body.contraseña)) {
        return res.status(400).send({error: "Los datos no tienen el formato apropiado"})
    }

    
    //creando un usuario nuevo
    const user =  await Usuario.create(body);

    //generar salt para hashear la clave
    const salt = await bcrypt.genSalt(10);
    

    user.contraseña = await bcrypt.hash(user.contraseña, salt);
    user.save().then((doc) => {
        res.status(201).send({user: doc});

    })
}

const logout = (req, res) => {
    req.session.destroy(
        () => {
            res.redirect("/login");
        }
    )
}

module.exports = {
    mostrarLogin,
    login,
    mostrarRegistro,
    registro,
    logout
}