namespace db;

entity Patients {
            //@Core.Computed: true
        key patId            : String  @(
                    Common.Label  : 'Patient ID',
                    UI.Placeholder: 'Enter Patient ID'
            )  @readonly;

            patName          : String;
            patPhno          : String;
            status           : String;
            statusCriticality : Integer;
            patientsToVisits : Composition of many Visits
                                       on patientsToVisits.patId = $self.patId;
}

entity Doctors {
        key docId           : String;
            docName         : String;
            specialization  : String;
            docPhno         : String;
            doctorsToVisits : Composition of many Visits
                                      on doctorsToVisits.docId = $self.docId;
}

entity Visits {
        key visitId          : String;
            patId            : String;
            docId            : String;
            visitsTotal      : Integer;
            visitsToDoctors  : Association to one Doctors
                                       on visitsToDoctors.docId = docId;
            visitsToPatients : Association to one Patients
                                       on visitsToPatients.patId = patId;
}
