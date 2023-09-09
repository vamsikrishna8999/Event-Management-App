
# Title- EventManagement

Implementing a todo userinterface where one can manage their tasks for better productivity


## 🛠 Technologies Used
Javascript, HTML, CSS,ReactJS,NodeJS,MongoDB...


## Features

-Admin can do the following set of operations
- Add a new event 
- Edit existing Events
- Delete an event 

-User can do the following set of operations
- View Current Events 
- Register For an Event
- Access Userdashboard 

# Instructions to RUN
## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Steps to be followed & Available Scripts
Open the project folder in vscode.\
In the project directory,open new terminal and split into two.\
1. In second terminal start the server
### `nodemon server.js`
-You will get thhe following in console
- web server listening in 3500
- db connection success

2. In first terminal run the build with below command

### `npm run build`

Runs the app in the development mode.\
Open [http://localhost:3500](http://localhost:3500) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## MongoDB & Queries
-Database name
- b1db
-Collections
- userscollection
- eventscollection
- admincollection
-Admin
- admin is created directly into db 
- username:admin

1. access cmd
### `mongosh`

2. creating/using DB
### `use b1db`

3. creating collection
### `db.createCollection(Collection_name)`



# User Interface
[http://localhost:3000](http://localhost:3000) page will be loaded which has the following components.\
## Home
- Consists a form where we input our task and submit it by clicking on '+'
## Signin
-For Admin I used the following credentials after inserting it into DB manually
- username:admin
- password:admin123
- type:Admin
## Signup
-Register new user
## CreateEvent
-Admin access only
- Login as Admin to access this 
- Create new event
## Events
-User
- View Events
- Register for Events
-Admin access
- Edit Event
- Delete Event
## Userprofile
-Dashboard
## Signout
-Logout from application

![Alt text](<Screenshots/Screenshot 2023-09-09 212418.png>)

Screenshots/Screenshot 2023-09-09 212418.png

![](Screenshots/Screenshot%202023-09-09%20212418.png)
