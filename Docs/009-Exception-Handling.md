# Introduction to Exception Handling

<img src="./images/images-08/image-1.png" width="800">

Within the filter boundary, NestJS takes care of handling exceptions automatically. (NestJS has a built-in **exception handling layer**. If an exception is thrown inside your application and isn’t caught, NestJS will automatically handle it using its **global exception filter**. By default, it turns unhandled exceptions into a proper HTTP response.)

<img src="./images/images-08/image-2.png" width="800">

---

<img src="./images/images-08/image-3.png" width="800">

NestJS comes with many prebuilt exception classes and methods.

# Identifying Points of Failure

### 1. Querying a Database

<img src="./images/images-08/image-4.png" width="700">

### 2. Model Constraints in a Database

<img src="./images/images-08/image-5.png" width="700">

### 3. External APIs

<img src="./images/images-08/image-6.png" width="700">

**Note**: Even in middleware, it is important to handle exceptions. We can throw exceptions in middleware. (Middleware do not come under NestJS’s automatic exception handling. If something breaks in middleware and we don’t handle it, NestJS will not automatically send a 500 Internal Server Error — we must handle it manually. )
