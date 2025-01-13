// Import the express and handlebars libraries
import express, { Application } from "express";
import { engine } from "express-handlebars";

export const HandlebarsMiddleware = {
  setup(app: Application) {
    // set up handlebars view engine, register w/ express
    app.engine(
      ".hbs",
      engine({
        extname: ".hbs",
        defaultLayout: "main",
      })
    );
    app.set("view engine", ".hbs");
    app.set("views", "./views");
    app.use('/src/app/jsfilesCreated', express.static('src/app/jsfilesCreated'));
  },
};

