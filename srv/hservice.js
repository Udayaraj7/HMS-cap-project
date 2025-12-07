const cds = require('@sap/cds');
const { SELECT } = require('@sap/cds/lib/ql/cds-ql');


module.exports = cds.service.impl(function (srv) {

    //total sum backend patient
    this.on('totalSumBE', async function (req) {
        debugger;
        console.log("req", req)
        var patientId = req.data.patientId;
        console.log("patId== ", patientId);
        let visits = await SELECT('Visits').where({ patId: patientId });
        console.log('visits== ', visits);

        let sum = 0;
        if (visits.length > 0) {
            for (let v of visits) {
                console.log(v.visitsTotal);
                sum += v.visitsTotal;
            }
            console.log("Total sum " + sum);
            return {
                totalSum: sum
            }
        }
        else {
            // return {
            //     result:"No Visits"
            // }
            return {
                totalSum: sum
            }
        }


    })


    //Insert in to Patient table
    this.on('insertToPatient', async function (req) {
        debugger;
        console.log("req", req)
        const result = await INSERT.into(Patients).entries({
            patId: req.data.patientId,
            patName: req.data.patientName,
            patPhno: req.data.patientPhno,
            status: req.data.patientStatus
        });
        console.log(result);
        const inserted = result.results.changes;
        console.log(typeof inserted)

        return JSON.stringify(inserted);

    });

//validation
    this.before('insertToPatient', req => {
  if (!req.data.patientName) {
    req.error(400, "Name is required");
  }
  else if(req.data.patientName.length>=5)
  {
    req.error(400,"name should be less than 5 letters");
  }


    if (!req.data.patientPhno) {
    req.error(400, "Phno  is required");
  }
  else if(req.data.patientPhno.length!==10)
  {
    req.error(400,"phno should be excatly 10 digits");
  }


});


//Insert into Patient draft
    this.on('insertToPatientDraft', async function (req) {
        debugger;
        console.log("req", req)

        const { uuid } = cds.utils;
        const draftId = uuid();

         const result2 = await INSERT.into('DRAFT.DraftAdministrativeData').entries({
            DraftUUID: draftId,
            CreationDateTime: new Date().toISOString(),
            CreatedByUser: req.user.id,
            LastChangeDateTime: new Date().toISOString(),
            LastChangedByUser: req.user.id,
            InProcessByUser: req.user.id,
            DraftIsCreatedByMe: true,
            DraftIsProcessedByMe: true
        });

        const result = await INSERT.into(Patients.drafts).entries({
            patId: req.data.patientId,
            patName: req.data.patientName,
            patPhno: req.data.patientPhno,
            status: req.data.patientStatus,

            // IsActiveEntity: false,
            // HasActiveEntity: false,
            // HasDraftEntity: false,
            DraftAdministrativeData_DraftUUID: draftId,

        });
        console.log(result);
        const draftResult = result.results.changes;

       

        console.log(result2);
        const draftAdminResult = result2.results.changes;

        return {
            "patientdraft": draftResult,
            "draftAdmin": draftAdminResult
        }

    });




    const { Patients } = this.entities;


    this.before('CREATE', Patients.drafts, (req) => {
        debugger;
        // use date.now()
        const random = Math.floor(1000 + Math.random() * 9000);
        req.data.patId = `Peol${random}`;
        console.log('generated id before draft ');

        console.log('pateientdrafts → Generated patId:', req.data.patId);
    });

    this.on('CREATE', Patients.drafts, (req, next) => {
        debugger;
        console.log('on Patients.drafts ');
        return next();
    });

    this.after("CREATE", Patients.drafts, (data, req) => {
    console.log("Created Patient: in draft", data);
   
});





    this.before("CREATE", Patients, req => {
        debugger;
        console.log('starting create patient ');

        if (!req.data.patName) {
            req.error(400, "Name is required");
        }
        else {
            let patientName = req.data.patName
            if (patientName.length > 5) {
                req.error(400, "Name length should be less than 6");
            }
        }

        if (!req.data.patPhno) {
            req.error(400, "phno is required");
        }
        else {
            let patientphno = req.data.patPhno
            if (patientphno.length < 10 || patientphno.length > 10) {
                req.error(400, "phno should be exactly 10 digits");

            }

        }


        // req.data.patName = "ram"
        // console.log('changed name ');

        debugger
        if (!req.data.patId) {
            const num = Math.floor(1000 + Math.random() * 9000);
            req.data.patId = `Peol${num}`;
        }

        console.log("Generated Final ID Patient:", req.data.patId);
    });


    this.after("CREATE", Patients, (data, req) => {

        debugger;
        req.notify({ message: "Patient created successfully!" });
        console.log(data);

    });


    //read

    //  this.before("READ", Patients, req => {
    //     debugger
    //     req.query.SELECT.orderBy = [{ ref: ["patName"], sort: "asc" }];
    // });

    // this.on('READ', 'Patients', async (req, next) => {
    //     debugger
    //   const data = await next();
    //   return data.slice(0, 6); 
    // });

    //      this.after('READ', Patients, data => {
    //         debugger
    //         console.log(data);
    //     if (Array.isArray(data)) {
    //         data.forEach(p => {
    //             if (p.patPhno) {
    //                 const number=p.patPhno;
    //                let visible = number.slice(0, number.length - 5); 
    //                     visible=visible + "*****";
    //                     p.patPhno=visible
    //             }
    //         });
    //     } else {
    //         if (data.patPhno) {
    //             const number=p.patPhno;
    //                let visible = number.slice(0, number.length - 5); 
    //                     visible=visible + "*****";
    //                     p.patPhno=visible;
    //         }
    //     }
    // });


    //update

    this.before('UPDATE', Patients, req => {
        debugger;
        console.log('updating the patient');


        if (!req.data.patPhno) {
            req.error(400, "phno is required");
        }
        else {
            let patientphno = req.data.patPhno
            if (patientphno.length < 10 || patientphno.length > 10) {
                req.error(400, "phno should be exactly 10 digits");

            }

        }
    });

    this.on("UPDATE", Patients, async (req, next) => {
        debugger

        const old = await SELECT.one.from(Patients).where({ patId: req.data.patId });


        console.log("Old Phone:", oldPhno);
        console.log("New Phone:", newPhno);


        if (newPhno === oldPhno) {
            req.info(200, "No changes detected. Phone number is already same.");
            return old;
        }

        return next();
    });


    this.after("UPDATE", Patients, (data, req) => {
        debugger

        console.log("data:", data);

        req.notify("Patient updated successfully!");


    });







});
