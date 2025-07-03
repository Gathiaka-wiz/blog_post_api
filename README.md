# Blogger Post API

A secure, modern RESTful API for blogging, built with **Node.js**, **Express**, **MongoDB**, and **Arcjet** for advanced security.  
This API supports user authentication, blog CRUD, comments, likes, admin controls, and robust input validation and rate limiting.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup & Installation](#setup--installation)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [API Overview](#api-overview)
  - [Authentication](#authentication)
  - [Blogs](#blogs)
  - [Comments](#comments)
  - [Likes](#likes)
  - [Admin](#admin)
- [Security](#security)
- [Validation](#validation)
- [Logging & Error Handling](#logging--error-handling)
- [Arcjet Integration](#arcjet-integration)
- [Development Notes](#development-notes)
- [License](#license)

---

## Features

- **User Authentication** (JWT, cookies)
- **Role-based Access** (user/admin)
- **Blog CRUD** (create, read, update, delete)
- **Comments** (add, update, delete, fetch)
- **Likes** (like/unlike blogs)
- **Input Validation & Sanitization** (express-validator)
- **Rate Limiting & Bot Protection** (Arcjet)
- **Comprehensive Error Handling** (always JSON)
- **Logging** (colored, method-based)
- **MongoDB/Mongoose** for data persistence

---

## Tech Stack

- Node.js (ES Modules)
- Express 5.x
- MongoDB & Mongoose
- JWT (jsonwebtoken)
- bcryptjs (password hashing)
- express-validator (validation & XSS protection)
- Arcjet (security, rate limiting, bot detection)
- colors (console log coloring)
- dotenv (environment variables)

---

## Project Structure

```
blog_post_api/
│
├── config/
│   ├── db.config.js         # MongoDB connection logic
│   └── env.config.js        # Loads environment variables
│
├── controllers/             # Route handler logic
│   ├── auth.controller.js
│   ├── blog.controller.js
│   ├── AdminBlog.controller.js
│   └── comment.controller.js
│
├── middleware/
│   ├── arcjet.middleware.js # Arcjet security integration
│   ├── error.middleware.js  # Central error handler (JSON only)
│   ├── logger.middleware.js # Logging (requests, 404s)
│   ├── validation.middleware.js # express-validator rules
│   ├── verifyAdmin.middleware.js
│   ├── verifyToken.middleware.js
│   └── verifyUser.middleware.js
│
├── models/
│   ├── BlogPost.model.js
│   ├── Comment.model.js
│   └── User.model.js
│
├── routes/
│   ├── AdminBlog.routes.js
│   ├── auth.routes.js
│   ├── blog.routes.js
│   ├── comment.routes.js
│   └── like.routes.js
│
├── utils/
│   └── generateTokenAndSetCookie.js
│
├── .env                     # Environment variables (not committed)
├── index.js                 # Main entry point
├── package.json
└── README.md
```

---

## Setup & Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Gathiaka-wiz/blog_post_api.git
   cd blog_post_api
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up your `.env` file:**  
   Create a `.env` file in the root directory with the following (replace values as needed):

   ```
   PORT=3000
   MONGO_URI=your_mongodb_connection_string
   NODE_ENV=development
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRES_IN=7d
   ARCJET_ENV=development
   ARCJET_API_KEY=your_arcjet_api_key
   ```

   - Get your MongoDB URI from [MongoDB Atlas](https://cloud.mongodb.com/).
   - Get your Arcjet API key from [Arcjet](https://app.arcjet.com/).

4. **Start the server:**
   ```bash
   npm start
   ```

   The server will run on `http://localhost:3000` by default.

---

## Environment Variables

| Variable         | Description                                 |
|------------------|---------------------------------------------|
| PORT             | Server port                                 |
| MONGO_URI        | MongoDB connection string                   |
| NODE_ENV         | Environment (development/production)        |
| JWT_SECRET       | Secret for JWT signing                      |
| JWT_EXPIRES_IN   | JWT token expiry (e.g., 7d)                 |
| ARCJET_ENV       | Arcjet environment                          |
| ARCJET_API_KEY   | Arcjet API key                              |

---

## Scripts

- `npm start` — Starts the server.
- `npm run build` — Installs dependencies.

---

## API Overview

All endpoints are prefixed with `/api/v1/`.

### Authentication

| Method | Endpoint           | Description                |
|--------|--------------------|----------------------------|
| POST   | `/auth/signup`     | Register a new user        |
| POST   | `/auth/login`      | Login and get JWT cookie   |
| POST   | `/auth/logout`     | Logout (clear cookie)      |
| DELETE | `/auth/delete-account` | Delete user account (auth required) |

### Blogs

| Method | Endpoint           | Description                |
|--------|--------------------|----------------------------|
| GET    | `/blogs`           | Get all blogs              |
| GET    | `/blogs/:id`       | Get a blog by ID           |

### Comments

| Method | Endpoint                       | Description                |
|--------|--------------------------------|----------------------------|
| POST   | `/blog/comment/:id/create`     | Add comment to blog        |
| GET    | `/blog/comment/:id`            | Get all comments for blog  |
| PATCH  | `/blog/comment/update/:commentId` | Update a comment (auth) |
| DELETE | `/blog/comment/delete/:commentId` | Delete a comment (auth) |

### Likes

| Method | Endpoint                  | Description                |
|--------|---------------------------|----------------------------|
| POST   | `/blog/:id/like`          | Like/unlike a blog (auth)  |

### Admin

| Method | Endpoint                        | Description                |
|--------|---------------------------------|----------------------------|
| POST   | `/admin/blogs/create-blog`      | Create blog (admin only)   |
| PATCH  | `/admin/blogs/edit-blog/:id`    | Edit blog (admin only)     |
| DELETE | `/admin/blogs/delete-blog/:id`  | Delete blog (admin only)   |
| GET    | `/admin/users`                  | List all users (admin)     |

---

## Security

- **Arcjet** middleware protects all routes from bots, abuse, and common attacks.
- **Rate limiting** is enforced globally.
- **Bot detection** blocks most bots (including Postman by default; see Arcjet config to allow for local testing).
- **JWT** authentication with secure, HTTP-only cookies.
- **Role-based access** for admin endpoints.

---

## Validation

- All input is validated and sanitized using **express-validator**.
- XSS protection is enabled via `.escape()` and `.normalizeEmail()` on user input.
- Invalid or malicious input is rejected with a JSON error.

---

## Logging & Error Handling

- **Request logging**: All requests are logged with colored output by HTTP method.
- **404 logging**: All unknown routes are logged and return a JSON 404.
- **Error handling**: All errors are caught and returned as JSON (never HTML).

---

## Arcjet Integration

- **arcjet.middleware.js** applies Arcjet security to all routes.
- **Bot detection**: Blocks bots except those allowed in the config.
- **Rate limiting**: Configurable via token bucket.
- **Shield**: Protects against common attacks (SQLi, etc).
- **Development tip**: To allow Postman for local testing, add `"POSTMAN"` to the `allow` array in the Arcjet `detectBot` rule. **Remove before production!**

---

## Development Notes

- **ES Modules**: All code uses ES module syntax (`import/export`).
- **MongoDB Models**: See `/models` for schema definitions.
- **Validation**: See `/middleware/validation.middleware.js` for all validation rules.
- **Admin**: Only one admin account is allowed by default.
- **Testing**: Use Postman or similar tools (if allowed in Arcjet config).

---

## License

[ISC](LICENSE)

---

## Contributing

Pull requests are welcome! Please open an issue first to discuss changes.

---

## Contact

- [GitHub Issues](https://github.com/Gathiaka-wiz/blog_post_api/issues)

---

**Enjoy building with Blogger Post API!**