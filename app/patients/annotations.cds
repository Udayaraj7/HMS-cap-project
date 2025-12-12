using hservice as service from '../../srv/hservice';
annotate service.Patients with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'patId',
                Value : patId,
            },
            {
                $Type : 'UI.DataField',
                Label : 'patName',
                Value : patName,
            },
            {
                $Type : 'UI.DataField',
                Label : 'patPhno',
                Value : patPhno,
            },
            {
                $Type : 'UI.DataField',
                Value : status,
                Label : 'status',
            },
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : 'General Information',
            Target : '@UI.FieldGroup#GeneratedGroup',
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Visits',
            ID : 'Visits',
            Target : 'patientsToVisits/@UI.LineItem#Visits',
        },
    ],
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : 'patId',
            Value : patId,
        },
        {
            $Type : 'UI.DataField',
            Label : 'patName',
            Value : patName,
        },
        {
            $Type : 'UI.DataField',
            Label : 'patPhno',
            Value : patPhno,
        },
        {
            $Type : 'UI.DataField',
            Label:'status',
            Value : status,
            Criticality : statusCriticality,
            CriticalityRepresentation : #WithIcon,
        },
    ],
    UI.SelectionPresentationVariant #table : {
        $Type : 'UI.SelectionPresentationVariantType',
        PresentationVariant : {
            $Type : 'UI.PresentationVariantType',
            Visualizations : [
                '@UI.LineItem',
            ],
        },
        SelectionVariant : {
            $Type : 'UI.SelectionVariantType',
            SelectOptions : [
            ],
        },
    },
    UI.SelectionPresentationVariant #table1 : {
        $Type : 'UI.SelectionPresentationVariantType',
        PresentationVariant : {
            $Type : 'UI.PresentationVariantType',
            Visualizations : [
                '@UI.LineItem',
            ],
        },
        SelectionVariant : {
            $Type : 'UI.SelectionVariantType',
            SelectOptions : [
            ],
        },
    },
    UI.HeaderInfo : {
        TypeName : '',
        TypeNamePlural : '',
    },
    Communication.Contact #contact : {
        $Type : 'Communication.ContactType',
        fn : status,
    },
);

annotate service.Visits with @(
    UI.LineItem #Visits : [
        {
            $Type : 'UI.DataField',
            Value : docId,
            Label : 'docId',
        },
        {
            $Type : 'UI.DataField',
            Value : patId,
            Label : 'patId',
        },
        {
            $Type : 'UI.DataField',
            Value : visitId,
            Label : 'visitId',
        },
        {
            $Type : 'UI.DataField',
            Value : visitsTotal,
            Label : 'visitsTotal',
        },
    ],
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'General Information',
            ID : 'GeneralInformation',
            Target : '@UI.FieldGroup#GeneralInformation',
        },
    ],
    UI.FieldGroup #GeneralInformation : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : docId,
                Label : 'docId',
            },
            {
                $Type : 'UI.DataField',
                Value : patId,
                Label : 'patId',
            },
            {
                $Type : 'UI.DataField',
                Value : visitId,
                Label : 'visitId',
            },
            {
                $Type : 'UI.DataField',
                Value : visitsTotal,
                Label : 'visitsTotal',
            },
        ],
    },
);

annotate service.Patients with {
    status @Common.Label : 'group'
};

