# **Test Documentation**

## **1. Test Plan**

### **1.1 Introduction**
- **Project Name**: Gallium31 Attendance Log
- **Description**: This document outlines the testing strategy and individual test cases for Gallium31 Attendance Log, which is an attendance logger web app that logs the attendance of the interns of Gallium31 through an honesty system while allowing their heads and admins to see so that they can calculate how much salary the interns are going to recieve.

### **1.2 Scope**
- **Critical Functional**: 
  - Login Functionality
  - Registration Functionality
  - Admin Dashboard
  - Edit Profile
  - Intern Attendance Logs Visualization
- **Key UI/UX Components**
    - Submission of Time-In and Time-Out
    - Protected/Restricted Routes

### **1.3 Test Types**
- Unit Tests
- Integration Tests
- End-to-End Tests

### **1.4 Test Environment**
- **Operating System**: macOS Sonoma
- **Browsers**: 
  - Chrome [127.0.6533.99]
- **Dependencies**: 
  - Node.js [v20.11.1]

### **1.5 Test Execution**
- **Test Runs**: 
  - Unit tests executed manually.
  - End-to-end tests executed manually.

---

## **2. Test Cases**

### **Test Case ID:** `TC01_Login_Success`

- **Title**: Login with valid credentials
- **Description**: Verifies that a user can log in using valid credentials and is redirected to the appropriate dashboard.
- **Preconditions**: User account with username `admin` and password `1234` exists.
- **Test Steps**:
  1. Navigate to the login page.
  2. Enter `admin` in the username field.
  3. Enter `1234` in the password field.
  4. Click the "Login" button.
- **Expected Result**: The user is redirected to the appropriate dashboard.
- **Actual Result**: The user was successfully redirected to their dashboard dashboard.
- **Status**: Passed

---

### **Test Case ID:** `TC02_Login_Failure`

- **Title**: Login with invalid credentials
- **Description**: Verifies that login fails when invalid credentials are entered.
- **Preconditions**: No specific preconditions.
- **Test Steps**:
  1. Navigate to the login page.
  2. Enter `wronguser` in the username field.
  3. Enter `wrongpassword` in the password field.
  4. Click the "Login" button.
- **Expected Result**: An error message is displayed, and the user remains on the login page.
- **Actual Result**: The error message "Invalid credentials" was displayed.
- **Status**: Passed
- **Comments**: Test executed successfully on Chrome v104, Windows 10.

---

### **Test Case ID:** `TC03_Registration_Sucess`

- **Title**: Register a user
- **Description**: Create a new account for an intern.
- **Preconditions**: Admin is logged in.
- **Test Steps**:
  1. Enter `T001` in the Intern ID field.
  2. Enter `test-user` in the Username field.
  3. Enter `test@email.com` in the Email field.
  4. Enter `test` in the First Name field.
  5. Enter `user` in the Last Name field.
  6. Enter `test123` in the Password field.
  7. Enter `0` in the Time Rendered field.
  8. Enter `300` in the Time Required field.
  9. Click the "Register" button.
- **Expected Result**: An new account is automatically registered as an intern into the database with all the information provided.
- **Actual Result**: An new account is automatically registered as an intern into the database with all the information provided.
- **Status**: Passed

---

### **Test Case ID:** `TC04_Admin_Dashboard_Render_Success`

- **Title**: Render Admin Dashboard With Existing Interns
- **Description**: Correctly render the employee list and information each row.
- **Preconditions**: Admin is logged in.
- **Test Steps**:
  1. Admin logs in or refreshes the website.
- **Expected Result**: All registered interns are listed in each row of the employee list including their first name, last name, hours rendered, hours needed to render, user id, and if hovered, a menu button.
- **Actual Result**: All registered interns are listed in each row of the employee list including their first name, last name, hours rendered, hours needed to render, user id, and if hovered, a menu button.
- **Status**: Passed

---

### **Test Case ID:** `TC05_Admin_Dashboard_Empty_Render`

- **Title**: Render Admin Dashboard With Existing Interns
- **Description**: Correctly render the employee list and information each row.
- **Preconditions**: Admin is logged in.
- **Test Steps**:
  1. Admin logs in or refreshes the website.
- **Expected Result**: All registered interns are listed in each row of the employee list including their first name, last name, hours rendered, hours needed to render, user id, and if hovered, a menu button.
- **Actual Result**: All registered interns are listed in each row of the employee list including their first name, last name, hours rendered, hours needed to render, user id, and if hovered, a menu button.
- **Status**: Passed

---

### **Test Case ID:** `TC06_Edit_Profile_Username_Success`

- **Title**: Edit Intern's Username
- **Description**: Admin edits the username of the selected intern.
- **Preconditions**: Admin is logged in and there are registered interns.
- **Test Steps**:
  1. Change `test-user` to `testuser` in the Username field.
  2. Click "Save" button.
- **Expected Result**: Selected intern's username is changed to `testuser`.
- **Actual Result**: Selected intern's username is changed to `testuser`.
- **Status**: Passed

---

### **Test Case ID:** `TC07_Edit_Profile_First_Name_Success`

- **Title**: Edit Intern's First Name
- **Description**: Admin edits the firstname of the selected intern.
- **Preconditions**: Admin is logged in and there are registered interns.
- **Test Steps**:
  1. Change `test` to `tester` in the Username field.
  2. Click "Save" button.
- **Expected Result**: Selected intern's username is changed to `testuser`.
- **Actual Result**: Selected intern's username is changed to `testuser`.
- **Status**: Passed

---

### **Test Case ID:** `TC08_Edit_Profile_Email_Success`

- **Title**: Edit Intern's Email
- **Description**: Admin edits the email of the selected intern.
- **Preconditions**: Admin is logged in and there are registered interns.
- **Test Steps**:
  1. Change `test@email.com` to `newemail@example.com` in the Email field.
  2. Click "Save" button.
- **Expected Result**: Selected intern's email is changed to `newemail@example.com`.
- **Actual Result**: Selected intern's email is changed to `newemail@example.com`.
- **Status**: Passed

---

### **Test Case ID:** `TC09_Edit_Profile_First_Name_Success`

- **Title**: Edit Intern's First Name
- **Description**: Admin edits the first name of the selected intern.
- **Preconditions**: Admin is logged in and there are registered interns.
- **Test Steps**:
  1. Change `test` to `tester` in the First Name field.
  2. Click "Save" button.
- **Expected Result**: Selected intern's first name is changed to `tester`.
- **Actual Result**: Selected intern's first name is changed to `tester`.
- **Status**: Passed

---

### **Test Case ID:** `TC10_Edit_Profile_Last_Name_Success`

- **Title**: Edit Intern's Last Name
- **Description**: Admin edits the last name of the selected intern.
- **Preconditions**: Admin is logged in and there are registered interns.
- **Test Steps**:
  1. Change `user` to `updateduser` in the Last Name field.
  2. Click "Save" button.
- **Expected Result**: Selected intern's last name is changed to `updateduser`.
- **Actual Result**: Selected intern's last name is changed to `updateduser`.
- **Status**: Passed

---

### **Test Case ID:** `TC11_Edit_Profile_Password_Success`

- **Title**: Edit Intern's Password
- **Description**: Admin edits the password of the selected intern.
- **Preconditions**: Admin is logged in and there are registered interns.
- **Test Steps**:
  1. Enter `newpassword123` in the Password field.
  2. Click "Save" button.
- **Expected Result**: Selected intern's password is updated to `newpassword123`.
- **Actual Result**: Selected intern's password is updated to `newpassword123`.
- **Status**: Passed

---

### **Test Case ID:** `TC12_Edit_Profile_Username_Cancel`

- **Title**: Cancel Edit Intern's Username
- **Description**: Admin attempts to edit the username of the selected intern but cancels the action.
- **Preconditions**: Admin is logged in, and there are registered interns.
- **Test Steps**:
  1. Change `test-user` to `testuser` in the Username field.
  2. Click outside the modal or click the "Cancel" button.
- **Expected Result**: The modal closes, and the selected intern's username remains as `test-user`.
- **Actual Result**: The modal closes, and the selected intern's username remains as `test-user`.
- **Status**: Passed

---

### **Test Case ID:** `TC13_Edit_Profile_First_Name_Cancel`

- **Title**: Cancel Edit Intern's First Name
- **Description**: Admin attempts to edit the first name of the selected intern but cancels the action.
- **Preconditions**: Admin is logged in, and there are registered interns.
- **Test Steps**:
  1. Change `test` to `tester` in the First Name field.
  2. Click outside the modal or click the "Cancel" button.
- **Expected Result**: The modal closes, and the selected intern's first name remains as `test`.
- **Actual Result**: The modal closes, and the selected intern's first name remains as `test`.
- **Status**: Passed

---

### **Test Case ID:** `TC14_Edit_Profile_Email_Cancel`

- **Title**: Cancel Edit Intern's Email
- **Description**: Admin attempts to edit the email of the selected intern but cancels the action.
- **Preconditions**: Admin is logged in, and there are registered interns.
- **Test Steps**:
  1. Change `test@email.com` to `newemail@example.com` in the Email field.
  2. Click outside the modal or click the "Cancel" button.
- **Expected Result**: The modal closes, and the selected intern's email remains as `test@email.com`.
- **Actual Result**: The modal closes, and the selected intern's email remains as `test@email.com`.
- **Status**: Passed

---

### **Test Case ID:** `TC15_Edit_Profile_Last_Name_Cancel`

- **Title**: Cancel Edit Intern's Last Name
- **Description**: Admin attempts to edit the last name of the selected intern but cancels the action.
- **Preconditions**: Admin is logged in, and there are registered interns.
- **Test Steps**:
  1. Change `user` to `updateduser` in the Last Name field.
  2. Click outside the modal or click the "Cancel" button.
- **Expected Result**: The modal closes, and the selected intern's last name remains as `user`.
- **Actual Result**: The modal closes, and the selected intern's last name remains as `user`.
- **Status**: Passed

---

### **Test Case ID:** `TC16_Edit_Profile_Password_Cancel`

- **Title**: Cancel Edit Intern's Password
- **Description**: Admin attempts to edit the password of the selected intern but cancels the action.
- **Preconditions**: Admin is logged in, and there are registered interns.
- **Test Steps**:
  1. Enter `newpassword123` in the Password field.
  2. Click outside the modal or click the "Cancel" button.
- **Expected Result**: The modal closes, and the selected intern's password remains as `test123`.
- **Actual Result**: The modal closes, and the selected intern's password remains as `test123`.
- **Status**: Passed

---

### **Test Case ID:** `TC17_Succesful_Render_Intern_Attendance_Logs`

- **Title**: View The Intern's Own Attendance Logs
- **Description**: Intern views their attendance logs for the month.
- **Preconditions**: Intern is logged in and have existing logs in the database for the month.
- **Test Steps**:
  1. Click the "Attendance Logs" button.
- **Expected Result**: User is redirected to their `/logs` and is rendered a table of their time-in/out times with the date and total hours rendered each day.
- **Actual Result**: User is redirected to their `/logs` and is rendered a table of their time-in/out times with the date and total hours rendered each day.
- **Status**: Passed

---

### **Test Case ID:** `TC18_Succesful_Error_Message_Intern_Attendance_Logs`

- **Title**: Render Error For Non-Existent Data
- **Description**: Intern views their attendance logs while not having logged any data for the month.
- **Preconditions**: Intern is logged in and have no existing logs for the month in the database.
- **Test Steps**:
  1. Click the "Attendance Logs" button.
- **Expected Result**: User is redirected to their `/logs` and a message continaing "No attendance logs found." is rendered.
- **Actual Result**: User is redirected to their `/logs` and a message continaing "No attendance logs found." is rendered.
- **Status**: Passed

---

### **Test Case ID:** `TC19_Submit_Correct_Time_In_And_Out_Success`

- **Title**: Submit Correct Time-In And Time-Out
- **Description**: Intern logs their time-in and time-out times for the day.
- **Preconditions**: Intern is logged in and in their dashboard.
- **Test Steps**:
  1. Enter `08:00` in the "Time IN (AM)" field.
  2. Enter `12:00` in the "Time Out (AM)" field.
  3. Enter `13:00` in the "Time IN (PM)" field.
  4. Enter `17:00` in the "Time Out (PM)" field.
  5. Click the "Submit" button.
- **Expected Result**: User recieves a message through a snackbar saying "Total time rendered updated successfully!", "Time data submitted successfully!" and their data is logged in the database.
- **Actual Result**: User recieves a message through a snackbar saying "Total time rendered updated successfully!", "Time data submitted successfully!" and their data is logged in the database.
- **Status**: Passed

---

### **Test Case ID:** `TC20_Submit_Invalid_Time_In_And_Out_Failure`

- **Title**: Submit Invalid Time-In And Time-Out
- **Description**: Intern logs their time-in and time-out times for the day.
- **Preconditions**: Intern is logged in and in their dashboard.
- **Test Steps**:
  1. Click the "Submit" button.
- **Expected Result**: User recieves a message through a snackbar raising the error since no valid time data was submitted.
- **Actual Result**: User recieves a message through a snackbar saying "Total time rendered updated successfully!", "Time data submitted successfully!" and their data is logged in the database.
- **Status**: Failed

---

### **Test Case ID:** `TC21_Submit_Incorrect_Time_In_And_Out_Failure`

- **Title**: Submit Incorrect Time-In And Time-Out
- **Description**: Intern inputs incorrect times such as an earlier time-out time compared to their time-in time.
- **Preconditions**: Intern is logged in and in their dashboard.
- **Test Steps**:
  1. Enter `09:00` in the "Time IN (AM)" field.
  2. Enter `07:00` in the "Time Out (AM)" field.
  3. Enter `13:00` in the "Time IN (PM)" field.
  4. Enter `17:00` in the "Time Out (PM)" field.
  5. Click the "Submit" button.
- **Expected Result**: User recieves a message through a snackbar raising the error due to incorrect time data was submitted.
- **Actual Result**: User recieves a message through a snackbar saying "Total time rendered updated successfully!", "Time data submitted successfully!" and their data is logged in the database.
- **Status**: Failed

---

### **Test Case ID:** `TC22_Intern_Acessing_Admin_Dashboard_Success`

- **Title**: Intern Tries Accessing Admin Dashboard
- **Description**: Intern tries to access the admin dashboard
- **Preconditions**: Intern is logged in.
- **Test Steps**:
  1. User changes the url from `/dashboard` to `/admin`.
- **Expected Result**: User stays in their dashboard.
- **Actual Result**: User stays in his dashboard.
- **Status**: Passed

---

### **Test Case ID:** `TC23_Admin_Acessing_Logs_Failure`

- **Title**: Admin Injects `/logs` In The Url
- **Description**: Admin injects `/logs` in the url.
- **Preconditions**: Admin is logged in.
- **Test Steps**:
  1. User changes the url from `/admin` to `/logs`.
- **Expected Result**: User stays in their dashboard.
- **Actual Result**: User is rendered an empty monthly logs table.
- **Status**: Failed

---

### **Test Case ID:** `TC24_Acessing_Restricted_Routes_Failure`

- **Title**: User Accesses Intern Dashboard Without Logging In
- **Description**: A user tries to access the intern dashboard through url injection.
- **Preconditions**: User is logged out.
- **Test Steps**:
  1. User injects the url with `/dashboard`.
- **Expected Result**: User stays in the login page.
- **Actual Result**: User is rendered an empty intern dashboard.
- **Status**: Failed

---

### **Test Case ID:** `TC25_Acessing_Restricted_Routes_Failure`

- **Title**: User Accesses Admin Dashboard Without Logging In
- **Description**: A user tries to access the admin dashboard through url injection.
- **Preconditions**: User is logged out.
- **Test Steps**:
  1. User injects the url with `/admin`.
- **Expected Result**: User stays in the login page.
- **Actual Result**: User is rendered an empty admin dashboard with a list of employees.
- **Status**: Failed

---

### **Test Case ID:** `TC26_Acessing_Restricted_Routes_Failure`

- **Title**: User Accesses Admin Dashboard Without Logging In
- **Description**: A user tries to access an attendance logs table through url injection.
- **Preconditions**: User is logged out.
- **Test Steps**:
  1. User injects the url with `/logs`.
- **Expected Result**: User stays in the login page.
- **Actual Result**: User is rendered an empty monthly logs table with a snackbar error saying "API error: Unexpected token 'A', "A token is"... is not valid JSON".
- **Status**: Failed

---

### **Test Case ID:** `TC27_Acessing_Restricted_Routes_Failure`

- **Title**: User Accesses Admin Dashboard Without Logging In
- **Description**: A user tries to access an attendance logs table through url injection.
- **Preconditions**: User is logged out.
- **Test Steps**:
  1. User changes the url from `/admin` to `/dashboard`.
- **Expected Result**: User stays in their dashboard.
- **Actual Result**: User is rendered an empty intern dashboard.
- **Status**: Failed

---


## **4. Conclusion**
- **Test Summary**: Out of 27 test cases, 20 passed, and 7 failed.
- **Issues Found**:
  1. Intern can submit an empty field in their logs.
  2. Intern can submit incorrect time values in their logs.
  3. Admin can access an intern dashboard named after themselves.
  4. Admin can access a logs table for themseleves.
  5. A user not logged in can access an empty intern dashboard and logs table.
- **Recommendations**:
  1. Replace Time-In/Out feature with a button.
  2. Fix and protect the routes a user can access and not access.

---