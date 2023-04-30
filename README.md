# React-Node Challenge<br><sup>_CRUD Application to manage purchases and products_</sup>

Welcome to the challenge project repository! Here you will find the implementation of a comprehensive system that manages purchases and products. The project consists of the development of both front-end and back-end using React.js Node.js components respectively, as well as integration with a MySQL database.

The system includes two fundamental features: a CRUD for products and a CRUD for purchases. Both functionalities are built on top of REST endpoints, which provide a robust and flexible API for managing and retrieving data.

We hope you find this project informative and useful, and we look forward to any feedback or contributions you may have.

## Requirements

- Node.js (version 14 or higher)
- MySQL server running on port 33061
- MySQL schema called ChallengeDB with store_products and shopping_history tables
- npm or yarn package manager installed on your system

## Prerequisites

Make sure you have the following installed on your machine:

- Node.js
- MySQL server running on port 33061

## Installation

1. Clone the repository:

```bash
git clone https://github.com/Benjovengo/CRUDapplication.git
```

2. Install the server dependencies by navigating to the './server' folder in your terminal and running:

```bash
npm install
```

3. Install the client dependencies by navigating to the './client' folder in your terminal and running:

```bash
npm install
```

## Usage

1. Start MySQL server.

Before running the app, you need to set up the MySQL database. The database is called 'ChallengeDB' and it has two tables: `store_products` and `shopping_history`. Use the following commands to create the tables:

```sql
CREATE TABLE `ChallengeDB`.`shopping_history` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(200) NOT NULL,
  `descricao` VARCHAR(200) NULL,
  `preco` DECIMAL(10,2) NOT NULL,
  `data_criacao` DATE NULL,
  `data_atualizacao` DATE NULL,
  PRIMARY KEY (`id`));
```

```sql
CREATE TABLE `ChallengeDB`.`shopping_history` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `total` DECIMAL(10,2) NOT NULL,
  `data_criacao` DATE NULL,
  `tipo_pagamento` VARCHAR(200) NULL,
  `status` VARCHAR(250) NULL,
  PRIMARY KEY (`id`));
```

2. Start the Express server by navigating to the 'server' folder in your terminal and running:

```bash
npm start
```

3. Start the React app by navigating to the 'client' folder in another terminal window and running:

```bash
npm start
```

4. Open a web browser and go to 'http://localhost:3000' to access the React app.

## Notes

The server will run on `http://localhost:3001`, while the client will run on `http://localhost:3000`.

Please make sure that the MySQL server is running on `port 33061`, and that the schema 'ChallengeDB' has been created with the 'store_products' and 'shopping_history' tables. If you encounter any issues, make sure to check your MySQL server configuration and verify that the schema and tables exist.

## Node Modules Explanation

### Front-end - React App

Apart from the modules required by a React.js app, I decided to use others in order to be able to communicate the front-end to the back-end and to make it easier (ok, it was a little overkill to use them) to style the front-end pages.


#### Axios

- Axios was used in the React app to make HTTP requests to the REST API that communicates with the database. This module simplifies the process of making HTTP requests and allows us to handle responses easily.


#### Reactstrap and Bootstrap

- Reactstrap is a library built on top of Bootstrap, providing additional React components that are easier to use and customize.
- These modules were chosen for their ease of use, extensive documentation, and popularity within the React community, which makes it easier to find solutions to common problems and improve the maintainability of the code.


### Back-end

#### Body-Parser

- The body-parser middleware is used to parse incoming request bodies in a middleware before your handlers, available under the `req.body` property. The main reason for using this module is to extract data from the request body, which is often used to communicate data between the client-side and server-side applications.

#### CORS

- The CORS middleware is used to enable Cross-Origin Resource Sharing (CORS) for the Express application. It is used to handle requests from different domains and prevent Cross-Site Scripting (XSS) attacks. The main reason for using this module is to allow requests from a different domain and ensure the security of the application.

#### Express

- Express is a popular web application framework for Node.js, widely used for building RESTful APIs. The main reason for using this module is to provide a simple and flexible framework for building robust and scalable web applications.

#### MySQL

- The mysql module is used to interact with the MySQL database from Node.js. This module is to provides a simple and convenient way to connect to the database, execute queries, and handle responses in the server-side application.

#### Nodemon

- The nodemon module is a tool that helps develop Node.js based applications by automatically restarting the Node.js application when file changes in the directory are detected. The main reason for using this module is to automate the development process and increase productivity by avoiding the need to manually restart the server after making changes to the code.