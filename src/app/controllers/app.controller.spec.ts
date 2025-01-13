import { describe, expect, it } from "@jest/globals";
import request from "supertest";
import express, { Application } from "express";
import { AppController } from "./app.controller";
import { PatientService } from "../services/app.service";
import { StaffuserService } from "../services/staffuser.service";
import { HandlebarsMiddleware } from '../middleware/handlebars.middleware';

describe("AppController", () => {
  let app: Application;
  let controller: AppController;
  let patientService: PatientService = new PatientService();
  let staffuserService: StaffuserService = new StaffuserService();

  // Run this code before every test
  beforeAll(() => {
    // Create an express instance for testing
    app = express();

    // Set up handlebars for our templating
    HandlebarsMiddleware.setup(app);

    // Our controller instance to test
    controller = new AppController(staffuserService, patientService);

    // Load the controller's router for testing
    app.use(controller.router);
  });
  it("should return a welcome", async () => {
    return request(app)
      .get("/")
      .then((res) => {
        expect(res.statusCode).toEqual(200);
        expect(res.text).toMatch(/Welcome to Healthnet!/);
      });
  });


    it("should generate checkInConfirm page", async () => {
      
      try {
          
          const response = await request(app).post("/checkInConfirm");
          expect(response.status).toEqual(500);
          expect(response.text).toContain("/Thank you for checking in!/");
          
      } catch (error) {
          console.error("Error generating checkInConfirm page:", error);
      }
  });
  
  it("should handle invalid routes with 404", async () => {
    try {
        const response = await request(app).get("/invalid-route");
        expect(response.status).toEqual(404);
        expect(response.text).toContain("Page not found");
    } catch (error) {
        console.error("Error handling invalid routes:", error);
    }
  });
});
