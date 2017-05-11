# GPA Calculator
This is a fun project implementing RESTful routing in express.js. Users have the
option to authenticate, and save information to a database for future viewing, 
or use as a one time access tool, without saving any information.

## Welcome Page
![Welcome](./git_images/Landing_Page.png?raw=true)
User has the option to click calculate (which prompts them to login), or continue
as a guest. Guest option disappears when authenticated.

## Authenticated User Page
![Auth User Show](./git_images/Poe_classes.png?raw=true)
Here the user, Poe, sees his classes, and can add them to the database. 

## Adding Class to Database
![User Add](./git_images/Poe_Add_class.png?raw=true)
After this is completed, there will be a redirect with the updated GPA.

## Guest Route
![Guest Welcome](./git_images/Guest_welcome.png?raw=true)
Functionality of guest page is exactly the same, less the ability to save courses.

## Guest Calculation
![Guest Show](./git_images/Guest_View.png?raw=true)
![Guest Add](./git_images/Guest_Add.png?raw=true)

## TODO
- Add Update and Destroy routes.
- I would really like to use a PDF parser / any file parser to extract data from files, and combine multiple transcripts for a single calculation.
