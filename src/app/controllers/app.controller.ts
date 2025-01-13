import { Request, Response, Router } from "express";
import { pino } from 'pino';
import { Patient } from "../patients/patient";
import { StaffuserService } from "../services/staffuser.service";
import { PatientService } from "../services/app.service";



export class AppController {
  public router: Router = Router();
  private log: pino.Logger = pino();


  constructor(private staffuserService: StaffuserService, private patientServiceInstance: PatientService) {
    this.initializeRouter();
  }

  

  private initializeRouter() {
    
     // This is where you're storing your patients
    // Serve the home page
    this.router.get("/", (req: Request, res: Response) => {
      try {
        // Render the "home" template as HTML
        res.render("home");
      } catch (err) {
        this.log.error(err);
      }
    });

    // Render the patient information page
    this.router.get('/infopatient', (req: Request, res: Response) => {
      try {
        res.render("infopatient");
      } catch (err) {
        this.log.error(err);
        res.status(500).send("Internal Server Error");
      }
    });
    this.router.post('/addPatient', (req: any, res: Response) => {
      try {
        console.log(req.body.birthday);
        req.session.newPatient = new Patient(req.body.name, req.body.address, req.body.phoneNumber, 
          req.body.birthday, req.body.gender, req.body.age);
        console.log("in addPatient post", req.session);
        res.redirect("/consentform");
      } catch (err) {
        this.log.error(err);
      }
    });
    
    // Render the consent page
    this.router.get('/consentform', (req: Request, res: Response) => {
      try {
        res.render("consentform");
      } catch (err) {
        this.log.error(err);
        res.status(500).send("Internal Server Error");
      }
    });
    // Handle form submission
    this.router.post('/consentform', async (req: any, res: Response) => {
      try {
        console.log("in consent form post", req.session);
        if(req.session.newPatient) {
          this.patientServiceInstance.addPatient(req.session.newPatient);
          res.redirect('/checkInConfirm');

        } else {
          this.log.error("newPatient does not exist");
        }
      } catch (err) {
        this.log.error(err);
        res.status(500).send("Internal Server Error");
      }
    });

    // Render the checkInConfirm page
    this.router.get("/checkInConfirm", (req: any, res: Response) => {
      try {
        delete req.session.newPatient;    // Must clear newPatient for next patient
        res.render("checkInConfirm");
      } catch (err) {
        this.log.error(err);
        res.status(500).send("Internal Server Error");
      }
    });


    this.router.get('/lobby', (req: Request, res: Response) => {
      try {
        const activePatients = this.patientServiceInstance.getActivePatients();
        console.log(activePatients); // Add this line
        res.render('lobby', {patients: activePatients});
      } catch (err) {
        this.log.error(err);
      }
    });
    this.router.post('/checkIn', (req: any, res: Response) => {
      try {
          const newPatient = new Patient(
              req.body.name,
              req.body.address,
              req.body.phonenum,
              req.body.birthDate,
              req.body.gender,
              req.body.age,
              '', // id
              true, // isActive
              getCurrentTimeString() // checkInTime
          );
          this.patientServiceInstance.addPatient(newPatient);
          req.session.newPatient = newPatient;
          res.redirect('/checkInConfirm');
      } catch (err) {
          this.log.error(err);
          res.status(500).send('Internal Server Error');
      }
  });


  this.router.get("/staffLogin", function (req, res) {
    res.render("staffLogin");
  });

  this.router.post("/staffLogout", (req: any, res) => {
    delete req.session.user;
    res.redirect("/staffLogin"); // Redirect to the login page after logout
  });

  this.router.get("/staffSignup", function (req: any, res) {
    res.render("staffSignup");
  });

  this.router.post("/staffSignup", async (req, res) => {
    const user = await this.staffuserService.createUser(req.body.username, req.body.email, req.body.password);
    (req.session as any).user = user;
    res.redirect("/staffLogin");
  });

  // Handle login form submissions
  this.router.post("/StaffLogin", async (req: any, res) => {
    const user = await this.staffuserService.authenticateUser(req.body.email, req.body.password);
    if (user) {
      req.session.user = user;
      res.render('staff', { username: req.session.user.username, user: req.session.user });
    } else {
      res.status(401).send("Invalid email or password");
    }
  });

  // Enforce security
  this.router.use((req: any, res: Response, next) => {
    if (req.session.user) {
      next();
    } else {
      res.render("staffLogin", {
        error: "You need to log in first",
      });
    }
  });

// Serve the home page
this.router.get("/", (req: any, res) => {
  try {
    res.render("home", {
      user: req.session.user,
    });
  } catch (err) {
    this.log.error(err);
  }
});

}


}

function getCurrentTimeString(): string | undefined {
  throw new Error("Function not implemented.");
}
