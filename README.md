# Sports-store-api

Backend services for [Sports-store](https://github.com/RafalAlmakiewicz/sports-store). Created with `Express` and `Mongoose`. `JsonWebToken` was used to implement user accounts.

## Hosted on Heroku

List of all products: https://sportify-7.herokuapp.com/sportsstore/api/products

List of all activities: https://sportify-7.herokuapp.com/sportsstore/api/activities

## All Endpoints

### SportsStore/api/products

`GET` &nbsp;

`GET` `/:id` &nbsp;

`POST` &nbsp;

`PUT` `/:id` &nbsp;

`DELETE` `/:id` &nbsp;

### SportsStore/api/activities

`GET`

`GET` `/:id`

`POST` &nbsp;

`PUT` `/:id`

`DELETE` `/:id`

### SportsStore/api/users

`POST` &nbsp; register new user

### SportsStore/api/auth

`POST` &nbsp; authenticate user

### SportsStore/api/seed

`POST` &nbsp; Seed database with default data stored in [default.json](https://github.com/RafalAlmakiewicz/sports-store-api/blob/master/default.json) file.
