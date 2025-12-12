sap.ui.define(
  ["sap/ui/core/mvc/ControllerExtension"],
  function (ControllerExtension) {
    "use strict";

    return ControllerExtension.extend("patients.ext.controller.Pobject", {
      override: {
        /**
         * Fires AFTER the Object Page has bound the selected patient.
         * This is the correct lifecycle hook for OP custom logic.
         */
        onInit: async function () {
          // you can access the Fiori elements extensionAPI via this.base.getExtensionAPI
          debugger;
          var oModel =  await this.base.getExtensionAPI().getModel();
          console.log("init function");

        },
        routing: {
          /*
          onAfterBinding: async function (oContext) {
            debugger;
          //   console.log("after binding");
          //   var oModel =  await this.base.getExtensionAPI().getModel();
           let pObject = await oContext.requestObject();
            
           

          //   let status=pObject.status;
          //   console.log("Status =", status);

          
          //     let VisitsTable = sap.ui.core.Element.getElementById(
          //       "patients::PatientsObjectPage--fe::table::patientsToVisits::LineItem::Visits-innerTable"
          //     );
          //     let editButton=sap.ui.core.Element.getElementById("patients::PatientsObjectPage--fe::StandardAction::Edit");
          //   if (status === "Inactive") {
              
          //     if (VisitsTable && editButton) {
          //       console.log("Hiding Visits Table because Status = Inactive");
          //       VisitsTable.setVisible(false);
          //       editButton.setEnabled(false);
          //     }
          //   }
          //   else if (status === "Active"){
          //     if (VisitsTable && editButton) {
          //       VisitsTable.setVisible(true);
          //       editButton.setEnabled(true);
          //     }
          //   }

          //////////////////////
          
    

      debugger
        // 1. Get the table
        const oTable = sap.ui.getCore().byId(
           "patients::PatientsObjectPage--fe::table::patientsToVisits::LineItem::Visits-innerTable"
        );

        if (!oTable) {
            console.log("Child table not found yet!");
            return;
        }

        // 2. Get binding for rows
        const oBinding = oTable.getBinding("items");

        if (!oBinding) {
            console.log("Child table binding not ready!");
            return;
        }

        

        oBinding.attachDataReceived(() => {
        const aRows = oBinding.getCurrentContexts().map(c => c.getObject());
        console.log("Child rows loaded:", aRows);
    });

        

   


          } */
         onBeforeBinding:async function(){
debugger
         },
         onAfterBinding: async function (oContext) {
                    debugger;
 
                    // Main entity data
                    const data = await oContext.requestObject();
                    console.log("Main entity:", data);
 
                    // Find the table
                    const oTable = sap.ui.getCore().byId(
                        "patients::PatientsObjectPage--fe::table::patientsToVisits::LineItem::Visits-innerTable"
                    );
 
                    debugger;
 
                    if (!oTable) {
                        console.log("Child table not found");
                        return;
                    }
 
                    const binding = oTable.getBinding("items");
 
                    // WAIT FOR CHILD TABLE TO FINISH LOADING!
                    binding.attachEventOnce("dataReceived", async () => {
                        debugger
                        const contexts = binding.getContexts(); // NOW it has values
 
                        const childData = await Promise.all(
                            contexts.map(c => c.requestObject())
                        );
 
                        debugger;
                        console.log("Child table rows:", childData);
 
 
 
 
                        // const childDataEasy = [];
 
                        // for (const ctx of contexts) {
                        //  const data = await ctx.requestObject();
                        //  childDataEasy.push(data);
                        // }
 
                        //  debugger;
                        // console.log("Child table rows:", childDataEasy);
 
                    });
                }
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


        } 
      }
    })
  }
);
