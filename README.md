# WanderLust

WanderLust is a full stack travel listing web application where users can create, view, edit, and delete listings, and also add or remove reviews for each listing. This project was built to practice backend development, RESTful routing, database relationships, server-side validation, and error handling.

## Features

* Create, read, update, and delete travel listings
* Add and delete reviews for listings
* Server-side validation using Joi
* MongoDB database integration using Mongoose
* Review-to-listing relationship using Mongoose refs and `populate()`
* Async error handling with custom middleware (`wrapAsync`)
* Custom error page rendering with Express error middleware
* Method override support for PUT and DELETE routes from HTML forms

## Tech Stack

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* Joi

### Frontend / Templating

* EJS
* HTML/CSS
* Bootstrap

## Key Concepts I Practiced

* **Nested routes** (reviews under listings)
* **Mongoose relationships** using ObjectId references
* **`populate()`** to load review details on listing pages
* **Server-side validation** to prevent invalid form submissions
* **Error handling middleware** in Express
* **Cascade delete logic** for removing related reviews when a listing is deleted

## Validation and Error Handling

This project uses **Joi** for server-side validation of listing and review data. Even if the frontend form uses HTML validation (`required`), server-side validation is still necessary because users can bypass browser validation.

Async route errors are handled using a reusable helper:

* `wrapAsync(fn)` catches rejected promises and forwards errors to Express error middleware

A global error handler renders a custom error page and prevents the app from crashing on unexpected issues.


## Future Improvements (Ideas)

* User authentication and authorization
* Only logged-in users can create/edit/delete listings and reviews
* Image upload support (Cloudinary / Multer)
* Flash messages for success/error feedback
* Search and filter listings
* Map integration for locations
* Deployment (Render / Railway / Vercel + MongoDB Atlas)

## Author

**Bhushan Sah**
Berea College
Computer Science and Mathematics
