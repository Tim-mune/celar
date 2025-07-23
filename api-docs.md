# Api Documentation

The api is build using express, Typescript, and Bun for speed.

# Endpoints

1. Sign up. Method POST
2. Login. Method POST
3. Send. Method POST
4. Transactions. Method GET
5. Users. Method GET

# Overview

## Sign up

sign up takes in a body request json containing email, role and password. This api saves the data to a postgres database and upon successful sign up the user is directed to login.
sample response success
{
"user": {
"id": "36a46fef-660d-4971-8a08-8bb8b3f8f151",
"email": "sample@gmail.com",
"password": "$2b$10$X4e5P59O1MwoVuYcugtA8OfhxOqgEPk5qSOefzcW9YiSi3Ec8GwyW",
"role": "dev",
"balance": 0
}
}

Error response
{
"msg": "User already Exists, Please Login"
}

## Login

login api takes in a body request json containing email and password. Upon successful login, the token is saved to async storage and the user is directed to dashboard.

- sample response
- sucess

{
"user": {
"id": "ba2d885b-7cc2-415f-8848-fe9e9a9968fa",
"email": "sample@example.com",
"password": "$argon2id$v=19$m=65536,t=2,p=1$aBi44SfJaLaantcLuXEh0WqGgRUmFcHOejgv8NILD3M$CAPYgCb8J32ddkANZ1eOBFmlk5r0U14uTSf8yEn/IX0",
"role": "psp",
"balance": 1620
},
"token": "token",
"message": "You have 20 merchants connected"
}

- sample failure
  {
  "msg": "Invalid Credentials"
  }

## Transactions

Transactions retrives all the transactions for a particular user. It is a protected route so it requires a token send in as Authorization header and starts with Bearer as used in convention. The user is allowed to be on a debt of mazimum 1000 so that they can test the send and cant send no more at -1000.

- Sample Response
  {
  "transactions": [
  {
  "id": "6b6d43fa-eac0-49dd-ac6a-40d4f2d99595",
  "amount": 100,
  "currency": "USD",
  "timestamp": "2025-07-22T14:42:20.121Z",
  "userId": "ba2d885b-7cc2-415f-8848-fe9e9a9968fa",
  "recipientId": "644bc671-e212-4540-9e79-acccb8df0a5b",
  "user": {
  "id": "ba2d885b-7cc2-415f-8848-fe9e9a9968fa",
  "email": "psp0@example.com",
  "password": "$argon2id$v=19$m=65536,t=2,p=1$aBi44SfJaLaantcLuXEh0WqGgRUmFcHOejgv8NILD3M$CAPYgCb8J32ddkANZ1eOBFmlk5r0U14uTSf8yEn/IX0",
  "role": "psp",
  "balance": 1620
  },
  "recipient": {
  "id": "644bc671-e212-4540-9e79-acccb8df0a5b",
  "email": "dev1@example.com",
  "password": "$argon2id$v=19$m=65536,t=2,p=1$Ie9aHZv62eB7BMg1GWdvroUZTiINF6P0YJLCP+8BNC0$/krV8L7xRyB4CpOoHzs0g7Anu+fpPsasOU4MbhmRPME",
  "role": "dev",
  "balance": 2765
  }
  },
  {
  "id": "df09ea28-83b1-4700-9626-294b32ca1ddc",
  "amount": 250,
  "currency": "KES",
  "timestamp": "2025-07-22T14:42:20.121Z",
  "userId": "ba2d885b-7cc2-415f-8848-fe9e9a9968fa",
  "recipientId": "b615d848-9408-41b5-8b3b-6e09d4857ab9",
  "user": {
  "id": "ba2d885b-7cc2-415f-8848-fe9e9a9968fa",
  "email": "psp0@example.com",
  "password": "$argon2id$v=19$m=65536,t=2,p=1$aBi44SfJaLaantcLuXEh0WqGgRUmFcHOejgv8NILD3M$CAPYgCb8J32ddkANZ1eOBFmlk5r0U14uTSf8yEn/IX0",
  "role": "psp",
  "balance": 1620
  },
  "recipient": {
  "id": "b615d848-9408-41b5-8b3b-6e09d4857ab9",
  "email": "psp2@example.com",
  "password": "$argon2id$v=19$m=65536,t=2,p=1$Tfs+CAmM4peehf5Z32ZeICW4KnqIwo0Y/eV/I8XAor8$LbRtyy3wFlAnoTFOXFZC2oeV0JEdcoPlms9V7lNYg6I",
  "role": "psp",
  "balance": 4000
  }
  },
  {
  "id": "e7be1f7c-ac46-4838-b42e-a70be0b6350b",
  "amount": 400,
  "currency": "KES",
  "timestamp": "2025-07-23T07:16:19.389Z",
  "userId": "ba2d885b-7cc2-415f-8848-fe9e9a9968fa",
  "recipientId": "644bc671-e212-4540-9e79-acccb8df0a5b",
  "user": {
  "id": "ba2d885b-7cc2-415f-8848-fe9e9a9968fa",
  "email": "psp0@example.com",
  "password": "$argon2id$v=19$m=65536,t=2,p=1$aBi44SfJaLaantcLuXEh0WqGgRUmFcHOejgv8NILD3M$CAPYgCb8J32ddkANZ1eOBFmlk5r0U14uTSf8yEn/IX0",
  "role": "psp",
  "balance": 1620
  },
  "recipient": {
  "id": "644bc671-e212-4540-9e79-acccb8df0a5b",
  "email": "dev1@example.com",
  "password": "$argon2id$v=19$m=65536,t=2,p=1$Ie9aHZv62eB7BMg1GWdvroUZTiINF6P0YJLCP+8BNC0$/krV8L7xRyB4CpOoHzs0g7Anu+fpPsasOU4MbhmRPME",
  "role": "dev",
  "balance": 2765
  }
  }
  ]
  }

## Send

Send api allows sending transactions. So it takes in Json of amount, recipient and currency. This api performs the logic to check if the user has enough to send and calculates loan limits. Additionaly updates the database.

- send response sample
  {
  "message": "Transaction successful",
  "transaction": {
  "id": "f47ee156-997e-4cc3-a1b8-48bd2a0cd69b",
  "amount": 100,
  "currency": "KES",
  "timestamp": "2025-07-23T07:26:10.345Z",
  "userId": "ba2d885b-7cc2-415f-8848-fe9e9a9968fa",
  "recipientId": "644bc671-e212-4540-9e79-acccb8df0a5b"
  },
  "balance": 320,
  "user": {
  "id": "ba2d885b-7cc2-415f-8848-fe9e9a9968fa",
  "email": "psp0@example.com",
  "password": "$argon2id$v=19$m=65536,t=2,p=1$aBi44SfJaLaantcLuXEh0WqGgRUmFcHOejgv8NILD3M$CAPYgCb8J32ddkANZ1eOBFmlk5r0U14uTSf8yEn/IX0",
  "role": "psp",
  "balance": 320
  },
  "loanLimit": 1000
  }
- sample error response
  {
  "msg": "You cannot send money yo yourseld"
  }
  {
  "msg": "Recipient not found"
  }

## Users

Users api retrives all users from backend so they can be displayed for sending transaction. Nomally it would have been particular users that meet a certain condition like friends. In this case its for test and anyone can send money to anyone by selecting their email.

- retrieves all users
  [
  {
  "id": "b615d848-9408-41b5-8b3b-6e09d4857ab9",
  "email": "psp2@example.com",
  "password": "$argon2id$v=19$m=65536,t=2,p=1$Tfs+CAmM4peehf5Z32ZeICW4KnqIwo0Y/eV/I8XAor8$LbRtyy3wFlAnoTFOXFZC2oeV0JEdcoPlms9V7lNYg6I",
  "role": "psp",
  "balance": 4000
  },
  {
  "id": "644bc671-e212-4540-9e79-acccb8df0a5b",
  "email": "dev1@example.com",
  "password": "$argon2id$v=19$m=65536,t=2,p=1$Ie9aHZv62eB7BMg1GWdvroUZTiINF6P0YJLCP+8BNC0$/krV8L7xRyB4CpOoHzs0g7Anu+fpPsasOU4MbhmRPME",
  "role": "dev",
  "balance": 2365
  },
  {
  "id": "ba2d885b-7cc2-415f-8848-fe9e9a9968fa",
  "email": "psp0@example.com",
  "password": "$argon2id$v=19$m=65536,t=2,p=1$aBi44SfJaLaantcLuXEh0WqGgRUmFcHOejgv8NILD3M$CAPYgCb8J32ddkANZ1eOBFmlk5r0U14uTSf8yEn/IX0",
  "role": "psp",
  "balance": 2020
  },
  {
  "id": "78690d95-2031-4f13-b55a-fc1c11f183c4",
  "email": "tim@gmail.com",
  "password": "$2b$10$QFp1gAq33.xCtPzi4X3hqea5UhUdvu6GKjQYHu/ZqHXdY1sYEsEGK",
  "role": "dev",
  "balance": -585
  }
  ]
