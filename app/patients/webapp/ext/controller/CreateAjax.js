
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
            CustomCreateAjax: function () {
                debugger;


                if (!this._dialog) {


                    const oVBox = new VBox({
                        class: "sapUiSmallMargin",
                        items: [
                            new Label({ text: "PatientName" }),
                            new Input({ id: "nameInput" }),

                            new Label({ text: "PatientPhnoNumber" }),
                            new Input({ id: "mobileInput" }),

                            new Label({ text: "PatientStatus" }),
                            new Input({ id: "Status" })
                        ]
                    });

                    // Create Dialog
                    this._dialog = new Dialog({
                        title: "Patient Details",
                        content: oVBox,

                        buttons: [


                            new Button({
                                text: "Save",
                                type: "Success",
                                press: async function () {
                                    debugger;
                                    try {
                                        const name = sap.ui.getCore().byId("nameInput").getValue();
                                        const phone = sap.ui.getCore().byId("mobileInput").getValue();
                                        const status = sap.ui.getCore().byId("Status").getValue();

                                        let id = "Peol-" + Date.now();
                                        const payload = {
                                            patId: id,
                                            patName: name,
                                            patPhno: phone,
                                            status: status,
                                            IsActiveEntity: true
                                        };

                                        //insert in active table
                                        let obj = await $.ajax({
                                            url: `/odata/v4/hservice/Patients`,
                                            method: "POST",
                                            contentType: "application/json",
                                            data: JSON.stringify(payload)
                                        });


                                        console.log("inserted Object:", obj);

                                        if (obj.IsActiveEntity === true) {
                                            sap.m.MessageBox.success(`Record Inserted `);
                                        } else {
                                            sap.m.MessageBox.error(`Insertion Failed`);
                                        }


                                        //activate the draft
                                        // let pid = draft.patId;

                                        //Activate draft (move from drafts to main table)
                                        // let activated = await $.ajax({
                                        //     url: `/odata/v4/hservice/Patients(patId='${draft.patId}',IsActiveEntity=false)/draftActivate`,
                                        //     method: "POST",
                                        //     contentType: "application/json"
                                        // });


                                        // console.log("Final saved record:", activated);

                                        // if (activated.IsActiveEntity === true) {
                                        //     sap.m.MessageBox.success(`Record Inserted `);
                                        // } else {
                                        //     sap.m.MessageBox.error(`Insertion Failed`);
                                        // }

                                        this._dialog.close();

                                    }
                                    catch (e) {

                                        //for draft acivate 
                                        // let msg = "";
                                        // console.log("object--",e);
                                        // console.log(e.error);

                                        // if (e.error.details) {
                                        //     for (const err of e.error.details) {
                                        //         msg += err.message + "\n";
                                        //     }
                                        // } else {
                                        //     msg = e.message;
                                        // }
                                        // sap.m.MessageBox.error(msg);

                                        //new
                                        let msg = "";

                                        
                                        if (e?.responseJSON?.error?.details?.length) {
                                            msg = e.responseJSON.error.details.map(err => err.message).join("\n");
                                        } else if (e?.responseJSON?.error?.message) {
                                        
                                            msg = e.responseJSON.error.message;
                                        } else if (e?.message) {
                                            msg = e.message;
                                        } else {
                                            msg = "An unexpected error occurred";
                                        }

                                        sap.m.MessageBox.error(msg);

                                    }



                                }.bind(this)
                            }),



                            // CANCEL BUTTON
                            new Button({
                                text: "Cancel",
                                type: "Reject",
                                press: function () {
                                    this._dialog.close();
                                }.bind(this)
                            })
                        ]
                    });
                }

                sap.ui.getCore().byId("nameInput").setValue("");
                sap.ui.getCore().byId("mobileInput").setValue("");
                sap.ui.getCore().byId("Status").setValue("");




                this._dialog.open();
            }
        };
    });



