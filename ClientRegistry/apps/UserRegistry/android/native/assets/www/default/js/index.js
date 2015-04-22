
/* JavaScript content from js/index.js in folder common */
/**
 * 
 */


function nuevoCliente(){
	var cliente = {
			   "crearCliente": {
				      "cliente": {
				         "apellido": $("#apellido").val(),
				         "cedula": $("#cedula").val(),
				         "direccion": $("#direccion").val(),
				         "fechaNacimiento": $("#fechaNacimiento").val(),
				         "nombre": $("#nombre").val(),
				         "password": $("#clave").val()
				      }
				   }
				}
	//$("#nuevoCliente").prop( "disabled", true );	
	/*cliente.nombre=$("#nombre").val();
	cliente.apellido=$("#apellido").val();
	cliente.cedula=$("#cedula").val();
	cliente.direccion=$("#direccion").val();
	cliente.fechaNacimiento=$("#fechaNacimiento").val();
	cliente.password=$("#clave").val();
	//alert(cliente.fechaNacimiento);*/
	
	if (cliente != null) {
		var invocationData = {
			adapter : "SoapAdapter2",
			procedure : "WS_crearCliente",
			parameters : [ cliente ]
		};
		var options = {
			onSuccess : nuevoClienteOK,
			onFailure : nuevoClienteFAIL
		};
		WL.Client.invokeProcedure(invocationData, options);
	}

}



function nuevoClienteOK(response) {
console.log(" Nuevo cliente exitoso : " + response.status);
$('#ResponseDiv').html('Registro Procesado');
}

function nuevoClienteFAIL(response) {
//alert(JSON.stringify(response));
console.log(" Nuevo cliente fallido : " + response.status);
$('#ResponseDiv').html('Registro fallo');

}