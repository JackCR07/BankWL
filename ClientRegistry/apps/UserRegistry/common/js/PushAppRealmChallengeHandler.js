/*
*  Licensed Materials - Property of IBM
*  5725-G92 (C) Copyright IBM Corp. 2006, 2013. All Rights Reserved.
*  US Government Users Restricted Rights - Use, duplication or
*  disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
*/

var pushAppRealmChallengeHandler = WL.Client.createChallengeHandler("PushAppRealm");

pushAppRealmChallengeHandler.isCustomResponse = function(response) {
    if (!response || response.responseText === null) {
        return false;
    }
    var indicatorIdx = response.responseText.search('j_security_check');
    
    if (indicatorIdx >= 0){
		return true;
	}  
	return false;
};

/*pushAppRealmChallengeHandler.handleChallenge = function(response) {
	var reqURL = '/j_security_check';
    var options = {};
    options.parameters = {
        j_username : "Test",
        j_password : "Test"
    };
    options.headers = {};
    pushAppRealmChallengeHandler.submitLoginForm(reqURL, options, pushAppRealmChallengeHandler.submitLoginFormCallback);

};*/

pushAppRealmChallengeHandler.submitLoginFormCallback = function(response) {
    var isLoginFormResponse = pushAppRealmChallengeHandler.isCustomResponse(response);
    if (isLoginFormResponse){
    	pushAppRealmChallengeHandler.handleChallenge(response);
    } else {
		$('#AppBody').show();
		$('#AuthBody').hide();
		pushAppRealmChallengeHandler.submitSuccess();   
		nuevoCliente();
    }
};

function register() {
    var reqURL = '/j_security_check';
    var options = {};
    options.parameters = {
        j_username : $('#cedula').val(),
        j_password : $('#cedula').val()
    };
    options.headers = {};
    pushAppRealmChallengeHandler.submitLoginForm(reqURL, options, pushAppRealmChallengeHandler.submitLoginFormCallback);
}
