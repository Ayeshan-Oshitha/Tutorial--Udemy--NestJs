# Introduction to Environments

In NestJS, **.env** files store environment variables, and the **Config Module** loads them into your app. This makes accessing configuration values easy, secure, and consistent.

(We use the process object to read these variables at runtime.)

<img src="./images/images-07/image-1.png" width="700">

---

<img src="./images/images-07/image-2.png" width="700">

# Installing Config Module

`npm i @nestjs/config`

If we don’t set `isGlobal: true` in the Config Module, we have to import the Config Module in every module where we need it. But if we enable `isGlobal: true`, we don’t need to do that since it makes the Config Module available everywhere automatically.
