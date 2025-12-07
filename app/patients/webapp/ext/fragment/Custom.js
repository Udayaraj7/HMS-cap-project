// sap.ui.define(["sap/m/Dialog", "sap/m/Text", "sap/m/Button"], 
// function (Dialog, Text, Button) {
//     "use strict";

//     return {
//         onOpenDialog: function (oEvent) {
//             debugger
//             // Create dialog only once
//             if (!this._dialog) {
//                 this._dialog = new Dialog({
//                     title: "Sample Dialog",
//                     content: new Text({ text: "Dialog opened successfully!" }),
//                     beginButton: new Button({
//                         text: "Close",
//                         press: function () {
//                             this._dialog.close();
//                         }.bind(this)
//                     })
//                 });
//             }

//             this._dialog.open();
//         }
//     };
// });


sap.ui.define([
    "sap/m/Dialog",
    "sap/m/Text",
    "sap/m/Button",
    "sap/m/VBox",
    "sap/m/Label",
    "sap/m/Input"
],
function (Dialog, Text, Button, VBox, Label, Input) {
    "use strict";

    return {
        onOpenDialog: function () {
            debugger;

            
            if (!this._dialog) {

        
                const oVBox = new VBox({
                    class: "sapUiSmallMargin",
                    items: [
                        new Label({ text: "Name" }),
                        new Input({ id: "nameInput" }),

                        new Label({ text: "Mobile Number" }),
                        new Input({ id: "mobileInput", type: "Number" }),

                        new Label({ text: "City" }),
                        new Input({ id: "cityInput" })
                    ]
                });

                // Create Dialog
                this._dialog = new Dialog({
                    title: "User Details",
                    content: oVBox,

                    beginButton: new Button({
                        text: "Save",
                        type: "Emphasized",
                        press: function (){
                            const name = sap.ui.getCore().byId("nameInput").getValue();
                            const mobile = sap.ui.getCore().byId("mobileInput").getValue();
                            const city = sap.ui.getCore().byId("cityInput").getValue();

                            console.log("Saved:", name, mobile, city);
                            sap.m.MessageBox.information(`Saved: name: ${name} ,phno :${mobile} , city :${city}`);

                            this._dialog.close();
                                  
                                }.bind(this),
                    }),

                    endButton: new Button({
                        text: "Cancel",
                        press: function () {
                            this._dialog.close();
                        }.bind(this)
                    })
                });
            }

            sap.ui.getCore().byId("nameInput").setValue("");
            sap.ui.getCore().byId("mobileInput").setValue("");
            sap.ui.getCore().byId("cityInput").setValue("");


 

            this._dialog.open();
        }
    };
});


