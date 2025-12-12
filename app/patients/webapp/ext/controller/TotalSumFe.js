sap.ui.define([
    "sap/m/MessageToast"
], function (MessageToast) {
    'use strict';

    return {

        totalSumFe: async function (oContext, aSelectedContexts) {
            debugger;

            let visitarr = sap.ui.core.Element.getElementById("patients::PatientsObjectPage--fe::table::patientsToVisits::LineItem::Visits-innerTable");

            //if id no found
            // if (visitarr) {
            //     visitarr=visitarr.getItems();
            // }
            // else{
            //     sap.m.MessageBox.error("Id not found");
            //     return;
            // }

            // if (visitarr.length > 0) {

            //     let visitTotalSum = 0;
            //     for (let visit of visitarr) {
            //         const visitobj = visit.getBindingContext().getObject();
            //         visitTotalSum += visitobj.visitsTotal;
            //     }
            //     console.log(visitTotalSum)

            //     sap.m.MessageBox.success("total visitssum ==> " + visitTotalSum);
            // }
            // else {
            //     sap.m.MessageBox.warning("Patient has no visits");
            // }

            ////////////////////////////////

            let pModel = sap.ui.core.Element.getElementById("patients::PatientsObjectPage--fe::CustomAction::Totalbackend").getModel();
            let totalfuntion = pModel.bindContext('/getPatient(...)');
            totalfuntion.setParameter("patId", 'P003')
            await totalfuntion.execute();
        
let result = totalfuntion.getBoundContext().getObject();
console.log("Result from backend:", result);
sap.m.MessageToast.show("Patient Name: " + result.value);

        }
    };
});
