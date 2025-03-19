[X] Create User model
[X] User and Event associations
[X] Add User dummy data
    [X] Regular user
    [X] Admin
[X] Add User service
    [X] Get by email / username
    [X] Add new User
[X] Move jsend middleware to app.js
[X] Add User route
    [X] GET / endpoint
    [X] POST / endpoint
    [X] GET /:username endpoint
[X] Add auth route
    [X] POST / endpoint
    [X] Add auth middleware
[X] Add new routes to app.js
[X] Use auth middleware in endpoints we want to protect

*Nice to haves*
[X] login with either username or password

Also next up - Swagger Documentation 401s:
[] Deleting an event could throw a 401 - invalid token OR user not admin
[] Updating an event could throw a 401 - invalid token

Next up - Testing:
**Event Tests**
[] Get all events is successful (happy day - 200)
[] Get event by ID is successful (happy day - 200)
[] Get event by ID is unsuccessful (404)
[] Get event by ID is unsuccessful (400)
[] Add new event is successful (happy day - 201)
[] Add new event is unsuccessful (400 - could be duplicated for every property that could be missing)
[] Update event successful (204)
[] Update event unsuccessful (401)
[] Update event unsuccessful (404)
[] Update event unsuccessful (400)
[] Delete event successful (204)
[] Delete event unsuccessful (401) - invalid token
[] Delete event unsuccessful (401) - valid token, user is not an admin
[] Delete event unsuccessful (404)
[] Delete event unsuccessful (400)

**Login Tests**
[] Log in successful (200)
[] Log in unsuccessful (401 - invalid username / email)
[] Log in unsuccessful (401 - invalid password)
[] Log in unsuccessful (400 - username / email missing)
[] Log in unsuccessful (400 - password missing)

[] Signing up is successful (happy day - 201?)
[] Signing up is unsuccessful (400 - username / email / dob / password missing)

**User Tests (Not required)**
[] Get all events is successful (happy day - 200)
[] Get event by ID is successful (happy day - 200)
[] Get event by ID is unsuccessful (404)
[] Get event by ID is unsuccessful (400)
[] Add new event is successful (happy day - 201)
[] Add new event is unsuccessful (400 - could be duplicated for every property that could be missing)