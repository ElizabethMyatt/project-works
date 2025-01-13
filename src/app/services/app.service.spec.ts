import { describe, expect, it } from "@jest/globals";
import { PatientService } from './app.service';
import { Patient } from "../patients/patient";


describe('AppService', () => {
    let appService: PatientService;
    let newPatient: Patient;

    beforeEach(() => {
        appService = new PatientService();
        newPatient = new Patient('Cornelius', '123 Street', '123-456-7890', '2003-12-22', 'male', 20);
    });

    it('should be created', () => {
        expect(appService).toBeTruthy();
    });

    it('should add a patient to the array', () => {
        appService.addPatient(newPatient);
        appService.addPatient(newPatient); // Add duplicate patient. Should still have a second active patient

        let patientArray: Patient[] = appService.getActivePatients();   // Locally store patient array from service


        expect(newPatient === patientArray[0]);
        expect(newPatient === patientArray[1]);

    });

    it('should remove a patient from the array of active patients', () => {
        appService.addPatient(newPatient);

        let patientArray: Patient[] = appService.getAllPatients();   // Locally store patient array from service

        const patientId = patientArray[0].getID();

        appService.deletePatient(patientId);

        patientArray = appService.getAllPatients();

        expect(patientArray[0] != newPatient);

    });

    it('should turn the patient data isActive to false', () => {
        appService.addPatient(newPatient);
        appService.addPatient(newPatient); // Add duplicate patient. Should still have a second active patient

        let patientArray: Patient[] = appService.getActivePatients();   // Locally store patient array from service

        // Should test if patient data is added to array of patients
        expect(newPatient === patientArray[0]);
        expect(newPatient === patientArray[1]);

        // Set patient status to false based on unique id
        appService.clearActivePatient(patientArray[0].getID());
        patientArray = appService.getAllPatients();

        // Clearing active patient should leave the other patients intact   
        let patientID: any = patientArray.at(0)?.getID();
        expect(patientID instanceof String);
        expect(appService.getPatient(patientID) != newPatient);
        expect(newPatient.getActiveStatus() === patientArray[1].getActiveStatus());

    });
    // Add more test cases here

});