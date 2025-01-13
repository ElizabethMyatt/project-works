export class Patient {
    private name: string;
    private birthDate: string;
    private address: string;
    private phonenum: string;
    private gender: string;
    private age: number;
    checkInTime: string;
    id: string;
    isActive: boolean;
  
    // Constructor
    constructor(name: string, address: string, phonenum: string, birthDate: 
    string, gender: string, age: number, id = '', isActive = true, checkInTime: string = '') {
        this.name = name;
        this.address = address;
        this.phonenum = phonenum;
        this.birthDate = birthDate;
        this.gender = gender;
        this.age = age;
        this.checkInTime = checkInTime;
        this.id = id;
        this.isActive = isActive;
    }

    // Methods to access properties
    getGender(): string{
        return this.gender;
    }

    getCheckInTime(): string {
        return this.checkInTime;
    }

    getName(): string {
        return this.name;
    }

    getAddress(): string {
        return this.address;
    }

    getPhonenumber(): string {
        return this.phonenum;
    }

    getBirthday(): string {
        return this.birthDate;
    }

    getAge(): number {
        return this.age;
    }
    getID(): string {
        return this.id;
    }
    getActiveStatus() {
        return this.isActive;
    }
    setCheckInTime(newCheckInTime: string): void {
        this.checkInTime = newCheckInTime;
    }
    

}

