//Una funcion para listar los proveedores
//Mandar llamar a la api para crear uana nueva categoria
let idSeleccionadoParaEliminar=0; //variable global
let idSeleccionadoParaActualizar=0;

function crearProveedor(){
    const nombreProveedor=document.getElementById('nombreProveedorAlta').value;
    const direccionProveedor=document.getElementById('direccionProveedorAlta').value;
    const telefonoProveedor=document.getElementById('telefonoProveedorAlta').value;
    $.ajax({
        method:'POST',
        url: window.location.origin+'/api/proveedores',
        data: {
          nombre:nombreProveedor,
          direccion:direccionProveedor,
          telefono:telefonoProveedor
        },
        success: function( result ) {
            if(result.estado==1){
                let proveedor = result.proveedor;
                //debemos de agregar el proveedor a la tabla
                let tabla = $('#tabla-proveedores').DataTable();
                let Botones = generaBotones(proveedor.id);
                let nuevoRenglon = tabla.row.add([proveedor.nombre,proveedor.direccion,proveedor.telefono,Botones]).node();
                //linea agrgada para el id del renglon
                $(nuevoRenglon).attr('id', 'renglon_'+proveedor.id);
                $(nuevoRenglon).find('td').addClass('table-td');
                tabla.draw(false);
                //mostrar un mensaje agradable al usuario
                alert(result.mensaje)
                document.getElementById('nombreProveedorAlta').value = "";
                document.getElementById('direccionProveedorAlta').value ="";
                document.getElementById('telefonoProveedorAlta').value ="";
              }else{
                alert(result.mensaje)
              }
        }
      });
}

function getProveedores(){
    $.ajax({
        method:'GET',
        url: window.location.origin+"/api/proveedores",
        data: {},
        success: function( result ) {
            if(result.estado==1){
                //minimo hay una categoria
                //requerimos recorrer el arreglo de categorias
                const proveedores = result.proveedores
                //Aqui hacemos referencia a la tabla con jQuery
                let tabla = $('#tabla-proveedores').DataTable();
                proveedores.forEach(proveedor => {
                  let Botones = generaBotones(proveedor.id);
                    //alert(categoria.descripcion);
                    //tabla.row.add([categoria.descripcion,Botones]).node().id='renglon_'+categoria.id;
                    //para darle formato correcto
                    let nuevoRenglon = tabla.row.add([proveedor.nombre,proveedor.direccion,proveedor.telefono,Botones]).node();
                    //linea agrgada para el id del renglon
                    $(nuevoRenglon).attr('id', 'renglon_'+proveedor.id);
                    $(nuevoRenglon).find('td').addClass('table-td');
                    tabla.draw(false);
                });
              }else{
                alert(result.mensaje)
              }
        }
      });
}


function borrarProveedor(){
    $.ajax({
        method:"DELETE",
        url: window.location.origin+"/api/proveedores/"+idSeleccionadoParaEliminar,
        data: {},
        success: function( result ) {
            if(result.estado==1){
                //debemos de eliminar el renglon de la DataTable(tabla)
                let tabla = $('#tabla-proveedores').DataTable();
                tabla.row('#renglon_'+idSeleccionadoParaEliminar).remove().draw();
                alert(result.mensaje)
              }else{
                alert(result.mensaje)
              }
        }
      });
}

function actualizarProveedor(){
  let nombreProveedor=document.getElementById('nombreProveedorActualizar').value;
  let direccionProveedor=document.getElementById('direccionProveedorActualizar').value;
  let telefonoProveedor=document.getElementById('telefonoProveedorActualizar').value;
  $.ajax({
    method:'PUT',
    url: window.location.origin+"/api/proveedores"+idSeleccionadoParaActualizar,
    data: {
      nombre:nombreProveedor,
      direccion:direccionProveedor,
      telefono:telefonoProveedor
    },
    success: function( result ) {
      if(result.estado==1){
        //debemos actualizar la tabla
        let tabla = $('#tabla-proveedores').DataTable();
        //paso 1
        let renglonTemporal = tabla.row('#renglon_'+idSeleccionadoParaActualizar).data();
        //paso 2
        renglonTemporal[0]=nombreProveedor;
        renglonTemporal[1]=direccionProveedor;
        renglonTemporal[2]=telefonoProveedor;
        //paso 3
        tabla.row('#renglon_'+idSeleccionadoParaActualizar).data(renglonTemporal).draw();
        alert(result.mensaje);
      }else{
        alert(result.mensaje);
      }
    }
  });
}

function generaBotones(id){
  let Botones= '<div class="flex space-x-3 rtl:space-x-reverse">';
  Botones+='<button onclick="identificaActualizar('+id+');" data-bs-toggle="modal" data-bs-target="#updateModal" class="action-btn" type="button">';
  Botones+='<iconify-icon icon="heroicons:pencil-square"></iconify-icon>';
  Botones+='</button>';
  Botones+='<button onclick="identificaEliminar('+id+');" data-bs-toggle="modal" data-bs-target="#deleteModal" class="action-btn" type="button">';
  Botones+='<iconify-icon icon="heroicons:trash"></iconify-icon>';
  Botones+='</button>';
  Botones+='</div>';
  return Botones;
}

function identificaActualizar(id){
  idSeleccionadoParaActualizar=id;
  $.ajax({
    method:"GET",
    url: window.location.origin+"/api/proveedores"+idSeleccionadoParaActualizar,
    data: {},
    success: function( result ) {
      if(result.estado==1){
        let proveedor = result.proveedor;
        //mostramos en la ventana
        document.getElementById('nombreProveedorActualizar').value=proveedor.nombre;
        document.getElementById('direccionProveedorActualizar').value=proveedor.direccion;
        document.getElementById('telefonoProveedorActualizar').value=proveedor.telefono; 
      }else{
        alert(result.mensaje)
      }
    }
  });

}

function identificaEliminar(id){
  //debemos guardar el id de manera global
  idSeleccionadoParaEliminar=id;
  
}

//La mandamos llamar aqui sin condicion
getProveedores();