# zetapush-examples

In this repository we have many examples of ZetaPush. Each folder is an application with a specific use case.

_In each example you can see some "tag" like : `// <1>`. 
This is because this examples are also used in our [documentation](https://doc.zetapush.com).

---

## Getting started examples

### hello-world-custom-cloud-service

Basic application to display _"Hello World"_ using a _Custom Cloud Service_.

---

## Some examples

### readApplicationJson

Explain how to read the _application.json_ file from the worker

### filesystem

Show how to use the file system cloud service.

### handlerHttpRequests

Example to explain how to launch a HTTP server in your worker.

### changePassword

Example of code to change the password of a user using the legacy cloud services.

### database-basic-key-value

A basic example of storage using key-value method.

---

## Standard User Management

### changeAccountCreation

Example of extension of the **StandardUserWorkflow** to change the behavior of the account creation.

### changeAccountCreation

Example of extension of the **StandardUserWorkflow** to change the behavior of the account creation.

### changeGenerationToken

Example of extension of the **StandardUserWorkflow** to change the generation of the token used for the account confirmation process.

### changeMessageConfirmationSender

Example of extension of the **StandardUserWorkflow** to change the method to send the message of the account confirmation (use SMS for example, displayed in the console for this example).

### changeTokenStorage

Example of extension of the **StandardUserWorkflow** to change how the token used for the account confirmation is stored.

### changeUserStorage

Example of extension of the **StandardUserWorkflow** to change the storage of the user informations.

### changeUuidGeneration

Example of extension of the **StandardUserWorkflow** to change the generation of the UUID used to identify a user.

---

## Applications

### avengersChat

A basic application that allow you to use a _Avengers_ personage and chat with other.

### standard-user-workflow

Basic application to have an application with user management (creation, confirmation, login)

### ionic-message-survey

Ionic application that use ZetaPush Celtia to create a survey and send messages through users.

### MyBuzzNight

Angular application that allows you to create an event, invite friends, and share photos in real-time.
