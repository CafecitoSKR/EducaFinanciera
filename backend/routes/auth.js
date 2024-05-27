const router = require('express').Router();

const User= require('../models/Users');

const Joi = require('@hapi/joi')

const bycript = require('bcrypt')


//Esto es para validar los valores 
const schemaRegister= Joi.object({
    name: Joi.string().min(6).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(255).required()
})

const schemaLogin= Joi.object({
    email:Joi.string().min(6).max(255).required().email(),
    password:Joi.string().min(6).max(1024).required()
})

router.post('/login', async (req, res)=>{
    //validar con  el joi el json que llega del front 
    const {error}= schemaLogin.validate(req.body)
    if(error){
        res.status(400).json({error:error.details[0].message})
    }

    const user = await User.findOne({email:req.body.email})
    
    if(!user) return res.status(400).json({error:true,mensaje:'Usuario no encontrado'});

    const validPassword = await bycript.compare(req.body.password, user.password)
    
    if(!validPassword) return res.status(400).json({error:true,mensaje:'Contraseña incorrecta' })


    res.json({
        error:null,
        mensaje:'Bienvenido '
    })
})

router.post('/register', async (req,res)=>{

    //validaciones de usuario

    const {error} = schemaRegister.validate(req.body)
    if(error){
        res.status(404).json({
            error:error.details[0].message
        })
    }

    //validacion de email en la base de datos
    
    const existeEmail = await User.findOne({email: req.body.email})

    if(existeEmail){
        return res.status(404).json({
            error: true, mensaje: ' email ya registrado'
                })
    }

    //hash contraseña
    //cuantos saltos hará al momento de hashear la contraseña
    const salt = await bycript.genSalt(10)
    const password = await bycript.hash(req.body.password,salt)


    user = new User({
        name:req.body.name,
        email:req.body.email,
        password:password,

    });

    try{
        const userDB = await user.save();

        res.json({
            error: null,
            data: userDB
        })
        
    }catch(error){
        res.status(400).json(error)
    }
})

module.exports=router