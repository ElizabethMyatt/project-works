import { PatientService } from "../app/services/app.service";

interface Patient {
    id: number;
    name: string;
    active: boolean;
}

class Queue {
    private patients: Patient[];

    constructor() {
        this.patients = [];
    }

    addPatient(patient: Patient) {
        this.patients.push(patient);
    }

    removePatient(patientId: number) {
        this.patients = this.patients.filter(patient => patient.id !== patientId);
    }

    getActivePatients() {
        return this.patients;
    }

    updatePatientStatus(patientId: number, active: boolean) {
        const patient = this.patients.find(patient => patient.id === patientId);
        if (patient) {
            patient.active = active;
        }
    }
}

// Create a queue instance
const queue = new Queue();

// Add patients to the queue
queue.addPatient({ id: 1, name: "John Doe", active: true });
queue.addPatient({ id: 2, name: "Jane Smith", active: true });
queue.addPatient({ id: 3, name: "Mike Johnson", active: true });

// Get active patients from the queue
const activePatients = queue.getActivePatients();

// Display the list of active patients
activePatients.forEach(patient => {
    console.log(`Patient ID: ${patient.id} - Name: ${patient.name}`);
});

// Function to handle complete button click
function handleCompleteButtonClick(patientId: number) {
    // Remove patient from the queue
    queue.removePatient(patientId);
    const patientService = new PatientService(); // Instantiate PatientService
    patientService.updatePatientStatus(patientId.toString()); // Call updatePatientStatus
    console.log(`Patient with ID ${patientId} has been completed.`);
}

// Example usage of the complete button
activePatients.forEach(patient => {
    console.log(`Patient ID: ${patient.id} - Name: ${patient.name}`);
    console.log(`<button onclick="handleCompleteButtonClick(${patient.id})">Complete</button>`);
});