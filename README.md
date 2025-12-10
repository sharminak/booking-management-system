# Booking Management System

This is a full-stack room booking application built using a Node.js/Express backend and a React (Vite) frontend.  
The system supports user authentication, room management (admin), booking creation, and booking conflict detection.

This README includes only the sections required for the assignment:
- How to run the backend  
- How to run the frontend  
- Authentication flow  
- Booking conflict logic
- Notes about implementation choices (JavaScript instead of TypeScript, 
  in-memory backend, etc.) 

---

## Important Notes About This Project

This project was completed as part of a coding test with a focus on UI quality,
component structure, and user experience as emphasized in the assignment.

It uses JavaScript instead of TypeScript ,I am still gaining experience with 
TypeScript , but the overall structure, components, and logic were written to 
allow an easy migration to TypeScript if required.

To meet the submission deadline, the backend uses an in-memory data store 
instead of MongoDB. The architecture remains compatible with expanding into a 
full MERN stack.

Key choices for this implementation:
- React (JavaScript)
- Express.js backend with in-memory storage
- Clean and modern UI using Tailwind CSS
- Simplified authentication flow
- Functional booking conflict validation system

Although the original requirements suggested a full MERN + TypeScript setup,
this submission prioritizes clarity, functionality, and UI/UX quality within 
the given timeframe. I can extend or refactor the codebase to TypeScript or 
MongoDB if preferred for future development.

## 1. How to Run the Backend

### Step 1: Open the backend folder

```
cd booking-backend
```

### Step 2: Install dependencies

```
npm install
```

### Step 3: Start the backend server

```
npm run start
```

#### The backend will start on:

```
http://localhost:4000
```

#### The backend uses in-memory storage found in: booking-backend/data/db.js

## 2. How to Run the Frontend

### Step 1: Open the frontend folder

```
cd booking-frontend
```

### Step 2: Install required packages

```
npm install
```

### Step 3: Run the development server

```
npm run dev
```

#### The frontend will be available at:

```
http://localhost:5173
```

---

## 3. Authentication Flow

The project uses JSON Web Tokens (JWT) for authentication.

### Registration
- User provides email and password.
- Password is hashed using `bcryptjs`.
- User is stored in memory.

### Login
- Backend validates user credentials.
- If valid, backend creates a JWT token using:
  jwt.sign({ id, role }, SECRET)

- Frontend stores this token in `localStorage`.

### Token Usage
All protected routes require the token in the request header:
Authorization: Bearer <token>

### Middleware
**auth.js**
- Verifies the token
- Attaches decoded user data to `req.user`

**adminOnly.js**
- Allows access only if: req.user.role === "admin"

## 4. Booking Conflict Logic

The backend prevents overlapping bookings for the same room.

A new booking conflicts with an existing one if:

```
newStart < existingEnd
AND
newEnd > existingStart
```

This detects any time overlap.

### Examples

| Existing Booking | New Booking | Conflict |
|------------------|-------------|----------|
| 10:00–12:00      | 11:00–13:00 | Yes      |
| 10:00–12:00      | 12:00–14:00 | No       |
| 10:00–12:00      | 09:00–11:00 | Yes      |
| 10:00–12:00      | 08:00–10:00 | No       |

If a conflict is found, backend response:

``` json
{
  "conflict": true,
  "message": "Room is already booked."
}
```

If no conflict is found, the booking is stored in memory.

## Folder Structure

```
booking-management-system/
 ┣ booking-backend/
 ┃ ┣ controllers/
 ┃ ┣ data/
 ┃ ┣ middlewares/
 ┃ ┣ routes/
 ┃ ┗ server.js
 ┗ booking-frontend/
   ┣ src/
   ┃ ┣ components/
   ┃ ┣ context/
   ┃ ┣ features/
   ┃ ┣ api/
   ┃ ┣ App.jsx
   ┃ ┗ main.jsx
```
## Notes

The backend uses in-memory storage and resets on server restart.

This project demonstrates authentication, routing, availability checking, and conflict detection logic.



