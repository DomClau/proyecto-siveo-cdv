//declaraciones
const express = require('express'); //servidores
const hbs = require('hbs');//HTML - Dinamicos
const bodyParser = require('body-parser');//body-post
const port = process.env.PORT || 3000; //puerto de ejecucion
const rutasCategorias = require('./src/routes/categorias-routes-api');
const rutasProveedores = require('./src/routes/proveedores-routes-api');

const app= express();
//motor para generar las vistas dinamicas
app.set('view engine', 'hbs');
//eje el header, menu vertical, pie de pagina
hbs.registerPartials(__dirname + '/view/partials', ()=>{})

//use- middleware
app.use(express.static('public')); //parte publica de la app
app.use(bodyParser.urlencoded({extended : true})) //procesar el body-parser
app.use(bodyParser.json())//manejar datos en el formato json

// RUTAS para los datos - API - END POINTS 
//Vamos a usar las rutas definidas en routes
app.use(rutasCategorias);
app.use(rutasProveedores);
//RUTAS PARA LAS VISTAS
//Rutas - temporales

//procesar solicitudes del tipo GET y POST en los navegadores
app.get('/clientes', (req,res)=>{
    res.render('clientes');
})
app.get('/categorias', (req,res)=>{
    res.render('categorias');
})
app.get('/proveedores', (req,res)=>{
    res.render('proveedores');
})
app.get('/ventas', (req,res)=>{
    res.render('ventas');
})
app.get('/productos', (req,res)=>{
    res.render('productos');
})
app.get('/factura', (req,res)=>{
    res.render('factura');
})
app.get('/404', (req,res)=>{
    res.render('404');
})
app.get('/registro',(req,res)=>{
    res.render('registro');
})
app.get('/login',(req,res)=>{
    res.render('login');
})
app.get('/index',(req,res)=>{
    res.render('index');
})
app.get('*', (req,res)=>{
    res.render('index');
})

app.listen(port,()=>{
    console.log('Servidor express corriendo en el puerto: ', port);
})