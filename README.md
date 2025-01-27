# postman

1. Postman Takehome Customer API
2. Description
   Ths Application has a Google Cloud OAuth, can display all customers, search for a specific customer by ID, Edit Customers, Delete customers and is built on React, Nodejs, and Postgresql. Some challenges I faced was setting up the dev environment (recently got a new laptop, which didn't have any coding software, code editor, version control system, package managers, and any project-specific dependencies). The setup took some time, and getting used to the new interfaces, syntaxes of current technologies. Future implementations could include displaying the customers in numerical order, if a new customer is added the ID of that customer is auto generated to use the lowest available ID. The project is also hosted on AWS but still trying to figure out how to set the baseUrl for production for it to properly connect to a database. I hope to configure this by the time it is due. I found AWS difficult to configure, I have the project on an EC2 instance, with the domain on Route53, but its currently not communicating with the backend. 

 3. How to Install and Run the Project

    Open up a terminal, and make a directory on your computer for the project
      'mkdir postman-take-home'

    Clone the repository on github
      'git clone https://github.com/paulvalderama25/postman.git'

    Navigate to the project root folder
      'cd postman'

    Install project dependencies
      'npm install'

    Start the server
      'nodemon app.jsk'

    Open new terminal tab, navigate to 'frontend' folder in project
      'cd frontend'

    Start react project
      'npm start'

    You may have to reload the page twice at is not a secured site, until you see the Google login option.

    Google Auth will ask you to login, login with these credentials
      email: postmantest25@gmail.com
      pw: postTest25

    4. How to Use the Project
       - Once you login with google, the database will load all of the customers and display them.
       - You can search for a specific customer by ID, and it will only display that customer.
       - You can then delete that customer or edit.
       - Editing a customer will load an edit form where you can edit the customer details
       - Submitting edit will send a put request to the backend, update the database, reload the customer list           with the new information
       - If you're currently searching for a specific customer but don't wish to edit or delete, you can click           the 'Display All Customers' button          to display all the customers
       - You can enter a new customer, submitting the new customer sends a post request to the backend, reloads          the customer list with the new              data included. 
