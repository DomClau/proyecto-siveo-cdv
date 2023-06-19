//para establecer la conexion a Mysql
//Desestructurar= solo lo que requerimos
const {createPool} = require('mysql2/promise');

//opciones para la conexion a la base de datos
const conexion = createPool({
    host : process.env.MYSQLHOST || 'localhost',
    user : process.env.MYSQLUSER || 'root',
    password : process.env.MYSQLPASSWORD || '',
    database:process.env.MYSQLDATABASE || 'proyecto-siveo',
    port : process.env.MYSQLPORT || '3306'
})

//funcion que nos regrese la conexion
const getConexion = ()=>{
    return conexion;
}

//Exportamos la funcion para poder usarla en otro modulo(archivo.js)
module.exports.miConexion = getConexion;