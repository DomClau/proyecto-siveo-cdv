const express = require('express');
const proveedoresController = require('../controlles/proveedores-controller-api');
const router = express.Router();

router.get('/api/proveedores', proveedoresController.getTodosProveedores);
router.get('/api/proveedores/:id', proveedoresController.getProveedorPorId);
router.delete('/api/proveedores/:id', proveedoresController.deleteProveedorPorId);
router.post('/api/proveedores', proveedoresController.postProveedor);
router.put('/api/proveedores/:id', proveedoresController.putProveedorporId);
//Para poder usar este router en otro archivo o modulo
module.exports=router;