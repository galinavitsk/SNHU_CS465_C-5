# SNHU CS465 Full Stack Development 1

## Architecture

The public end of the Travlr application is a static website served by Express, using Handlebars templating language. While the backend for the admins is a SPA running on Angular. Angular was used for the backend as we can have more dynamic and responsive pages there that would need to be changed more often than the front end static website.
The backend also used NoSQL MongoDB database for it's ease of use. The data needed to be stored somewhere and while we could've used a normal SQL database but NoSQL allows for greater scalability and ease for development for a project like this.

## Functionality

**How is JSON different from Javascript and how does JSON tie together the frontend and backend development pieces?**

JSON is a file structure while Javascript is a programming language that allows logic execution. JSON can be used to easily pass objects as text from the backend to the front end.

**Provide instances in the full stack process when you refactored code to improve functionality and efficiencies, and name the benefits that come from reusable user interface (UI) components.**

The travel page on the front end for the static application was compeltely refactored into handlebars template that allows for dynamic loading of trips from the database instead of having to manually code in every single one. This makes it so the admins don't need any help from the programming team when they just want to add a new trip to the database, saving time, effort, and money, for these updates.

## Testing

All the API testing of endpoints has been done first through Postman which allows one to save endpoints and requery them multiple times throughout the development, and then also manually through the website to verify that the data that comes back from the said endpoints gets parsed correctly by the client code.
Addition of security checks on the admin side made Postman testing more involved but at the same time helped secure the database from malicious actors.

## Reflection

I have developed SPA in the past, mainly with React, however I have never gone through the whole process of integrating a database and security into my applications. So these two parts of the process were actually incredibly valuably to me as they helped me understand more about how SPA would handle data and this is something I will take with me for my actual career.
