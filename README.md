
# DOPPLER

This is a step-by-step instruction to use the software. In order to execute successfully this software you will need installed:
* npm
* java 17
* Editor for backend (I recommend Intellij Community)
* Editor for frontend (I recommend Visual Studio Code)
* Database workbench (I used MySQL's)

## 1. Set up the Database in MySQL 🗄
1.1. Set the MySQL username, password and port. By default the username is "root", the password is empty and the port is 3306.

1.2. Create the database by executing this command in a query tab:
```sql
create database DOPPLER;
```
> Make sure the database is created by right-clicking and then click Refresh All.

## 2. Set up the backend ⌨
2.1. Download the backend project from **[here](https://github.com/samsattas/DOPPLER-Backend/ "DOPPLER Backend")**.

2.2. Open the project IntelliJ or any editor you want and go to ```src/main/resources/ ```.

2.3. Open the file ```application.properties``` and change the port, username and password for the values you put in the database.
> (you can skip this step if you left it by default).
```
pring.datasource.url=jdbc:mysql://localhost:newPort/doppler
spring.datasource.username=newUsername
spring.datasource.password=newPassword
```

2.4. Go to the file ```src/main/java/com/example/dopplerback/DopplerbackApplication.java```, right click and click ```Run```
> This may take a moment, after that you can check the database and it shold have created the tables partners, projects and project_partners.

## 3. Set up the frontend 🖥
3.1. Download or clone this repository to your computer.

3.2 Open the project in your favorite editor.

3.3. Open the console and execute the command ```npm install``` to install all dependencies.

3.4. Then execute the command ```npm run dev``` to start the application.

3.5. The console will show a message like:
```
    VITE v5.0.3  ready in 986 ms

  ➜  Local:   http://127.0.0.1:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help

```
Then copy the link and paste it in the web browser.

## 4. Use the application

### 4.1. Home 🏠

Here you will see the main page with the number of projects and partners created, you can navigate through the menu or the options shown.

### 4.2. Projects 💡

In the projects section you can create a project with a title, an environment, a status, details and partners if there are any registered. After that you can see the projects in the table and also edit or delete them. 

Also you can filter the projects by searching the title in the search bar. 

And finally you can export the table by pressing the button next to create project, it will export a csv, a file type that can be used in other softwares or just viewed in excel.

### 4.3 partners 🤝

In the partners page you can create a partner with a name, a phone number, a description and a type which indicates if the partner is a person or a company. After that you can see the partners in the table and also edit or delete them. For deletion, the partner must not be linked to any project.

Also you can filter the partners by searching the name in the search bar.


## Contact ✉
Questions? Something you like? contact me:
```
{
    email: "samuelsatizabaltascon@gmail.com",
    linkedin: "https://www.linkedin.com/in/samuel-satizabal-397062239/",
}
```




