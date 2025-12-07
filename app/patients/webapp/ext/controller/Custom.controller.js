sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/core/Fragment",
  "sap/m/MessageToast"
], function (Controller, Fragment, MessageToast) {
  "use strict";

  return Controller.extend("patients.ext.controller.Custom", {

    onInit: function () {
      // This log confirms controller is attached — look for it in Console
      console.log("Custom Section Controller Loaded");
      // dialog reference
      this._oDialog = null;
    },

    /**
     * Handler for the button in the section.
     * Loads the dialog fragment once and opens it.
     */
    onOpenDialog: function () {
      console.log("onOpenDialog() invoked");

      // The controller is attached to the ObjectPage controller context,
      // get the view from this controller.
      var oView = this.getView ? this.getView() : (this.base && this.base.getView && this.base.getView());

      // fallback guard
      if (!oView) {
        console.error("Unable to resolve view for the controller.");
        return;
      }

      // load dialog once
      if (!this._oDialog) {
        Fragment.load({
          id: oView.getId(), // ensure unique ids for nested fragments
          name: "patients.ext.fragment.CustomDialog",
          controller: this
        }).then(function (oDialog) {
          this._oDialog = oDialog;
          oView.addDependent(this._oDialog);
          this._oDialog.open();
        }.bind(this)).catch(function (err) {
          console.error("Error loading dialog fragment:", err);
        });
      } else {
        this._oDialog.open();
      }
    },

    onSaveDialog: function () {
      try {
        var sName = sap.ui.getCore().byId(this.getView().getId() + "--nameInput").getValue();
        var sMobile = sap.ui.getCore().byId(this.getView().getId() + "--mobileInput").getValue();
        var sCity = sap.ui.getCore().byId(this.getView().getId() + "--cityInput").getValue();

        // Put your save logic here (call CAP backend, etc.)
        MessageToast.show("Saved: " + sName + ", " + sMobile + ", " + sCity);

        if (this._oDialog) {
          this._oDialog.close();
        }
      } catch (e) {
        console.error(e);
      }
    },

    onCancelDialog: function () {
      if (this._oDialog) {
        this._oDialog.close();
      }
    }

  });
});
