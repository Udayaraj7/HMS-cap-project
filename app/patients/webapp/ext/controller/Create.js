
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
            CustomCreate: function () {
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
                                        const mobile = sap.ui.getCore().byId("mobileInput").getValue();
                                        const status = sap.ui.getCore().byId("Status").getValue();

                                        let pModel = sap.ui.core.Element.getElementById("patients::PatientsList--fe::table::Patients::LineItem-innerTable").getModel();
                                        let totalfuntion = pModel.bindContext(`/insertToPatient(...)`);

                                        let id = "Peol" + Date.now();
                                        totalfuntion.setParameter("patientId", id);
                                        totalfuntion.setParameter("patientName", name);
                                        totalfuntion.setParameter("patientPhno", mobile);
                                        totalfuntion.setParameter("patientStatus", status);
                                        await totalfuntion.execute();

                                        const result = totalfuntion.getBoundContext().getObject();
                                        console.log(result);

                                        this._dialog.close();
                                        if (result.value == 1) {
                                            sap.m.MessageBox.success(`${result.value} record  inserted successfully`);
                                        }
                                    }
                                    catch (e) {
                                            let msg = "";
                                            console.log(e);
                                            console.log(e.error);

                                            if (e.error.details) {
                                                for (const err of e.error.details) {
                                                    msg += err.message + "\n";
                                                }
                                            } else {
                                                msg = e.message;
                                            }

                                            sap.m.MessageBox.error(msg);
                                        }



                                }.bind(this)
                            }),


                            new Button({
                                text: "Save Draft",
                                type: "Emphasized",
                                press: async function () {
                                    const name = sap.ui.getCore().byId("nameInput").getValue();
                                    const mobile = sap.ui.getCore().byId("mobileInput").getValue();
                                    const status = sap.ui.getCore().byId("Status").getValue();

                                    let pModel = sap.ui.core.Element.getElementById("patients::PatientsList--fe::table::Patients::LineItem-innerTable").getModel();
                                    let totalfuntion = pModel.bindContext(`/insertToPatientDraft(...)`);

                                    let id = "Peol" + Date.now();
                                    totalfuntion.setParameter("patientId", id);
                                    totalfuntion.setParameter("patientName", name);
                                    totalfuntion.setParameter("patientPhno", mobile);
                                    totalfuntion.setParameter("patientStatus", status);
                                    await totalfuntion.execute();


                                    const result = totalfuntion.getBoundContext().getObject();
                                    console.log(result);


                                    this._dialog.close();
                                    if (result.patientdraft == 1 && result.draftAdmin == 1) {
                                        sap.m.MessageBox.success(`Record inserted in draft`);
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



