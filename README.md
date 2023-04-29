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
