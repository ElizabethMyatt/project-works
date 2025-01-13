import express, { Application, Request, Response } from "express";
import { pino } from 'pino';

interface Patient {
    id: string;
    name: string;
    dob: Date;
    // Other personal information fields...
  }
  