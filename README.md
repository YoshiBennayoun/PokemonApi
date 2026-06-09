Backend Express - Pokedex API
Global Vision
This project serves as the backend for a Pokédex-type web application. It is a RESTful API built with Node.js and Express, designed to manage a Pokémon collection through a MySQL database. The API offers full CRUD (Create, Read, Update, Delete) functionality as well as a secure authentication system based on JWT tokens.

Description
The Pokedex API provides a robust interface for:

Pokémon Management: Creating, reading, updating, and deleting Pokémon

User Authentication: Secure login system using JWT tokens

Filtering and Search: Pokémon search by name with pagination

Data Validation: Strict controls on incoming data

Relational Database: Data persistence via MySQL and Sequelize ORM

Core Features
🔐 JWT Authentication: Secure tokens valid for 24 hours

📊 Full CRUD: Comprehensive Pokémon management

🔍 Advanced Search: Filtering by name with pagination

✅ Robust Validation: Built-in data constraints

🗄️ MySQL Database: Relational persistence with Sequelize

🚀 RESTful API: Standard and intuitive architecture

Technical Stack
Runtime: Node.js

Framework: Express.js

Database: MySQL

ORM: Sequelize

Authentication: JWT (jsonwebtoken)

Hashing: bcrypt

Environment Management: dotenv

Logger: morgan

Package Manager: pnpm

Installation
Bash
# Clone the repository
git clone <repository-url>

# Install dependencies
pnpm install 

# or your package manager of choice

# Configure environment variables
cp .env.example .env
# Edit .env with your MySQL credentials
Getting Started
Bash
# Development mode with hot-reload
pnpm dev

# Production mode
node server.js
The server starts on the configured port (default: 3000).

API Documentation
Complete API documentation is available in docs/API.md.

Main Endpoints
POST /api/login - User login

GET /api/pokemons - Pokémon list (with filters)

GET /api/pokemons/:id - Pokémon details

POST /api/pokemons - Create a Pokémon

PUT /api/pokemons/:id - Update a Pokémon

DELETE /api/pokemons/:id - Delete a Pokémon

Project Structure
Backend/
├── src/
│   ├── auth/           # Authentication (JWT, middleware)
│   ├── db/             # Database configuration
│   ├── models/         # Sequelize models (Pokemon, User)
│   └── routes/         # API routes
├── docs/               # Documentation
├── public/             # Static files
├── .env                # Environment variables
├── .http               # HTTP test files
└── server.js           # Entry point
Author
Orssi Mp

License
ISC