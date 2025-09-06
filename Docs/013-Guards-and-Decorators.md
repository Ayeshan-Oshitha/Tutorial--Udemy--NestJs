# Introduction to Guards

The purpose of a guard is to approve or disapprove a request.

<img src="./images/images-12/image-1.png" width="700">

Guards can be used with a controller class as well as a controller method. They can also be applied globally to a module or the entire application.

<img src="./images/images-12/image-2.png" width="700">

---

<img src="./images/images-12/image-3.png" width="700">

# Creating AccessToken Guard

Every guard should implement the `canActivate` method.

# Testing the AccessTokenGuard

Unlike services, when we use a guard, pipe, or interceptor in another module (apart from the module where it was created), the other module must have all its dependencies available to resolve them.

| Feature                                              | Consuming Module Needs Dependencies? | Why                                                                                                   |
| ---------------------------------------------------- | ------------------------------------ | ----------------------------------------------------------------------------------------------------- |
| **Service injected into another service**            | No                                   | NestJS uses the instance provided by the module that created it, dependencies resolved internally.    |
| **Guard/Pipe/Interceptor applied in another module** | Yes                                  | NestJS instantiates it in the consuming module’s context, so it needs all dependencies visible there. |

- **Services**: consuming module sees only the service. Dependencies handled internally.

- **Guards/Pipes/Interceptors**: consuming module must see **all dependencies**, because NestJS creates the instance in that module.
