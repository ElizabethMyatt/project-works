# Software Requirements Specification
## For HealthNet

Prepared by Cornelius Kinkade and Morgan Campbell
UWF  
03/24/2024  

Table of Contents
=================
* 1 [Introduction](#1-introduction)
  * 1.1 [Document Purpose](#11-document-purpose)
  * 1.2 [Product Scope](#12-product-scope)
* 2 [Product Overview](#2-product-overview)
  * 2.1 [Product Perspective](#21-product-perspective)
  * 2.2 [Product Functions](#22-product-functions)
  * 2.3 [Product Constraints](#23-product-constraints)
  * 2.4 [User Characteristics](#24-user-characteristics)
  * 2.5 [Assumptions and Dependencies](#25-assumptions-and-dependencies)
* 3 [Requirements](#3-requirements)
  * 3.1 [External Interfaces](#31-external-interfaces)
    * 3.1.1 [User Interfaces](#311-user-interfaces)
    * 3.1.2 [Hardware Interfaces](#312-hardware-interfaces)
    * 3.1.3 [Software Interfaces](#313-software-interfaces)
  * 3.2 [Functional](#32-functional)
  * 3.3 [Quality of Service](#33-quality-of-service)
    * 3.3.1 [Performance](#331-performance)
    * 3.3.2 [Security](#332-security)
    * 3.3.3 [Reliability](#333-reliability)
    * 3.3.4 [Availability](#334-availability)
  * 3.4 [Design and Implementation](#35-design-and-implementation)
    * 3.4.1 [Installation](#351-installation)
    * 3.4.2 [Distribution](#352-distribution)
    * 3.4.3 [Maintainability](#353-maintainability)

## 1. Introduction
### 1.1 Document Purpose
This Software Requirement Specification will provide a general overview of the HealthNet program. This document is meant to be presented to our professor, Dr. Fridge. This document will help provide more information about what is expected from our program, HealthNet.

### 1.2 Product Scope
The product to be release will be known as HealthNet. HealthNet will be a server sided program intended to replace the papers commonly used to provide the personal information patients' provide to the clinic. While dependent on technology, such as a tablet, HealthNet will reduce the paperwork the secretaries would need to file had the patients' information been provided through paper. Additionally, a database will accurately store the patients' information with little to no input from the secretary. Finally, HealthNet will centralize the software a clinic may use, so that the patient's personal and medical information may be stored and accessed from one database.

## 2. Product Overview
### 2.1 Product Perspective
This product, HealthNet, is designed to replaced the arduous effort needed to file paperwork after a patient has submitted the required paperwork. With this application, there will no longer be a need for secretaries to correctly file a patient's information. Additionally, the retreival of the patient's data will be much simpler and faster than a paper-based method. As an added benefit, the application will keep track of the patient's wait in line for their visit.

### 2.2 Product Functions
+ Store patient information
+ Retrieve patient information
+ Update medical history
+ Send patient an email of their visit
+ Display a waitlist in patient lobby

### 2.3 Product Constraints
This application is meant to be capable of running on limited computers and tablets. It is implied that these devices will be connected to the Internet; therefore, HealthNet will not function without an Internet connection. Additionally, there will be no access to the database without an Internet connection. Furthermore, this application is expected to follow HIPAA standards, which will burden the developers with how patient information is stored.

### 2.4 User Characteristics
There will be three different user classes: the patients, the secretaries, and the doctors. The patients will only have access to the welcome and submission forms. The secretaries will be responsible for giving the patients access to the devices to submit their information, which will be handed back after the patients have completed their "paperwork." Secretaries will be responsible for entering in the patient's preferred pharmacy or search for the patient's personal information using his/her phonenumber as a key if they have previously visited. Moreover, the secretaries will be responsible with adjusting the lobby's wailist should the need arise. Secretaries will not have access to any medical history, perscriptions, or any medical information obtained during the visit. The doctors will have access to the patients medical data, but specific information about the patient will remain hidden from the doctors: address, phone number, email, Social Security Number, marital status, and preferred pharmacy.

With the current state of this program, the patients will have the least privilege in HealthNet - only write permissions in very limited conditions. The doctors and the secretaries will have elevated privileges to compared to the patients: limited read & write permissions (secretaries should not be able to modify medical history nor should the doctors be able to change the preferred pharmacy of the patient). 

### 2.5 Assumptions and Dependencies
We will assume that SQLite will be adequate and compatible with HealthNet. If SQLite is not suitable for Healthnet, then we will use an alternative if the need arises. Additionally, if the lobby does not have a monitor to broadcast a the patient wait list, then that requirement will not be able to be featured at that location; however, that requirement will not affect the rest of HealthNet. If the patient does not provide an email address, as it is not required to be shared by the patient, then that requirement will also not be featured.

## 3. Requirements

### 3.1 External Interfaces

#### 3.1.1 User interfaces

+ An error message for missing text fields
+ An error message for implied consent not being given
+ A button to advance between pages in the patient's UI (whether it be a "submit" button or equivalent)

#### 3.1.2 Hardware interfaces

This software is web-based and does not have any hardware interfaces beyond those found in typical web servers.

#### 3.1.3 Software interfaces

+ SQLite (must include version an implementation) to store and retrieve patient data
  + The SQL language will be used for data storage and retrieval
+ Node.js v20.11.1
  + Used to run the HealthNet program
+ Email api (Not determined yet) (version)
  + Insert purpose here

### 3.2 Functional
+ This software requires a functioning database than can be retrieved and edited by doctor's and secretaries. Patient-class objects created through the text fields on the web app will then be delivered into the database. The fields that will need to be filled to continue include first and last name, age, date of birth, gender, address, and phone number. 
+ This software needs to allow users to input their information. 
+ This software must be accessible to users so they can navigate the app effectively. 

### 3.3 Quality of Service
+ HealthNet should provide real-time updates on the queue that displays in the lobby. 
  + May be done through frequent refreshes or other methods
+ The format of the website must stay consistent across devices
+ Stick to a consistent color palet
+ Email api will be nicely formatted 

#### 3.3.1 Performance
N/A

#### 3.3.2 Security
There will be access controls regarding the patient's data. The patient's data will be accessed on a need-to-know basis. The need-to-know basis is based on the user classes. Therefore, patient's will have no knowledge of the other patients that will attend the clinic, with the exception of the first name, last initial displayed in the lobby queue.

The doctor and secretary view must be protected through authentication to prevent any violation of HIPAA laws. A login screen may be done to satisfy this requirement.

#### 3.3.3 Reliability
+ Retrieved items are the same as before they were stored
+ The database will accurately reflect any notes or updates a doctor may induce 
+ The lobby will be accurately reflected
+ The email sent after the appointment will be correctly formatted

#### 3.3.4 Availability
Should HealthNet fail, a quick restart will resolve the issue.

### 3.4 Design and Implementation

#### 3.4.1 Installation
N/A

#### 3.4.2 Distribution
N/A

#### 3.4.3 Maintainability
HealthNet should have these attributes:

+ Made with Test Driven Development
+ Modularization (The controller will contain all the different web addresses)
+ Follows the open-closed principle from the SOLID design principles
