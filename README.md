## For more organized, my assignment is wrapped inside Assignment folder


#  MongoDB CRUD Operation, Database Insertion and Advance Queries


## 🧪 Expected Outcome

- A functioning MongoDB database with properly structured data.
- A set of MongoDB queries that demonstrate your understanding of CRUD operations.
- Advanced queries showing filtering, projection, and sorting capabilities.
- Aggregation pipelines that transform and analyze the data.
- Properly implemented indexes with performance analysis.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- **CRUD Operations**: Create, Read, Update, and Delete operations on a book database.
- **Advanced Queries**: Demonstrates filtering, sorting, and projecting data from the database.
- **Aggregation Pipelines**: Advanced data manipulation and analysis.
- **Indexes**: Implementation of indexes to enhance query performance.

## Technologies Used

- **Node.js**: JavaScript runtime used for the server environment.
- **Mongoose**: ODM for MongoDB to manage data models.
- **MongoDB**: NoSQL database for data storage.
- **dotenv**: For managing environment variables.

## Project Structure

my-repo/
├── .env # Environment variables (MongoDB URI)
├── package.json # Project metadata and Mongoose dependencies
├── package-lock.json # Project metadata and mongoDB dependencies
├── insert_books.js # MongoDB connection, schema and model defination
├── queries.js # script for data insertion and crud operation
└── README.md # Project documentation

## **Clone the repository**:
   ```bash or powershell```
   git clone https://github.com/PLP-MERN-Stack-Development/mongodb-data-layer-fundamentals-and-advanced-techniques-HARDECOMM.git
   
   cd <repository directory>

## Install dependencies
   npm install
   
## Environment Variables

This project requires the following environment variables to run:

- **MONGODB_URI**: Connection string for your MongoDB database.

### Setting Up Environment Variables
copy your ATLAS SERVER SECRETE KEY OR COMMUNITY SERVER IP IN
add it directly to the `.env` file in the root of your project. Create a new file named
`.env` file
 Set-Up example:
 MONGODB_URI=mongodb://<username>:<password>@host:port/database
 SECRET_KEY=your_secret_key_here.

 ## Run the project
 node queries.js 

 Note: the project will create your database and perform CRUD operation directly on your terminal, which you can see on  your database. 


 Thank you. 




   
   
