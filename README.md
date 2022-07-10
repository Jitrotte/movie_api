# movie_api

This is my Movie API project that works with a Mongo Database with different collections of Movies and Users. 

The Project uses Authentication to protect sensative information about different users.

The 2 different db collections are movies and users


## The project is currently being hosted at: https://pure-ravine-77615.herokuapp.com 

### To see the documentation page, you can use: https://pure-ravine-77615.herokuapp.com/documentation

Using a few different Endpoints, here is what information you can get/adjust or create:
- Get entire collections of movies and users. ('/movies' or '/users')
- Get Information about a specific movie such as their genre & director. ('/movies/:Title')
- Get the login info for a User as well as their favorite movies list. ('/users/:Username')
- Create OR Delete a User
- Edit a User or Movie
