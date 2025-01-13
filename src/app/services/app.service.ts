import { Patient } from "../patients/patient";

export class PatientService {
    private patients: Patient[] = [];
    
    addPatient(patient: Patient) {
      patient.id = this.generateUniqueId(); // Assuming Patient has an 'id' property
      patient.checkInTime = this.getCurrentTimeString(); // Set checkInTime when adding a patient
      this.patients.push(patient);
    }
    
    // Sets the patient's status to inactive
    clearActivePatient(clearPatientByID: string): void {
      let donePatient: Patient | undefined = this.getPatient(clearPatientByID);    
      
      if(donePatient == undefined) {
        console.log("Patient not found");
        return;
      }

      const index = this.patients.findIndex(patient => patient === donePatient);
      this.patients[index].isActive === false;

    }
    
    // Returns all patients with an active property
    getActivePatients() {
      return this.patients.filter(patient => patient.isActive); // Assuming Patient has a public 'isActive' property
    }

    /* Returns a specific patients based on their unqiue id.
      If no patient is found, returns undefined value.
      Must be handled outside of this method.
    */
    getPatient(patientId: string): Patient | undefined {
      let foundPatient: Patient | undefined = this.patients.find(patient => patient.getID());   // FIXME
      
      return foundPatient;
    }
    /* Returns a specific patients based on their unqiue id.
      If no patient is found, returns undefined value.
      Must be handled outside method.
    */
    // Returns all patients stored in patient array
    getAllPatients(): Patient[] {
      return this.patients;
    }
    
    // Removes the patient from the list of stored patients
    deletePatient(id: string) {
        const index = this.patients.findIndex(patient => patient.id === id);
        if (index !== -1) {
          this.patients.splice(index, 1);
        }
    }
  
    private generateUniqueId() {
      let uniqueId = Math.random().toString(36).substr(2, 9);
      while (this.patients.some(patient => patient.id === uniqueId)) {
        uniqueId = Math.random().toString(36).substr(2, 9);
      }
      return uniqueId;
    }

    // Updates the status of the patient with the given ID to inactive
      updatePatientStatus(patientId: string) {
        const patient = this.patients.find(patient => patient.id === patientId);
        if (patient) {
            patient.isActive = false;
        }
    }
    private getCurrentTimeString(): string {
      const date = new Date();
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const seconds = date.getSeconds().toString().padStart(2, '0');
      return `${hours}:${minutes}`;
  }
    updateCheckInTime(patientId: string, newCheckInTime: string): void {
      const patient = this.patients.find(patient => patient.id === patientId);
      if (patient) {
          patient.checkInTime = newCheckInTime;
      } else {
          console.log("Patient not found");
      }
  }
  }