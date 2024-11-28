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

