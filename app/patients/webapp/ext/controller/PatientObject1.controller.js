sap.ui.define(['sap/ui/core/mvc/ControllerExtension'], function (ControllerExtension) {
	'use strict';

	return ControllerExtension.extend('patients.ext.controller.PatientObject1', {
		// this section allows to extend lifecycle hooks or hooks provided by Fiori elements
		override: {
			/**
             * Called when a controller is instantiated and its View controls (if available) are already created.
             * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
             * @memberOf patients.ext.controller.PatientObject1
             */
			onInit: function () {
				debugger
				// you can access the Fiori elements extensionAPI via this.base.getExtensionAPI
				var oModel = this.base.getExtensionAPI().getModel();
			},
			editFlow: {
          onBeforeEdit: async function (oBindingContext) {
            debugger;
            console.log("on before edit")
          }
          ,onAfterEdit:async function(){
            debugger;
            console.log("on after edit")
          }
        } ,
		routing:{
			onBeforeBinding:async function()
			{
				debugger;
            console.log("on before binding")
			},
			onAfterBinding:async function()
			{
					debugger;
            console.log("on after binding")
			},

		}

		}
	});
});
