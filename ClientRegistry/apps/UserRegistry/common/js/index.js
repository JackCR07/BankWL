/**
 * 
 */


function nuevoCliente(){
	var cliente = {
			   "crearCliente": {
				      "cliente": {
				         "cedula": $("#cedula").val(),
				         "password": $("#clave").val()
				      }
				   }
				};
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
doSubscribe();
$('#ResponseDiv').html('Registro Procesado');
}

function nuevoClienteFAIL(response) {
//alert(JSON.stringify(response));
console.log(" Nuevo cliente fallido : " + response.status);
//WL.Client.logout("AuthRealm");
$('#ResponseDiv').html('Registro fallo');

}