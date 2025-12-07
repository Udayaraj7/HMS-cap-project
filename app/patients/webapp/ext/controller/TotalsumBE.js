sap.ui.define([
    "sap/m/MessageToast"
], function (MessageToast) {
    'use strict';

    return {
        /**
         * Generated event handler.
         *
         * @param oContext the context of the page on which the event was fired. `undefined` for list report page.
         * @param aSelectedContexts the selected contexts of the table rows.
         */
        totalSumBe: async function (oContext, aSelectedContexts) {
            debugger;



            async function loadPatients() {
                let response = await $.ajax({
                    url: "/odata/v4/hservice/Patients",
                    method: "GET"
                });

                return response;  // return the value
            }

            async function run() {
                debugger
                const data = await loadPatients();
                console.log("Output of loadPatients():", data);
            }

            run();


            //  const pid=sap.ui.core.Element.getElementById("patients::PatientsObjectPage--fe::FormContainer::GeneratedFacet1::FormElement::DataField::patId::Field-display").getText();

            // console.log("Patient id =="+pid);
            // let pModel = sap.ui.core.Element.getElementById("patients::PatientsObjectPage--fe::CustomAction::Totalbackend").getModel();
            // let totalfuntion = pModel.bindContext(`/totalSumBE(...)`);
            // totalfuntion.setParameter("patientId", pid)
            // await totalfuntion.execute();

            // const resultbe=totalfuntion.getBoundContext().getObject();
            // debugger;
            // if (resultbe.hasOwnProperty("totalSum")) {
            //         sap.m.MessageBox.success("TOTAL  SUM ==> "+resultbe.totalSum);
            // } else if (resultbe.hasOwnProperty("result")) {
            //     sap.m.MessageBox.warning(" Patient has >>> "+resultbe.result);
            // }
            //     const res=resultbe.totalSum;
            // if(res!==0)
            // {
            //     sap.m.MessageBox.success("TOTAL  SUM ==> "+res);
            // }
            // else{
            //     sap.m.MessageBox.warning("** Patient has  No Visits**");
            // }




        }
    };
});
