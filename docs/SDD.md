# Software Design Description
## For Health Net

Prepared by Morgan Campbell  
UWF 
3/20/2024

Table of Contents
=================
* [Revision History](#revision-history)
* 1 [Introduction](#1-introduction)
  * 1.1 [Document Purpose](#11-document-purpose)
  * 1.2 [Product Scope](#12-product-scope)
* 2 [Design](#2-overall-description)
  * 2.1 [Selected Viewpoints](#22-selected-viewpoints)
    * 2.1.1 [Context](#221-context)
    * 2.1.2 [Composition](#222-composition)
    * 2.1.3 [Logical](#223-logical)
    * 2.1.4 [Dependency](#224-dependency)
    * 2.1.5 [Information](#225-information)
    * 2.1.6 [Patterns](#226-patterns)
    * 2.1.7 [Interface](#227-interface)
    * 2.1.8 [Structure](#228-structure)
    * 2.1.9 [Interaction](#229-interaction)
    * 2.1.10 [State dynamics](#2210-state-dynamics)
    * 2.1.11 [Algorithm](#2211-algorithm)
    * 2.1.12 [Resources](#2212-resources)
    * 2.1.13 [Physical](#2213-physical)
    * 2.1.14 [Deployment](#2214-deployment)
    * 2.1.15 [Concurrency](#2215-concurrency)
    * 2.1.16 [Behavioral](#2216-behavioral)

## 1. Introduction

### 1.1 Document Purpose
This document is meant to provide insight on our design approach on HealthNet for CEN3031. This is intended to be read by our clients (Dr. Fridge). This will serve as a reference point for our iterations of the software. It will break down our scope and viewpoints on different aspects of the project. 

### 1.2 Product Scope
For walk-ins, the app on the tablet will ask for the patient’s name, age, date of birth, weight, height, addictions(nicotine, alcohol, etc), phone number(s), address, symptoms, medical history, allergies, current medications, and insurance. If the preferred doctor is unavailable, their name will be unable to be selected, and the patient will be notified that they are booked for the day. Additionally, the application on the tablet will display an informed consent document. This is imperative due to the care they will receive. The patient can’t move on to the next page until the page is filled. The patient will receive email confirmation they completed the required documentation for their visit.

On the doctor’s side of the software, they will be able to view patient data. From their screen, they can input feedback, diagnoses, prescriptions and their frequencies (cream, pill, liquid, injection, etc). 

Secretaries will manage appointments of patients. Additionally, secretaries check in and check out patients. Moreover, secretaries send the prescription to the patient's preferred pharmacy during the checkout process.

Patient data will be stored in a database for later retrieval. An automated email will be sent after the patient’s visit. The email will not contain information that would violate HIPAA laws.

There will be a screen display on a TV showcasing patients first name and the first letter of their last name while showing their place in queue.

## 2. Design
We are utilizing an agile-approach design to be flexible with changes in the workflow. We started with light-weight modeling to get an over arching view on the architecture of our project. Now, our team uses test-driven development to prevent bugs from occuring. We will also have refactoring in our future sprints to add features without modifying our existing code. By separating our files, we reduce complexity to have modularization, which thus helps us create high cohesion in the software.

### 2.1 Selected Viewpoints

#### 2.1.1 Context

The software system interacts with two types of users and one external system:

- `Patients`: Patients use the system to check in, fill out consent forms, and view their place in the queue.
- `Employees`: Employees (doctors and secretaries) use the system to manage patients and update the database.
- `Email Server`: The system interacts with an email server to send notifications to patients post-appointment.

#### 2.1.2 Composition
The software system is divided into several modules that interact with each other:

- `Patient Management`: This module is responsible for managing patient check-ins, consent forms, and queue status. It interacts with the User Interface and Database Management modules.
- `Employee Management`: This module is responsible for managing employee logins. It interacts with the User Interface and Database Management modules.
- `Email Notification`: This module is responsible for sending notifications. It interacts with the Patient Management to gather the necessary information.
- `User Interface`: This module is responsible for displaying information to the users and gathering input. It interacts with all other modules.
- `Database Management`: This module is responsible for storing and retrieving data. It interacts with the Patient Management module.

#### 2.1.3 Logical

The software system is composed of several classes that interact with each other:

- `Patient`: This class represents a patient. It has attributes such as name, age, and medical history.
- `Employee` & : This class represents an employee (doctor or secretary). It has attributes such as a login. 
- `HomePage`, `CheckInPage`, `ConsentFormPage`: These views represent the different pages in the GUI. They interact with the `Patient` and `Employee` classes to gather information and update the database.
- `Database`: This class represents the database. It interacts with the `Patient` and `Employee` classes to store and retrieve information.

<!-- The relationships between these classes are visualized in the UML class diagram below: -->

#### 2.1.4 Dependency

The software system has several dependencies between its classes and views:

- `HomePage`, `CheckInPage`, `ConsentFormPage`: These views depend on the `Patient` and `Employee` classes to gather information and update the database.
- `Patient`, `Employee`: These classes depend on the `Database` class to store and retrieve information.

#### 2.1.5 Information

#### 2.1.6 Patterns

The software system uses several design patterns:

- `Model-View-Controller (MVC)`: The `Patient` and `Employee` classes are the "Model", the `HomePage`, `CheckInPage`, and `ConsentFormPage` are the "View", and the logic that controls the flow of data between the model and the view is the "Controller".
- `Singleton`: The `Database` class is designed to have only one instance throughout the application.
- `Factory`: There is a class that is responsible for creating `Patient` or `Employee` objects.
- `Observer`: The `Patient` and `Employee` classes are notified when the database is updated.

These patterns help to structure the code in a way that promotes good practices such as separation of concerns, encapsulation, and modularity.

#### 2.1.7 Interface
There are three GUIs, each for the patient, employee class, and home page. The home page is simple with basic decorations and a form box to continue to the patient check-in page with the brand's colors. The patient check in will have fields to gather information with another submit button to take users to the consent form page where they will read through the urgent care's consent policy. Then, there will be a check-box to confirm the user's consent, which will then submit the patient object to the database. The doctor and secretary classes will share a staff view list of the patients currently waiting in the queue. Their list will feature a "complete" button that can clear patients out of the line.
#### 2.1.8 Structure
We utilize pino to open the port for the software to run. From there, different pages have other paths and query strings based on which user is on the software.
#### 2.1.9 Interaction

The components of the software system interact with each other in the following ways:

- When a patient checks in, the `CheckInPage` gathers the patient's information, creates a `Patient` object, and submits it to the `Database`.
- When an employee logs in, the `Employee` class checks the employee's login against the `Database` controlled by Prisma.
- When a patient is cleared from the queue, the `Doctor` or `Secretary` class updates the `Database` and the patient is removed from the queue.

#### 2.1.10 State dynamics

The components of the software system can be in several states:

- `Patient`: A patient can be in the "Not Checked In", "Checked In", or "Cleared" states. The transitions between these states are triggered by the patient checking in and the doctor or secretary clearing the patient from the queue.
- `Employee`: An employee can be in the "Logged Out" or "Logged In" states. The transition between these states is triggered by the employee logging in or out.

#### 2.1.11 Algorithm

#### 2.1.12 Resources
Software Resources: Visual Studio Code, GitHub, Trello, Github Copilot, and Dia
Hardware Resources: Four laptops
API: Email api for email service

#### 2.1.13 Physical
<!-- TODO -->
#### 2.1.14 Deployment

The software system is deployed and configured in the following way:

- `Installation Process`: Download and install the software from the GitHub repository, set up the MySQL database using the provided script, and configure the system using the provided configuration file.
- `Configuration Settings`: The database connection settings and email server settings need to be configured in the configuration file.

#### 2.1.15 Concurrency

The software system handles multiple operations happening at the same time in the following ways:

- `Database Access`: To ensure data consistency when multiple users access and modify the database at the same time, the system uses transactions. This means that each operation on the database is atomic, so even if multiple operations are performed at the same time, the database remains in a consistent state.
- `User Interface`: To keep the user interface responsive, long-running operations such as database queries are performed in the background using threads. This means that the user interface can continue to respond to user input while these operations are being performed.

#### 2.1.16 Behavioral

The software system behaves in the following ways:

- `Responses to Inputs`: When a patient checks in, the system creates a new `Patient` object and adds it to the database. When an employee logs in, the system checks the employee's login against the database.
- `Sequences of Operations`: When a patient is cleared from the queue, the system updates the `Patient` object in the database, removes the patient from the queue, and sends an email to the patient.
- `Overall Functionality`: The system manages the check-in and clearance of patients in a clinic. It also manages the login of employees.