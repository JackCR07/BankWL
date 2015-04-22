/*
 *  Licensed Materials - Property of IBM
 *  5725-I43 (C) Copyright IBM Corp. 2011, 2013. All Rights Reserved.
 *  US Government Users Restricted Rights - Use, duplication or
 *  disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

function onAuthRequired(headers, errorMessage){
	errorMessage = errorMessage ? errorMessage : null;
	
	return {
		authRequired: true,
		errorMessage: errorMessage
	};
}

function submitAuthentication(username){
	
		var userIdentity = {
				userId: username,
				displayName: username
		};

		WL.Server.setActiveUser("AuthRealm", userIdentity);
		
		return { 
			authRequired: false 
		};
	}
	

function onLogout(){
	WL.Logger.debug("Logged out");
}

