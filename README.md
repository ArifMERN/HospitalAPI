# Hospital API

# Concepts covered:

There are multiply concepts are covered in this web app, some of the concepts listed below.

1. Routing
2. JWT authorization
3. Authentication
4. settingUp mongoose

# How to use .
To start with just start with 
 # npm init
 # npm start

## routes and using them
# Doctor routes
1. Register:
   /doctor/register
   To register have to provide the details like name, email and password
2. Login:
   /doctor/login
   Provide the email and password to login then will get the token which is valid for one hour
## Protected routes
 Note: All the below routes are protected without token will not be accessible, have to add the authorization in the header as below,
 Authorization: barer JWT
  eg: ![image](https://user-images.githubusercontent.com/112053505/208403329-d422cd01-583d-4416-a126-34fd94d8b1b7.png)
 # Patient routes
  1. register:
     /patient/register
     To register a patient have to provide name and phone number of patient
  2. create_report:
     /patient/:ID/create_report
     For this in the props have to send the patient id and add the details in the form details like status report 
     Note: status is enum [Negitive, Positive, Mild-symptoms] should anyone of this for now.
  3. all_reports:
     /patient/:ID/all_reports
     With this we can able to get all the reports of the specific patient
# Reports:
 1. status report:
    /report/:status
    In the props we have to provide the status like as above create_report enums then we can get all the patients with the available status will be served.
 
 
 ## HAPPY TO ACCEPT ANY UPDATES AND CHANGES IF REQUIRED :).
    
  



