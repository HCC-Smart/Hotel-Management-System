# Hotel Management System Backend Documentation

This documentation provides an overview of the Node.js backend for a hotel booking application. The backend is responsible for handling various operations related to managing admins, hotel, user, booking, room and booking

``BASE_URL = https://hotel-management-system-gyis.onrender.com``


## Table of the BookStore
   - [admin]
   - [booking]
   - [hotel]
   - [user]
   - [room]

To set up the backend for the hotel management application, follow these steps:

1. Clone the repository:

   ````bash
   git clone <repository_url>
   ```

2. Install dependencies:

   ````bash
   cd hotel-management-system
   npm install
   ```

3. Configure the environment variables:
   - Create a `.env` file in the root directory.
   - Set the following environment variables:
     - `PORT` - Port number on which the server will run (default: 9000)
     - `DATABASE_URL` - URL of the database (e.g., subapase connection string)
     - `JWT_SECRET` - Secret key for JSON Web Token (JWT) authentication

4. Start the server:

   ````bash
   npm start nodemon
   ```

   The server will run at `http://localhost:9000`

### owner SignUp

Register a new owner in the database.

**Endpoint:** `POST /api/admin/signup`

#### Request Body

| Parameter      | Type   | Required | Description                   |
| -------------- | ------ | -------- | ------------------------------ |
| `name      `   | string | Yes      | name of the admin.|
| `email`        | string | Yes      | Email of the admin.  |
| `password`     | string | Yes      | Password for the admin's account.|


#### Response

```json
{
   "status": 201,
    "message": "admin created successFully",
    "newOwner": {
        "id": 5,
        "name": "Hiba Alii",
        "email": "Hiba@gmail.com",
        "password": "$2b$10$50JX83FaEA7whOxyckuw9OElsA/oYv0QGshKWs59JIfSKzTrBhvB6",
        "created": "2023-10-07T14:13:37.588Z",
        "updated": "2023-10-07T14:13:37.588Z"
    }
}
```

### admin Login

Authenticate a owner and obtain a JWT token.

**Endpoint:** `POST /api/admin/login`

#### Request Body

| Parameter      | Type   | Required | Description                             |
| -------------- | ------ | -------- | --------------------------------------- |
| `email`        | string | Yes      | Email of the admin.                   |
| `password`     | string | Yes      | Password for the admin's account.      |

#### Response

```json
{
    "status": 200,
    "message": "admin logged in successfully",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJIaWJhQGdtYWlsLmNvbSIsImlhdCI6MTY5NjY4ODIyOSwiZXhwIjoxNjk2NjkxODI5fQ.nuaPeUG3H7wHwX7BHjGQNHxXeqo0jictWcLhu9Htcik"
}
```

### Create user

Create a new user .

**Endpoint:** `POST /api/user/signup`

#### Request Body

| Parameter      | Type   | Required | Description                   |
| -------------- | ------ | -------- | ------------------------------ |
| `name      `   | string | Yes      | name of the admin.|
| `email`        | string | Yes      | Email of the admin.  |
| `password`     | string | Yes      | Password for the admin's account.|

#### Response

```json
{
   "status": 201,
    "message": "user created successFully",
    "newUser": {
        "id": 5,
        "name": "Hiba",
        "email": "Hiba@gmail.com",
        "password": "$2b$10$50JX83FaEA7whOxyckuw9OElsA/oYv0QGshKWs59JIfSKzTrBhvB6",
        "created": "2023-10-07T14:13:37.588Z",
        "updated": "2023-10-07T14:13:37.588Z"
    }
}


### admin Login

Authenticate a owner and obtain a JWT token.

**Endpoint:** `POST /api/user/login`

#### Request Body

| Parameter      | Type   | Required | Description                             |
| -------------- | ------ | -------- | --------------------------------------- |
| `email`        | string | Yes      | Email of the user.                   |
| `password`     | string | Yes      | Password for the admin's account.      |

#### Response

```json
{
    "status": 200,
    "message": "user logged in successfully",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJIaWJhQGdtYWlsLmNvbSIsImlhdCI6MTY5NjY4ODIyOSwiZXhwIjoxNjk2NjkxODI5fQ.nuaPeUG3H7wHwX7BHjGQNHxXeqo0jictWcLhu9Htcik"
}
```

















### Create a hotel

Create a new hotel owned by the authenticated admin.

**Endpoint:** `POST /api/hotel/create-hotel`

#### Request Body

| Parameter       | Type    | Required | Description                            |
| --------------- | ------- | -------- | -------------------------------------- |
| `id`            | string  | Yes      | id of the hotel.                        |
| `name   `   | string  | Yes      | Id of the hotel.                      |
| `address`   | string  | Yes      | Id of the hotel.                   |


#### Response

```json
{
 "status": 200,
  "message": "hotel successFully added"
}
```
