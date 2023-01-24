>**Animal Playground**
>
>## Description of the project:
>
>Animal Playground is the number 1 place to buy pet toys online. Whether you are looking for an original chew toy for your dog, a classic wheel for your hamster friend, or a teaser flamboyant enough to suit your beloved but picky cat, animalplayground.com has it all!
>
>## A few examples of articles you will find on animalplayground.com:
>
>- Dog toys: The PikaChew
>- Cat toys: The CleopatRat Teaser
>- Snake toys: The Choker
>
>
>_See documentation at https://documenter.getpostman.com/view/23956523/2s8Yemttz7 ._
>
>## HOW TO USE THE API
>
>Install all dependencies by running **npm install** in the project's folder.
>
>### On first use: 
>
>1. Create a **.env file** in the base folder of the project following the .env.example. Fill it with your system's parameters.
>2. Start your database service.
>3. The API relies on a database called **animalplayground**. Run **npm run dbcreate** to create the animalplayground database and test the database connection.
>4. Run **npm run migrate** to launch table migrations OR **npm run init** to launch table migrations AND seed the tables with example data (npm run init can be run at any time: it'll drop the existing tables, create them and seed them per script's action).
>5. Run **npm run build** to create the build folder with all the necessary compiled files.
>
>### Starting the API:
>
>Run **npm run start** to start the server file and launch the API.  
>If you have a php apache-like server running, open _projectfolder_/src/front/index.php to access the database manager. It will allow you to perform the project's CRUD operations easily.
>
>### Login system:
>
>The API relies on an email/password login system where **all passwords are hashed and salted** using the bcrypt nodejs library (blowfish algorithm) before being stored in the database. The frontpage uses AJAX to perform the login operations.
>
>The system defines two possible user roles :
>- **users** can only perform get requests.
>- **admins** can perform all CRUD operations. Get requests on the Users table will also display hashed password and users' role.
>
>### CRUD Testing:
>
>Use Postman or the database php page to perform all the CRUD operations.
>- For GET requests on index front page : leave the ID fields of the 'show' menu blank if you wish to GET ALL rows.  

>Et voilà !
>
>## Thank you for reading.