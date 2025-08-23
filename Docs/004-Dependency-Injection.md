# Introduction to Inversion Of Control

<img src="./images/images-03/image-1.png" width="800">

Here User Class is the Dependency

<img src="./images/images-03/image-2.png" width="800">

### TypeScript Example - Without Dependency Injection

In this code, whenever we create a new `Post` or `Page` class, we instantiate the User class inside them.
This means we are relying on creating a new instance of `User` (concrete implementation) whenever it is needed, and we are not using dependency injection.

<img src="./images/images-03/image-3.png" width="400">

### TypeScript Example - Without Dependency Injection

In this example, we depend on the `User` **interface** rather than directly creating a new instance of the `User` class.

Whenever we create a `Post`, it requires a `User`, but the `Post` class itself **does** not create a new `User` instance. Instead, an already created `User` instance is **passed down** to the Post class.

This way:

- The `Post` class can keep using the `User` it was given.
- The `Post` class does **not** need to know how to create a `User`.
- The responsibility of creating the `User` object is handled **somewhere else** (outside the `Post` class).

This approach is called **Inversion of Control (IoC)** because the responsibility of creating dependencies is inverted and given to an external provider.

<img src="./images/images-03/image-4.png" width="400">

In **NestJS**, this responsibility is handled automatically by the framework.

NestJS instantiates the `User` class once and **injects it** into the `Post` and `Page` classes whenever they need it.

This way, `User` is created only once, and the same instance is reused as a dependency.

# Dependency Injection in Nest JS

<img src="./images/images-03/image-5.png" width="800">

NestJs gors goes ahead and created a dependency graph, wherer it knows which class is needed to be instantiated first, and a dependency for the other classes.

At teh time iod bootstraping Nest jc crats the instantoates all these 3 classes in teh correct order. All thgese c;lasees are mainted as singelton sopmewhere in teh nest architecture( There is always a single isntance of a class. SO nEST js instantianets use class once and supplu taht class whenee it os nheeeded.)

### Advantages of Dependency Injection

<img src="./images/images-03/image-6.png" width="800">

- No Coupling between User Class and Post Class
- Post Class can be testing by injecting a Mock User Class(No Need to instantiate the user class again)

### Modules encapsulate everything

<img src="./images/images-03/image-7.png" width="800">

<img src="./images/images-03/image-8.png" width="800">

**Provide** - Sharing a service or any other custom class within it's components is known as providing(ex - sharing the _user serive_ with _controller_. This decision is taken by the _User Module_ )

**Export** - Sharing a parts of one module with other modules (ex - sharing the _user service_ with the _Post Module_. Explicitly have to export `user service` inside `User Module`)

### 3 Steps for Injection

<img src="./images/images-03/image-9.png" width="800">
