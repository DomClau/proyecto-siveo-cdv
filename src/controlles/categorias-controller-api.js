//Desestructurar - pedir solo lo que requiero
const { request, response } = require('express');
const async = require('hbs/lib/async');
const {miConexion} = require('../database/db') 

const categoriasAPI = {};

categoriasAPI.getTodasCategorias = async (req, res,next)=>{
    try {
        const conexion = await miConexion();
        const [rows] = await conexion.query('SELECT * FROM categorias');
        if(rows.length>0){
            res.status(200).json({
                estado:1,
                mensaje:"Registros encontrados",
                categorias:rows
            })
        }
        else{
            res.status(404).json({
                estado:0,
                mensajes:"Registros no encontrados",
                categorias:[]
            })

        }
    } catch (error) {
       next(error); 
    }
}

categoriasAPI.getCategoriaPorId = async (req=request,res,next)=>{
    try {
        const{id} = req.params;
        const conexion = await miConexion();
        const [rows] = await conexion.query('SELECT * FROM categorias WHERE id = ?',[id]);
        if(rows.length>0){
            res.status(200).json({
                estado:1,
                mensaje:"Categoria encontrada",
                categorias:rows[0]
            })
        }else{
            res.status(404).json({
                estado:0,
                mensaje:"Categoria NO encontrada",
                categorias:rows=[]
            })
        }
    } catch (error) {
        next(error)
    }
}

categoriasAPI.deleteCategoriaPorId = async(req=request,res,next)=>{
    try {
        const {id} = req.params;
        const conexion = await miConexion();
        const resultado = await conexion.query('DELETE FROM categorias WHERE id = ?',[id]);
        if(resultado[0].affectedRows>0){
            res.status(200).json({
                estado:1,
                mensaje:"Categoria eliminada"
            })
        }else{
            res.status(400).json({
                estado:0,
                mensaje:"Categoria NO encontrada"
            })
        }
    } catch (error) {
        next(error)
    }
}

categoriasAPI.postCategoria = async(req=request,res,next)=>{
    try {
        const {descripcion, observaciones}=req.body;
        //validar que en el cuerpo de la solicitud exista descripcion y observaciones
        if(descripcion == undefined || observaciones == undefined){
            //400 Bad request (solicitud incorrecta)
            res.status(400).json({
                estado:0,
                mensaje:"Solicitud incorrecta. Te faltan parametros "
            })
        }else{
            const conexion = await miConexion();
            const resultado = await conexion.query('INSERT into categorias(descripcion,observaciones) VALUES (?,?)',[descripcion,observaciones]);
            if(resultado[0].affectedRows>0){
                res.status(201).json({
                    estado:1,
                    mensaje:"Categoria Creada",
                    categoria:{
                    id:resultado[0].insertId,
                    descripcion:descripcion,
                    observaciones:observaciones}
                });
            }else{
                res.status(500).json({
                    estado:0,
                    mensaje:"Categoria no registrada"
                })
            }
        }  
    } catch (error) {
        next(error)
    }
}

categoriasAPI.putCategoriaporId = async (req=request,res,next)=>{
    try {
        const {id} = req.params;
        const {descripcion, observaciones}=req.body;
        if(descripcion == undefined || observaciones == undefined){
            res.status(400).json({
                estado:0,
                mensaje:"Solicitud incorrecta. Faltan Parametros"
            })
        }else{
            const conexion = await miConexion();
            const resultado = await conexion.query('UPDATE categorias SET descripcion = ?, observaciones = ? WHERE id = ?',[descripcion,observaciones,id]);
            if(resultado[0].affectedRows>0){
                if(resultado[0].changedRows>0){
                    res.status(200).json({
                        estado:1,
                        mensaje:"Categoria actualizada",
                        categoria:{
                            id:id,
                            descripcion:descripcion,
                            observaciones:observaciones
                        }
                    })
                }else{
                    res.status(200).json({
                        estado:0,
                        mensaje:"Categoria sin cambios"
                    })
                }
            }else{
                res.status(404).json({
                    estado:0,
                    mensaje:"Categoria NO encontrada"
                })
            }

        }
    } catch (error) {
        next(error)
    }
}

//Exportar el objeto
module.exports=categoriasAPI;

//CRUD = 
//C - Funcion - crear - genera un id,                  = POST
//R - Funcion - leer 1 o todas las categorias de la    = GET
//U - Funcion - Actualizar una categoia por id         = PUT
//D - Funcion - eliminar una categoria por id          = DELETE