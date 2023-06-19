//Desestructurar - pedir solo lo que requiero
const { request, response } = require('express');
const async = require('hbs/lib/async');
const {miConexion} = require('../database/db') 

const proveedoresAPI = {};

proveedoresAPI.getTodosProveedores = async (req, res,next)=>{
    try {
        const conexion = await miConexion();
        const [rows] = await conexion.query('SELECT * FROM proveedores');
        if(rows.length>0){
            res.status(200).json({
                estado:1,
                mensaje:"Registros encontrados",
                proveedores:rows
            })
        }
        else{
            res.status(404).json({
                estado:0,
                mensajes:"Registros no encontrados",
                proveedores:[]
            })

        }
    } catch (error) {
       next(error); 
    }
}

proveedoresAPI.getProveedorPorId = async (req=request,res,next)=>{
    try {
        const{id} = req.params;
        const conexion = await miConexion();
        const [rows] = await conexion.query('SELECT * FROM proveedores WHERE id = ?',[id]);
        if(rows.length>0){
            res.status(200).json({
                estado:1,
                mensaje:"Proveedor encontrado",
                proveedores:rows[0]
            })
        }else{
            res.status(404).json({
                estado:0,
                mensaje:"Proveedor NO encontrado",
                proveedores:rows=[]
            })
        }
    } catch (error) {
        next(error)
    }
}

proveedoresAPI.deleteProveedorPorId = async(req=request,res,next)=>{
    try {
        const {id} = req.params;
        const conexion = await miConexion();
        const resultado = await conexion.query('DELETE FROM proveedores WHERE id = ?',[id]);
        if(resultado[0].affectedRows>0){
            res.status(200).json({
                estado:1,
                mensaje:"Proveedor eliminado"
            })
        }else{
            res.status(400).json({
                estado:0,
                mensaje:"Proveedor NO encontrado"
            })
        }
    } catch (error) {
        next(error)
    }
}

proveedoresAPI.postProveedor = async(req=request,res,next)=>{
    try {
        const {nombre, direccion, telefono}=req.body;
        //validar que en el cuerpo de la solicitud exista descripcion y observaciones
        if(nombre == undefined || direccion == undefined || telefono== undefined){
            //400 Bad request (solicitud incorrecta)
            res.status(400).json({
                estado:0,
                mensaje:"Solicitud incorrecta. Te faltan parametros "
            })
        }else{
            const conexion = await miConexion();
            const resultado = await conexion.query('INSERT into proveedores(nombre,direccion,telefono) VALUES (?,?,?)',[nombre,direccion,telefono]);
            if(resultado[0].affectedRows>0){
                res.status(201).json({
                    estado:1,
                    mensaje:"Proveedor Creado",
                    proveedor:{
                    id:resultado[0].insertId,
                    nombre:nombre,
                    direccion:direccion,
                    telefono:telefono}
                });
            }else{
                res.status(500).json({
                    estado:0,
                    mensaje:"Proveedor no registrado"
                })
            }
        }  
    } catch (error) {
        next(error)
    }
}

proveedoresAPI.putProveedorporId = async (req=request,res,next)=>{
    try {
        const {id} = req.params;
        const {nombre, direccion, telefono}=req.body;
        if(nombre == undefined || direccion == undefined || telefono==undefined){
            res.status(400).json({
                estado:0,
                mensaje:"Solicitud incorrecta. Faltan Parametros"
            })
        }else{
            const conexion = await miConexion();
            const resultado = await conexion.query('UPDATE proveedores SET nombre = ?, direccion = ?, telefono =? WHERE id = ?',[nombre,direccion,telefono,id]);
            if(resultado[0].affectedRows>0){
                if(resultado[0].changedRows>0){
                    res.status(200).json({
                        estado:1,
                        mensaje:"Provedor actualizado",
                        proveedor:{
                            id:id,
                            nombre:nombre,
                            direccion:direccion,
                            telefono:telefono
                        }
                    })
                }else{
                    res.status(200).json({
                        estado:0,
                        mensaje:"Proveedor sin cambios"
                    })
                }
            }else{
                res.status(404).json({
                    estado:0,
                    mensaje:"Proveedor NO encontrado"
                })
            }

        }
    } catch (error) {
        next(error)
    }
}

//Exportar el objeto
module.exports=proveedoresAPI;

//CRUD = 
//C - Funcion - crear - genera un id,                  = POST
//R - Funcion - leer 1 o todas las categorias de la    = GET
//U - Funcion - Actualizar una categoia por id         = PUT
//D - Funcion - eliminar una categoria por id          = DELETE