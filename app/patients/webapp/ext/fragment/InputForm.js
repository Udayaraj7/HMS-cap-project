sap.ui.define([
    "sap/m/MessageToast"
], function(MessageToast) {
    'use strict';

    return {
        /**
         * Generated event handler.
         *
         * @param oEvent the event object provided by the event provider.
         */
        onPress: function(oEvent) {
            debugger
           // MessageToast.show("Custom handler invoked.");
           
            const patId = this.byId("patId").getValue();
            const patName = this.byId("patName").getValue();
            const patPhno = this.byId("patPhno").getValue();
            const gender = this.byId("gender").getSelectedKey();
            const status = this.byId("status").getValue();

            
            console.log("Patient ID:", patId);
            console.log("Patient Name:", patName);
            console.log("Phone Number:", patPhno);
            console.log("Gender:", gender);
            console.log("Status:", status);

            
            this.byId("patId").setValue("");
            this.byId("patName").setValue("");
            this.byId("patPhno").setValue("");
            this.byId("gender").setSelectedKey("");  
            this.byId("status").setValue("");

            MessageToast.show("Values printed in console!");
        },
        onCancel:function(oEvent)
        {
            debugger
            this.byId("patId").setValue("");
            this.byId("patName").setValue("");
            this.byId("patPhno").setValue("");
            this.byId("gender").setSelectedKey("");  
            this.byId("status").setValue("");
            MessageToast.show("values cleared");

        }
    };
});
