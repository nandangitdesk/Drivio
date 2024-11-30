# Backend API Documentation (Drivio)

## ``Users Authentication API Documentation``
---
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

## `/users/profile` Endpoint

### Overview

The `/users/profile` endpoint is a protected route that retrieves the profile information of the authenticated user. It requires a valid JSON Web Token (JWT) to access the user's profile data.

---

### **Endpoint**

- **URL:** `/users/profile`
- **Method:** `GET`
- **Content-Type:** `application/json`
- **Authentication:** Required (JWT)

---

### **Request Requirements**

#### **Headers**
The request must include a valid authentication token:

1. **Authorization Header:** 
2. **Cookies:**


---

### **Response**

#### **Success Response**

- **Status Code:** `200 OK`
- **Description:** User profile data retrieved successfully.

##### **Response Body Example**
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
}
}
```
### Error Responses
##### Unauthorized Access

**Status Code**: `401` Unauthorized
**Description**: The request does not include a valid authentication token, or the token is invalid or expired.

#### Response Body Example:
```json

{
  "error": "Unauthorized"
}
```


**Status Code**: `401` Unauthorized
**Description**: The token is valid, but the user associated with it does not exist in the database.

#### Response Body Example:
```json

{
  "error": "Unauthorized"
}
```
## `/users/logout` Endpoint

### Overview

The `/users/logout` endpoint allows an authenticated user to log out by clearing their authentication token and adding the token to a blacklist to prevent reuse.

---

### **Endpoint**

- **URL:** `/users/logout`
- **Method:** `POST`
- **Content-Type:** `application/json`
- **Authentication:** Required (JWT)

---

### **Request Requirements**

#### **Headers**
The request must include a valid authentication token:

1. **Authorization Header:**
2. **Cookies (Optional):**


#### **Authentication**
- The endpoint requires a valid JWT token, either in the `Authorization` header or `cookies`.

---

### **Response**

#### **Success Response**

- **Status Code:** `200 OK`
- **Description:** The user has been successfully logged out, and their token is blacklisted.

##### **Response Body Example**
```json
{
"message": "Logout successful"
}
```
---
## ``Captains Authentication API Documentation``
---

## `/captains/register` Endpoint

### Overview
Registers a new captain by validating the input, hashing the password, and saving the captain's details to the database.

### **Endpoint**

- **URL:** `/captains/register`
- **Method:** `POST`
- **Content-Type:** `application/json`


#### **Request Body**  
The request body must be a JSON object containing the following fields:

| Field                 | Type   | Description                                                  | Required |
|-----------------------|--------|--------------------------------------------------------------|----------|
| `fullname.firstname`  | String | The first name of the captain (minimum 3 characters).        | Yes      |
| `fullname.lastname`   | String | The last name of the captain (minimum 3 characters).         | Yes      |
| `email`               | String | A valid email address.                                       | Yes      |
| `password`            | String | The password for the captain account (minimum 8 characters). | Yes      |
| `vehicle.color`       | String | The color of the vehicle (minimum 3 characters).             | Yes      |
| `vehicle.plate`       | String | The vehicle's license plate (minimum 3 characters).          | Yes      |
| `vehicle.capacity`    | Number | The seating or load capacity of the vehicle (minimum value 1). | Yes      |
| `vehicle.vehicleType` | String | The type of the vehicle (must be one of: `car`, `auto`, `motorcycle`). | Yes      |


### **Responses**

#### **Success (201 Created)**
A captain is successfully registered, and a token is issued.

```json
{
  "captain": {
    "_id": "64f9a7c7c1e4ab1e8d76f123",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "vehicle": {
      "color": "Blue",
      "plate": "AB123CD",
      "capacity": 4,
      "vehicleType": "car"
    },
    "status": "inactive",
    "createdAt": "2024-11-26T12:00:00.000Z",
    "updatedAt": "2024-11-26T12:00:00.000Z"
  },
  "token": "your.jwt.token.here"
}
```
### Error (400 Bad Request)
Invalid Input:

```json
{
  "errors": [
    {
      "msg": "First name must be at least 3 characters long",
      "param": "fullname.firstname",
      "location": "body"
    }
  ]
}
```
Email Already Exists:
```json
{
  "error": "Captain already exists"
}
```

---
## `/captains/login` Endpoint

### Overview
This endpoint allows an existing captain to log in and receive an authentication token.

---

### **Endpoint**

- **URL:** `/captains/login`
- **Method:** `POST`
- **Content-Type:** `application/json`

---

### **Request Requirements**

#### **Headers**
No authentication required.

#### **Request Body**
The request body must be a JSON object containing the following fields:

| Field      | Type   | Description                                    | Required |
|------------|--------|------------------------------------------------|----------|
| `email`    | String | The registered captain's email address.        | Yes      |
| `password` | String | The password for the captain's account.         | Yes      |

---

### **Responses**

#### **Success (200 OK)**
The captain is authenticated, and a token is issued.

**Example Response:**
```json
{
  "captain": {
    "_id": "64f9a7c7c1e4ab1e8d76f123",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "vehicle": {
      "color": "Blue",
      "plate": "AB123CD",
      "capacity": 4,
      "vehicleType": "car"
    },
    "status": "active",
    "createdAt": "2024-11-26T12:00:00.000Z",
    "updatedAt": "2024-11-26T12:00:00.000Z"
  },
  "token": "your.jwt.token.here"
}
```
### Error Responses
400 Bad Request: Invalid input data.
```json
{
  "errors": [
    {
      "msg": "Please enter a valid email",
      "param": "email",
      "location": "body"
    }
  ]
}
```
401 Unauthorized: Invalid email or password.
```json
{
  "error": "Invalid email or password"
}
```
---
## `/captains/profile` Endpoint

### Overview
This endpoint allows an authenticated captain to retrieve their profile details.

---

### **Endpoint**

- **URL:** `/captains/profile`
- **Method:** `GET`
- **Content-Type:** `application/json`
- **Authentication:** Required (JWT Token)

---

### **Request Requirements**

#### **Headers**
The request must include a valid JWT token for authentication:

| Header            | Type   | Description                      | Required |
|-------------------|--------|----------------------------------|----------|
| `Authorization`   | String | Bearer token for the captain.    | Yes      |

---

### **Responses**

#### **Success (200 OK)**
Returns the profile of the authenticated captain.

**Example Response:**
```json
{
  "captain": {
    "_id": "64f9a7c7c1e4ab1e8d76f123",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "vehicle": {
      "color": "Blue",
      "plate": "AB123CD",
      "capacity": 4,
      "vehicleType": "car"
    },
    "status": "active",
    "createdAt": "2024-11-26T12:00:00.000Z",
    "updatedAt": "2024-11-26T12:00:00.000Z"
  }
}
```
### Error Responses
401 Unauthorized: The captain is not authenticated.

```json
{
  "error": "Unauthorized access"
}
```
---
## `/captains/logout` Endpoint

### Overview
This endpoint allows an authenticated captain to log out by clearing the authentication token and adding it to a blacklist.

---

### **Endpoint**

- **URL:** `/captains/logout`
- **Method:** `GET`
- **Content-Type:** `application/json`
- **Authentication:** Required (JWT Token)

---

### **Request Requirements**

#### **Headers**
The request must include a valid JWT token for authentication:

| Header            | Type   | Description                      | Required |
|-------------------|--------|----------------------------------|----------|
| `Authorization`   | String | Bearer token for the captain.    | Yes      |

#### **Cookies**
The request may include a `token` cookie for authentication:

| Cookie    | Type   | Description                           | Required |
|-----------|--------|---------------------------------------|----------|
| `token`   | String | JWT token used for authentication.    | Yes      |

---

### **Responses**

#### **Success (200 OK)**
Indicates that the logout was successful, and the token is blacklisted.

**Example Response:**
```json
{
  "message": "Logout successful"
}
```