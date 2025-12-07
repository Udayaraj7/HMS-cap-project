sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"patients/test/integration/pages/PatientsList",
	"patients/test/integration/pages/PatientsObjectPage",
	"patients/test/integration/pages/VisitsObjectPage"
], function (JourneyRunner, PatientsList, PatientsObjectPage, VisitsObjectPage) {
    'use strict';

    var runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('patients') + '/test/flp.html#app-preview',
        pages: {
			onThePatientsList: PatientsList,
			onThePatientsObjectPage: PatientsObjectPage,
			onTheVisitsObjectPage: VisitsObjectPage
        },
        async: true
    });

    return runner;
});

