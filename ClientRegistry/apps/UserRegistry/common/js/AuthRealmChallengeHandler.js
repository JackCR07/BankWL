/*
 *
    COPYRIGHT LICENSE: This information contains sample code provided in source code form. You may copy, modify, and distribute
    these sample programs in any form without payment to IBM® for the purposes of developing, using, marketing or distributing
    application programs conforming to the application programming interface for the operating platform for which the sample code is written.
    Notwithstanding anything to the contrary, IBM PROVIDES THE SAMPLE SOURCE CODE ON AN "AS IS" BASIS AND IBM DISCLAIMS ALL WARRANTIES,
    EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, ANY IMPLIED WARRANTIES OR CONDITIONS OF MERCHANTABILITY, SATISFACTORY QUALITY,
    FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND ANY WARRANTY OR CONDITION OF NON-INFRINGEMENT. IBM SHALL NOT BE LIABLE FOR ANY DIRECT,
    INDIRECT, INCIDENTAL, SPECIAL OR CONSEQUENTIAL DAMAGES ARISING OUT OF THE USE OR OPERATION OF THE SAMPLE SOURCE CODE.
    IBM HAS NO OBLIGATION TO PROVIDE MAINTENANCE, SUPPORT, UPDATES, ENHANCEMENTS OR MODIFICATIONS TO THE SAMPLE SOURCE CODE.

 */

var AuthRealmChallengeHandler = WL.Client.createChallengeHandler("AuthRealm");

AuthRealmChallengeHandler.isCustomResponse = function(response) {
	if (!response || !response.responseJSON || response.responseText === null) {
		return false;
	}
	if (typeof (response.responseJSON.authRequired) !== 'undefined') {
		return true;
	} else {
		return false;
	}
};

AuthRealmChallengeHandler.handleChallenge = function(response) {
	var authRequired = response.responseJSON.authRequired;
	/*
	 * if (authRequired == true){ $("#AppDiv").hide(); $("#AuthDiv").show();
	 * $("#AuthPassword").empty(); $("#AuthInfo").empty();
	 * 
	 * if (response.responseJSON.errorMessage)
	 * $("#AuthInfo").html(response.responseJSON.errorMessage);
	 *  } else
	 */if (authRequired == false) {
		$("#AppDiv").show();
		$("#AuthDiv").hide();
		AuthRealmChallengeHandler.submitSuccess();
		nuevoCliente();
	}

};

$("#nuevoCliente").bind('click', function() {
	var cedula = $('#cedula').val();
	var username = "a";
	var data = {
		"operation1" : {
			"cedulaCliente" : cedula,
			"usuario": username
		}
	};
	if (username != null) {
		var invocationData = {
			adapter : "SoapAdapter1",
			procedure : "UsersDisponiblesHttpService_operation1",
			parameters : [ data ]
		};
		var options = {
			onSuccess : validationOK,
			onFailure : validationFAIL,
			invocationContext : {}
		};
		WL.Client.invokeProcedure(invocationData, options);
	}
});

function validationOK(response) {
	//alert(response.invocationResult.Envelope.Body.operation1Response.resultado);
	var resultado = response.invocationResult.Envelope.Body.operation1Response.resultado;
	var username = $('#cedula').val();
	if (resultado == 1) {
		var invocationData = {
			adapter : "ValidationAdapter",
			procedure : "submitAuthentication",
			parameters : [ username ]
		};
		AuthRealmChallengeHandler.submitAdapterAuthentication(invocationData,
				{});
	} else if(resultado==0){
		$('#ResponseDiv').html('Cedula no existe');
		$('#cedula').val('');
	}
	else{
		$('#ResponseDiv').html('Usuario ya existe');
		$('#nombre').val('');
		
	}

}

function validationFAIL(response) {
	$('#ResponseDiv').html('Registro insatisfactorio, intentelo de nuevo');
	//alert(JSON.stringify(response));

}

/*
 * $("#AuthCancelButton").bind('click', function () { $("#AppDiv").show();
 * $("#AuthDiv").hide(); AuthRealmChallengeHandler.submitFailure(); });
 */
