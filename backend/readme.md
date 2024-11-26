# Backend API Documentation (Drivio)

## `users/register` Endpoint 

### Overview

The `/users/register` endpoint allows users to register by providing their full name, email, and password. It validates the input data, hashes the password for security, stores the user in the database, and returns a token for authentication.

---

### **Endpoint**

- **URL:** `/users/register`
- **Method:** `POST`
- **Content-Type:** `application/json`

---

### **Request Requirements**

#### **Request Body**
The request body must be a JSON object containing the following fields:

| Field                 | Type   | Description                                      | Required |
|-----------------------|--------|--------------------------------------------------|----------|
| `fullname.firstname`  | String | The first name of the user (minimum 3 characters). | Yes      |
| `fullname.lastname`   | String | The last name of the user (minimum 3 characters). | Yes      |
| `email`               | String | A valid email address.                          | Yes      |
| `password`            | String | The password for the user account (minimum 8 characters). | Yes      |

#### **Validation Rules**
- **Email** must be in a valid email format.
- **Password** must be at least 8 characters long.
- **First Name** and **Last Name** must each have a minimum of 3 characters.

---

### **Example Request**

#### **Valid Request**
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
 ```
### Success Response

 #### **Response Body**
 ```json

 {
  "user": {
    "_id": "64f7c8f5a7b15d1e5a6e4a21",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "createdAt": "2024-11-26T10:20:15.123Z",
    "updatedAt": "2024-11-26T10:20:15.123Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}

```

## `users/login` Endpoint

### Overview

The `users/login` endpoint allows registered users to log in by providing their email and password. It verifies the provided credentials and returns a token for authentication upon successful login.

---

### **Endpoint**

- **URL:** `/users/login`
- **Method:** `POST`
- **Content-Type:** `application/json`

---

### **Request Requirements**

#### **Request Body**
The request body must be a JSON object containing the following fields:

| Field       | Type   | Description                        | Required |
|-------------|--------|------------------------------------|----------|
| `email`     | String | A valid email address.            | Yes      |
| `password`  | String | The password for the user account. | Yes      |

#### **Validation Rules**
- **Email** must be in a valid email format.
- **Password** must match the registered user's password.

---

### **Example Request**

#### **Valid Request**
```json
{
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```
### Success Response

 #### **Response Body**
 ```json
 {
  "user": {
    "_id": "64f7c8f5a7b15d1e5a6e4a21",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "createdAt": "2024-11-26T10:20:15.123Z",
    "updatedAt": "2024-11-26T10:20:15.123Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```
