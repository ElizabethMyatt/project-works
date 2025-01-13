import { describe, expect, it } from "@jest/globals";
import { Patient } from "./patient";

describe("Patient", () => {
    let patient: Patient;
    const name = "Travis Phelps";
    const address = "23 Bird Lane";
    const phonenum = "850-298-9889";
    const birthDate = "09-19-1998";
    const gender = "male";
    const age = 29;
    const id = "";
    const height = "5'7";
    const weight = 150;
    const email = "travis@gmail.com";
    const addictions = "none";
    const preferredPharmacy = "none";
    const allergies = "none";
    const currentSymptoms = "none";
    const medicalHistory = "none";
    const prescriptionHistory = "none";
    const primaryDoctor = "Dr. Henry Parker";
    beforeAll(() => {
        patient = new Patient(name, address, phonenum, birthDate, gender, age, id);
    });
    it("should make a new patient with all the right information", () => {
        expect(patient).toBeInstanceOf(Patient);
        expect(patient.getName()).toEqual(name);
        expect(patient.getAddress()).toEqual(address);
        expect(patient.getPhonenumber()).toEqual(phonenum);
        expect(patient.getBirthday()).toEqual(birthDate);
        expect(patient.getGender()).toEqual(gender);
        expect(patient.getAge()).toEqual(age);
        expect(patient.getID()).toEqual(id);
    });

    it("should return the correct active status", () => {
        expect(patient.getActiveStatus()).toEqual(true);
      });
    
    // Unknown type should become negative
    it("should become inactive once clinic is done with patient", () => {
        patient.isActive = false;
        expect(patient.getActiveStatus());
    });
      
});