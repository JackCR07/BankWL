/*
 *  Licensed Materials - Property of IBM
 *  5725-I43 (C) Copyright IBM Corp. 2011, 2013. All Rights Reserved.
 *  US Government Users Restricted Rights - Use, duplication or
 *  disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

WL.Server.createEventSource({
	name: 'PushEventSource',
	onDeviceSubscribe: 'deviceSubscribeFunc',
	onDeviceUnsubscribe: 'deviceUnsubscribeFunc',
	securityTest:'ValidationAdapter-securityTest'
	
});

function submitNotification(userId, message) {
	WL.Logger.debug(">> submitNotification");
	var userSubscription = WL.Server.getUserNotificationSubscription(
			'UserRegistryPushAdapter.PushEventSource', userId);

	if (userSubscription == null) {
		return {
			result : "No subscription found for user :: " + userId
		};
	}
	
	var notification = WL.Server
			.createDefaultNotification(message, 1, {});

	WL.Server.notifyAllDevices(userSubscription, notification);

	return {
		result : "Notification sent to user :: " + userId
	};
}

