
/*function getURL(){
    //let URL="http: // localhost :3000"
    //sacamos el protocolo
    let URL = window.location.protocol+"//"+window.location.hostname
    return URL;
}
alert("Este es el URL: " +getURL());*/

//alert("Este es el href: " +window.location.href)
//Document
//window: requerimos protocolo, nombre de host y puerto (si existe)
//Una funcion para listar las categorias
//Mandar llamar a la api para crear uana nueva categoria
let idSeleccionadoParaEliminar=0; //variable global
let idSeleccionadoParaActualizar=0;
function crearCategoria(){
  const descripcionCategoria=document.getElementById('descripcionCategoriaAlta').value;
  const observacionesCategoria= document.getElementById('observacionesCategoriaAlta').value;
$.ajax({
  method:'POST', //Metodo
  url: window.location.origin+'/api/categorias', //end point
  data: { //body
    descripcion:descripcionCategoria,
    observaciones:observacionesCategoria
  },
  success: function( result ) {
    if(result.estado==1){
      let categoria = result.categoria;
      //debemos de agregar la categoria a la tabla
      let tabla = $('#tabla-categorias').DataTable();
      let Botones = generaBotones(categoria.id);
      let nuevoRenglon = tabla.row.add([categoria.descripcion,Botones]).node();
      //linea agrgada para el id del renglon
      $(nuevoRenglon).attr('id', 'renglon_'+categoria.id);
      $(nuevoRenglon).find('td').addClass('table-td');
      tabla.draw(false);
      //mostrar un mensaje agradable al usuario
      alert(result.mensaje)
      document.getElementById('descripcionCategoriaAlta').value = "";
      document.getElementById('observacionesCategoriaAlta').value ="";
    }else{
      alert(result.mensaje)
    }
  }
});
}

function getCategorias(){
    $.ajax({
        method:"GET", //metodo
        url: window.location.origin+"/api/categorias",  //URL + params
        data: { //body
        },
        success: function( result ) {
          if(result.estado==1){
            //minimo hay una categoria
            //requerimos recorrer el arreglo de categorias
            const categorias = result.categorias
            //Aqui hacemos referencia a la tabla con jQuery
            let tabla = $('#tabla-categorias').DataTable();
            categorias.forEach(categoria => {
              let Botones = generaBotones(categoria.id);
                //alert(categoria.descripcion);
                //tabla.row.add([categoria.descripcion,Botones]).node().id='renglon_'+categoria.id;
                //para darle formato correcto
                let nuevoRenglon = tabla.row.add([categoria.descripcion,Botones]).node();
                //linea agrgada para el id del renglon
                $(nuevoRenglon).attr('id', 'renglon_'+categoria.id);
                $(nuevoRenglon).find('td').addClass('table-td');
                tabla.draw(false);
            });
          }else{
            alert(result.mensaje)
          }
        }
      });
    
}

function borrarCategoria(){
  $.ajax({
    method:"DELETE",
    url: window.location.origin+"/api/categorias/"+idSeleccionadoParaEliminar,
    data: {},
    success: function( result ) {
      if(result.estado==1){
        //debemos de eliminar el renglon de la DataTable(tabla)
        let tabla = $('#tabla-categorias').DataTable();
        tabla.row('#renglon_'+idSeleccionadoParaEliminar).remove().draw();
        alert(result.mensaje)
      }else{
        alert(result.mensaje)
      }
    }
  });
}

function actualizarCategoria(){
  let descripcionCategoria = document.getElementById('descripcionCategoriaActualizar').value;  
  let observacionesCategoria = document.getElementById('observacionesCategoriaActualizar').value;
  $.ajax({
    method:"PUT",
    url: window.location.origin+"/api/categorias/"+idSeleccionadoParaActualizar,
    data: { //body
      descripcion:descripcionCategoria,
      observaciones:observacionesCategoria
    },
    success: function( result ) {
      if(result.estado==1){
        //debemos actualizar la tabla
        let tabla = $('#tabla-categorias').DataTable();
        //paso 1
        let renglonTemporal = tabla.row('#renglon_'+idSeleccionadoParaActualizar).data();
        //paso 2
        renglonTemporal[0]=descripcionCategoria;
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
  //debemos obtener los datos de la BD y mostrarlos en la ventana
  $.ajax({
    method:"GET",
    url: window.location.origin+"/api/categorias/"+idSeleccionadoParaActualizar,
    data: {},
    success: function(result) {
      if(result.estado==1){
        let categoria = result.categorias;
        //mostramos en la ventana
        document.getElementById('descripcionCategoriaActualizar').value=categoria.descripcion;
        document.getElementById('observacionesCategoriaActualizar').value=categoria.observaciones;
        
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
getCategorias();
//Una funcion para ver solo una categoria
//Dos funciones para actualizar una categoria
//Dos funciones para eliminar una categoria
//Una funcion para crear un acategoria
//Una funcion que nos regrese el URL independientemente: local o de railway.com o render