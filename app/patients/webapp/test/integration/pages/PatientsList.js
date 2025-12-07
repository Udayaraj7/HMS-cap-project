sap.ui.define(['sap/fe/test/ListReport'], function(ListReport) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ListReport(
        {
            appId: 'patients',
            componentId: 'PatientsList',
            contextPath: '/Patients'
        },
        CustomPageDefinitions
    );
});