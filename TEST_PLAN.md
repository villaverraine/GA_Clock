Here's a template for test documentation that you can use for your web app:

---

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
    - Edit Employee Modal
    - Protected/Restricted Routes

### **1.3 Test Types**
- Unit Tests
- Integration Tests
- End-to-End Tests

### **1.4 Tools Used**
- **Testing Frameworks**: 
  - Jest
  - Selenium
- **Other Tools**:
  - React Testing Library
  - ChromeDriver

### **1.5 Test Environment**
- **Operating System**: macOS Sonoma
- **Browsers**: 
  - Chrome [127.0.6533.99]
- **Dependencies**: 
  - Node.js [v20.11.1]

### **1.6 Test Execution**
- **Test Runs**: 
  - Unit tests executed locally using Jest.
  - End-to-end tests executed using Selenium with ChromeDriver.

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

### **Test Case ID:** `TC06_Edit_Profile_First_Name_Success`

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

### **Test Case ID:** `TC07_Edit_Profile_Email_Success`

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

### **Test Case ID:** `TC08_Edit_Profile_First_Name_Success`

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

### **Test Case ID:** `TC09_Edit_Profile_Last_Name_Success`

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

### **Test Case ID:** `TC10_Edit_Profile_Password_Success`

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


## **3. Code Documentation**

### **3.1 Unit Tests**
#### **File: `Login.test.js`**
```jsx
// Test case for Login component
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Login from './Login';

test('submits the username and password', () => {
  const mockSubmit = jest.fn();
  const { getByPlaceholderText, getByText } = render(<Login onSubmit={mockSubmit} />);

  fireEvent.change(getByPlaceholderText('Username'), { target: { value: 'testuser' } });
  fireEvent.change(getByPlaceholderText('Password'), { target: { value: 'password123' } });
  fireEvent.click(getByText('Login'));

  expect(mockSubmit).toHaveBeenCalledWith({ username: 'testuser', password: 'password123' });
});
```
**Comments**: This test checks that the `Login` component correctly submits the username and password when the login button is clicked.

### **3.2 End-to-End Tests**
#### **File: `test_login.py`**
```python
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time

# Set up the WebDriver (Chrome in this case)
driver = webdriver.Chrome()

# Test case for logging in with valid credentials
driver.get("http://localhost:3000/login")  # Update with your app's URL

username_input = driver.find_element(By.NAME, "username")
password_input = driver.find_element(By.NAME, "password")

username_input.send_keys("testuser")
password_input.send_keys("password123")
password_input.send_keys(Keys.RETURN)

time.sleep(2)

logout_button = driver.find_element(By.ID, "logout")  # Adjust the selector as needed

assert logout_button.is_displayed(), "Login failed!"

driver.quit()
```
**Comments**: This Selenium test automates the login process and verifies that the user is logged in by checking the presence of a logout button.

---

## **4. Conclusion**
- **Test Summary**: Out of [Total Number] test cases, [Number Passed] passed, and [Number Failed] failed.
- **Issues Found**: [List any bugs or issues discovered during testing].
- **Recommendations**: [Any recommendations for further testing or areas for improvement].

---

This template provides a comprehensive structure for documenting your tests. Make sure to fill in the placeholders with details specific to your project.

