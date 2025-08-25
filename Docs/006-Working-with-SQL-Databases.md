# Working with Databases in NestJS

In NestJS, only the service file is responsible for working with the database. However, there is one layer between the service and the database — the ORM (Object Relational Mapping).

<img src="./images/images-05/image-1.png" width="800">

---

<img src="./images/images-05/image-2.png" width="800">

The supported databases are not limited to the ones shown; NestJS supports many more.

# What is an ORM ?

<img src="./images/images-05/image-3.png" width="800">

---

<img src="./images/images-05/image-4.png" width="800">

---

<img src="./images/images-05/image-5.png" width="800">

---

<img src="./images/images-05/image-6.png" width="800">

---

<img src="./images/images-05/image-7.png" width="800">

---

<img src="./images/images-05/image-8.png" width="800">

### ORM - Disadvantages

- Less Control Over Low Level Code

- In Case of Complex Queries, Performance Optimization can be a problem ( But we can pass raw sql queries using ORM too )

# Connecting NestJS to PostgreSQL

`npm i typeorm` - Install TypeORM, the ORM (Object Relational Mapper) for Node.js/TypeScript

`npm i @nestjs/typeorm` - Install the NestJS integration for TypeORM, so you can use it in NestJS projects

`npm i pg` - Install the PostgreSQL driver for Node.js, required for TypeORM to connect to PostgreSQL

# Using Async Configuration

The advantage of having an asynchronous connection is that we can **directly inject the configuration object** into our database settings. This allows us to **read configuration from different environment files.**

# Theoretical Understanding of the Repository Pattern

<img src="./images/images-05/image-9.png" width="800">

once we crt re entity filr, we can inekct teh repostory, so we don not creat uses repository file, This cfrtion of trepository in taken care by typ orm, we jsut ionject repository to teh Service. so repository ism not a file, It is something injectable intol users setvice

<img src="./images/images-05/image-10.png" width="800">

---

<img src="./images/images-05/image-11.png" width="700">
