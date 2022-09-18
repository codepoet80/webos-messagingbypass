function FirstAssistant() {
}

FirstAssistant.prototype.setup = function() {
	this.controller.setupWidget("btnLaunchApp", {}, {
		label : "Launch Accounts App",
		disabled: false
	});
};

FirstAssistant.prototype.activate = function(event) {
	Mojo.Event.listen(this.controller.get("btnLaunchApp"),Mojo.Event.tap, this.handleButton); 
};

FirstAssistant.prototype.handleButton = function() {
	params = {};
	params.id = "com.palm.app.accounts";
    this.launchRequest = new Mojo.Service.Request("palm://com.palm.applicationManager", {
        method: "open",
        parameters: params,
        onSuccess: function(response) {
            Mojo.Log.info("App Launch Success", JSON.stringify(response));
        },
        onFailure: function(response) {
            Mojo.Log.error("App Launch Failure", JSON.stringify(response));
        }
    });
    return true;
};

FirstAssistant.prototype.deactivate = function(event) {
	Mojo.Event.stopListening(this.controller.get("btnLaunchApp"), Mojo.Event.tap, this.handleButton);
};

FirstAssistant.prototype.cleanup = function(event) {
};
