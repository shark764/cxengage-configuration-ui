const { cxapi: { Client } } = require('alonzo'),
    cx = new Client({
        "user": process.env.CX_USERNAME,
        "pass": process.env.CX_PASSWORD,
        "environment": process.env.ENVIRONMENT,
        "region": process.env.REGIONVAR
    });

const Api = {
	// Smooch Api Calls
	getChatWidgetApps(tenantId, timeOutInMs = 15000) {
		return browser.waitUntil(() => cx.chatWidget.getChatWidgetApps(tenantId), timeOutInMs);
	},
	getWhatsAppApps(tenantId, timeOutInMs = 15000) {
		return browser.waitUntil(() => cx.whatsApp.getWhatsAppApps(tenantId), timeOutInMs);
	},
	getChatWidgetAppId(appName , tenantId, timeOutInMs = 15000) {
		return browser.waitUntil(() => cx.chatWidget.getChatWidgetAppId(appName , tenantId), timeOutInMs);
	},
	getWhatsAppAppId(appName , tenantId, timeOutInMs = 15000) {
		return browser.waitUntil(() => cx.whatsApp.getWhatsAppAppId(appName , tenantId), timeOutInMs);
	},
	createChatWidgetApp(name, tenantId, timeOutInMs = 15000) {
		browser.waitUntil(() => cx.chatWidget.createChatWidgetApp(name, tenantId), timeOutInMs);
	},
	deleteChatWidgetApp(appName, tenantId, timeOutInMs = 15000) {
		browser.waitUntil(() => cx.chatWidget.deleteChatWidgetApp(appName, tenantId), timeOutInMs);
	},
	getChatWebIntegrations(tenantId, timeOutInMs = 15000) {
		return browser.waitUntil(() => cx.chatWidget.getChatWebIntegrations(tenantId), timeOutInMs);
	},
	getWhatsAppIntegrations(tenantId, timeOutInMs = 15000) {
		return browser.waitUntil(() => cx.whatsApp.getWhatsAppIntegrations(tenantId), timeOutInMs);
	},
	getChatWebIntegrationId(webIntegrationName , tenantId, timeOutInMs = 15000) {
		return browser.waitUntil(() => cx.chatWidget.getChatWebIntegrationId(webIntegrationName , tenantId), timeOutInMs);
	},
	getWhatsAppIntegrationId(integrationName , tenantId, timeOutInMs = 15000) {
		return browser.waitUntil(() => cx.whatsApp.getWhatsAppIntegrationId(integrationName , tenantId), timeOutInMs);
	},
	createChatWebIntegration(name, contactPoint, appName, prechatCapture, tenantId, timeOutInMs = 15000) {
		browser.waitUntil(() => cx.chatWidget.createChatWebIntegration(name, contactPoint, appName, prechatCapture, tenantId), timeOutInMs);
	},
	createWhatsAppIntegration(name, description, appName, clientDisconnectMinutes, tenantId, timeOutInMs = 15000) {
		browser.waitUntil(() => cx.whatsApp.createWhatsAppIntegration(name, description, appName, clientDisconnectMinutes, tenantId), timeOutInMs);
	},
	updateChatWebIntegration(name, contactPoint, webIntegrationName, prechatCapture, tenantId, timeOutInMs = 15000) {
		browser.waitUntil(() => cx.chatWidget.updateChatWebIntegration(name, contactPoint, webIntegrationName, prechatCapture, tenantId), timeOutInMs);
	},
	updateWhatsAppIntegration(name, description, clientDisconnectMinutes, tenantId, timeOutInMs = 15000) {
		browser.waitUntil(() => cx.whatsApp.updateWhatsAppIntegration(name, description, clientDisconnectMinutes, tenantId), timeOutInMs);
	},
	deleteChatWebIntegration(webIntegrationName, tenantId, timeOutInMs = 15000) {
		browser.waitUntil(() => cx.chatWidget.deleteChatWebIntegration(webIntegrationName, tenantId), timeOutInMs);
	},
	deleteWhatsAppIntegration(integrationName, tenantId, timeOutInMs = 15000) {
		browser.waitUntil(() => cx.whatsApp.deleteWhatsAppIntegration(integrationName, tenantId), timeOutInMs);
	},
	createFlowVersion(flowId, timeOutInMs = 15000){
		let params = { "tenantId": process.ENV.tenantId, "flowId": flowId, mediaId:"", queueId:"" };
		let {version} = browser.waitUntil(() => cx.flows.createVersion(params), timeOutInMs);
		params['activeVersion'] = version;
		browser.waitUntil(() => cx.flows.setActiveVersion(params), timeOutInMs);
	},
	deleteAllSmoochAutomationWebIntegrations(webIntegrations) {
		if (webIntegrations.length > 0) {
            try {
                for (let i = 0; i < webIntegrations.length; i++) {
					if(webIntegrations[i].name === 'Config2 Automation Web Integration'){
						this.deleteChatWebIntegration('Config2 Automation Web Integration', process.ENV.tenantId);
					}
                }
            } catch (err) {
                throw new Error('Could not delete existing automation chat widget integrations due to ' + err);
            }
        } else {
            console.log("There are no chat widget automation web integrations to remove");
        }
	},
	deleteAllSmoochAutomationWhatsAppIntegrations(whatsappIntegrations) {
		if (whatsappIntegrations && whatsappIntegrations.length > 0) {
            try {
				whatsappIntegrations.forEach((whatsappIntegration) => { 
					if(whatsappIntegration.name === 'Config2 Automation WhatsApp Integration') { 
						this.deleteWhatsAppIntegration('Config2 Automation WhatsApp Integration', process.ENV.tenantId); 
					} 
				});
            } catch (err) {
                throw new Error('Could not delete existing automation whatsapp integrations due to ' + err);
            }
        } else {
            console.log("There are no whatsapp automation integrations to remove");
        }
	},
	deleteAllSmoochAutomationApps(apps) {
		if (apps.length > 0) {
            try {
                for (let i = 0; i < apps.length; i++) {
					if(apps[i].name === 'Chat Widget Automation App'){
						this.deleteChatWidgetApp('Chat Widget Automation App', process.ENV.tenantId);
					}
                }
            } catch (err) {
                throw new Error('Could not delete existing automation apps due to ' + err);
            }
        } else {
            console.log("There are no chat widget automation apps to remove");
        }
	}
};
module.exports = Api;
