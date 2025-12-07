using db from '../db/schema';

service hservice{
    @odata.draft.enabled
    entity Patients as projection on db.Patients;
    entity Doctors as projection on db.Doctors;
    entity Visits as projection on db.Visits;

    function totalSumBE(patientId:String)
        returns String;

        function insertToPatient(patientId:String,patientName:String,patientPhno:String,patientStatus:String)
        returns String;

        function insertToPatientDraft(patientId:String,patientName:String,patientPhno:String,patientStatus:String)
        returns String;
    
    
}