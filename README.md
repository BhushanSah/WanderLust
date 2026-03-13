# WanderLust 🌍🧭

WanderLust is a full-stack travel listing web app where users can create, browse, filter, and search travel listings, upload photos, and leave reviews. I built this project to practice RESTful routing, authentication, database relationships, server-side validation, file uploads, and map/geocoding features.

## Features

### Listings
- Full CRUD for travel listings (create, view, edit, delete) 
- Upload listing images using Multer + Cloudinary storage 
- Each listing stores:
  - `owner` (User reference)
  - `category` (enum)
  - `geometry` (GeoJSON Point for mapping) 

### Reviews
- Add and delete reviews on listings 
- Reviews store an `author` (User reference) and are populated when viewing a listing
- Cascade delete: when a listing is deleted, its reviews are deleted too 

### Categories + Search
- Category pages like `/listings/category/Arctic` (and others) 
- Search route `/listings/search?q=...` that filters listings by title/location/country/category 

### Authentication + Authorization
- Signup/login/logout using Passport (local strategy) 
- Flash messages for success/error feedback 
- Route protection (must be logged in to create listings/reviews) 
- Ownership checks:
  - Only the listing owner can edit/delete the listing 
  - Only the review author can delete their review 

### Maps
- Uses Mapbox Geocoding to create a GeoJSON `geometry` point from the listing location when creating a listing 
- Mapbox token is passed to EJS views via `res.locals` 

---

## Tech Stack

**Backend**
- Node.js, Express 
- MongoDB + Mongoose  
- Passport + express-session (auth + sessions)   
- Joi (server-side validation) 

**Frontend**
- EJS templating + ejs-mate layouts   
- Bootstrap + custom CSS 

**Uploads / Maps**
- Multer + Cloudinary storage  
- Mapbox SDK (Geocoding) 

---

## Project Structure

- `app.js` – Express setup, sessions, Passport, flash, routers, error handling 
- `models/` – Mongoose models (Listing, Review, User) 
- `routes/` – Listing, Review, and User routes  
- `controllers/` – Route handlers (listings, reviews, users) 
- `middleware.js` – auth guards + validation + ownership checks
- `schema.js` – Joi validation schemas 
- `cloudConfig.js` – Cloudinary + Multer storage config   
- `views/` – EJS pages & partials

---

## Environment Variables

Create a `.env` file in the project root and add:

```env
MAP_TOKEN=your_mapbox_token
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret

## Author

**Bhushan Sah**
Berea College
Computer Science and Mathematics
