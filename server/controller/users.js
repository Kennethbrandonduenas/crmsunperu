const bcrypt = require('bcrypt-nodejs')
const jwt = require('../services/jwt')
const pool = require('../config/database')
const md_auth = require('../middlewares/auth')
const conn = pool

const Controllers = {}
/*********************************************************************
 * login de usuarios
 ********************************************************************/

Controllers.loginusers = async (req, res) => {
    try {
        const params = req.body
        
        
        const { rows } = await conn.query('select username, email, password from users where email = $1 or username = $1', 
            [params.usernameoremail]
        )
        let thereisnouser = rows.length <=0
        if(thereisnouser){
            return res.status(400).json({
                success:false,
                message: 'El usuario no existe, consulte con su administrador'
            })
        }

        const userFound = rows[0]
        //console.log(rows)
        
        const isPassword = bcrypt.compareSync(params.password, userFound.password)

        if(!isPassword){
            return res.status(400).json({
                success:false,
                message: 'La Contraseña es incorrecta, intentelo de nuevo'
            })
        }
        return res.status(200).json({
            success:true,
            message: 'Bienvenido ' + userFound.nombre_usuario,
            //token: jwt.createToken(userFound),
            userFound
        })
        

        /*
        return res.status(200).json({
            success:true,
            data: rows
        })
        */
        
        /*
        if(row.length <=0){
            return res.status(400).json({
                message: 'El usuario no existe, consulte con su administrador'
            })
        }

        const userFound = row[0]
        
        const isPassword = bcrypt.compareSync(params.password, userFound.contrasena)

        const isactive = userFound.estado == 'Activo'

        if(!isPassword){
            return res.status(400).json({
                message: 'La Contraseña es incorrecta, intentelo de nuevo'
            })
        }

        if(!isactive){
            return res.status(400).json({
                success: false,
                message: 'Usuario Inactivo, consulte con su administrador'
            })
        }

        return res.status(200).json({
            success:true,
            message: 'Bienvenido ' + userFound.nombre_usuario,
            token: jwt.createToken(userFound),
            userFound
        })
        */


    } catch (error) {
        return res.status(500).json({
            message: 'Ocurrió un error',
            error
        })
    }
}

/*********************************************************************
 * Insertar datos
 ********************************************************************/
/*
const saveusers = async (req, res) => {
    try {
        const params = req.body
        let name = params.nombre_usuario
        let dni =params.dni
        let address = params.direccion
        let id_rol = params.id_roles
        let state = params.estado
        let empresa = params.empresa
        let email = params.email
        let password = params.contrasena

        bcrypt.hash(password, null, null, (err, hash)=>{
            password = hash
            const query = 'INSERT INTO usuarios (nombre_usuario, DNI, direccion, empresa, id_roles, estado, email, contrasena) VALUES ?'
            let values = [[name, dni, address, empresa, id_rol, state, email, password]]

            conn.query(query, [values], (err, result) =>{
                if (err) {
                    return res.status(400).json({
                        message: 'Error al insertar los datos',
                        err
                    })
                }
                return res.status(200).json({
                    message: 'Usuario Registrado',
                    result
                })
            })
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Ocurrió un error',
            error
        })
    }
}
*/



module.exports = Controllers

