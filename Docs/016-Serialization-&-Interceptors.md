# Introducing Interceptors and Serialization

<img src="./images/images-15/image-1.png" width="800">

Interceptors are executed twice in the execution lifecycle: once before the request reaches the controller method, and once after the request is processed by the controller.

<img src="./images/images-15/image-2.png" width="800">

---

<img src="./images/images-15/image-3.png" width="800">

---

<img src="./images/images-15/image-4.png" width="800">

# Global Data Interceptor

`npx nest g interceptor /common/interceptors/data-response --no-spec` - generate an interceptor using the CLI:

interceptor method receives two parameters and returns an **RxJS Observable**.
RxJS provides an elegant way to handle asynchronous code, which is different from using promises
