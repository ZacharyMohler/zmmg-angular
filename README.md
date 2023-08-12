# Database management web app built in Angular with RESTful API back end
(note: the API source code is found in another repository here => https://github.com/ZacharyMohler/zmmg-api)
<b>If you desire to get this application working on your own machine, it is currently configured to work on a heroku cloud environment and will need to be re-configured to work locally.</b>

All code not generated with angular CLI written by Zachary Mohler. 
### Reference material used: 
Getting MEAN with Mongo, Express, Angular, and Node, Second Edition by Simon Holmes, Clive Harber

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.0.6.

## Project purpose:
Be able to access and manage my collection databases remotely in a web application.

## Technologies this project uses:

Angular CLI: 6.2.9
Node: 16.20.1
Express: 4.16.1
MongoDB shell: 5.0.17

JavaScript, TypeScript, HTML, CSS, Json Web Token, Twitter Bootstrap, SHA-2

# Landing page

The landing page is a simple "about me" page since this is a portfolio item.
It talks a bit about the application, and about me. 


# Collections pages

### top-level collections page

![image](https://github.com/ZacharyMohler/zmmg-last-try/assets/95890882/52fea523-ac5b-476b-96b4-01650d4f7890)

The collections page is the main functionality page. Each list item represents a collection within the MongoDB database.
It should be noted that the "formats" buttons to filter the collections by format are a hard-coded list and are not actually pulled from DB sources.
All that is to say, if a new format is introduced into a collection, a manual insertion of that format's button into the front-end code is necessary. 

One issue I had with this page was with the "total entries" indicator for each collection. I was using Mongo's count() method. But once the collections
were populated with more than a few documents, it was too slow and ended up with "NULL total entries" for each collection. I switched over to estimatedDocumentCount()
as a precise count is not necessary for this implementation, and that solved the problem. 

Navigation from this page to the collection lists themselves can be done by either clicking the collection header, or by selecting one of the format filter buttons. 

### collection specific pages

![image](https://github.com/ZacharyMohler/zmmg-last-try/assets/95890882/93684ebd-f433-4689-8bbc-af49758b25f5)

A collection list page (for non-admin users) lists the collection items based on the filter selected by the user. 
Collections are always listed in alphabetical order. Users can also search the collection using the search bar in the collection header.

The search is very dumb, it searches the title field only, and will return any match found within the title. I.e. searching "mad" will return "Mad Max" but it will also return
"Amadeus".

In addition, you can press the back arrow next to the collection label to return to the previous page.

### collection specific pages for authenticated admin users

![image](https://github.com/ZacharyMohler/zmmg-last-try/assets/95890882/32762bca-e63d-4bf8-9ce1-2ea5f301e521)

The eagle eyed among you will now notice the "Add New" button, as well as that all entries' title field has been converted to a link.
Clicking the "Add New" button will navigate to this page:

![image](https://github.com/ZacharyMohler/zmmg-last-try/assets/95890882/ba2f06b1-2a0e-4dd3-88eb-4088d3ead25b)

Where new entries can be easily added, via the front-end form communicating the new document's fields to the API. 
(note: each collection has different required fields due to the MongoDB model, but the form submission handles that, returning an error if the form field is left blank)

Navigating back to the main collection specific page (in this case movies), and clicking an entry in the title field (which are now links) will take you to this page:

![image](https://github.com/ZacharyMohler/zmmg-last-try/assets/95890882/b4d98770-e956-4fe3-b4b8-5925ac9a37b0)

Looks familiar, right? The form is now populated with the information for that specific entry. With options to update the entry, or to delete it altogether. 
Clicking delete will prompt a warning and require a second click of the delete button to confirm the delete. 

# More technical explanation of app's inner workings

Due to the simplicity of the pages each page is made up of two Angular components. A header + footer component, and the main page component. Each collection has its own component due to the difference in fields between the collections, as well as to keep them separate as much as possible (they're separate MongoDB collections, so they might as well be different components). Each separate collection also has a component called "<collection name>-edit.component. This component is the form page for updating, creating, and deleting specific entries in the collection. 

### API communication
API communication is handled with data.service Angular components. They handle connection to the API server and the return of data as Promises. They also do boring stuff like catching errors.

I decided to keep the data services separate per collection + one for authentication. I could've had one master data service, but that would’ve been a lot of code in one file, and keeping on par with the modularization of the rest of the project--I decided to keep them separate as well. 

# Authentication and session management

Register and Login methods both exist for easy re-use, but register is currently disabled to prevent new account creation. To re-implement registration, just un-comment those sections in the API code, and the routing here on the front end. 

Account information is stored in the same MongoDB database under the collection 'users'. For obvious security reasons, the password for users is not stored in the database as plain text, but is first encrypted using salt hashing and the SHA algorithm (sha512). This way the plain password text is never stored anywhere. 

To login, the given password is encrypted using the same method for registration, and compared to the existing password, returning only a boolean. This way the password method of encryption is never revealed either. 

On successful registration and logins, the API returns a Json Web Token, set to expire 7 days after creation. The Token is stored in the user's browser storage. 











