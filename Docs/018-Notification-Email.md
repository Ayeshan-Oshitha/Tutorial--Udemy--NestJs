# Inytoduction to Notification Email

We use **MailTrap** during development for email testing, but once development is complete, we can switch to a live email service like **SendGrid**, **Amazon SES**, or **Azure Email**.

Additionally, we use the **NestJS Mailer** module, which internally relies on Nodemailer for handling email delivery.

**Required Packages**

`npm i @nestjs-modules/mailer@2.0.2 nodemailer@6.9.13 ejs@3.1.10`

Note - The `@Global()` decorator in a module makes it publicly available, meaning its providers can be used in other modules without importing it explicitly.
