hrsf125 reviews module for airbnb again / groundhog day SDC

 - Legacy: 
 https://github.com/9-airbnb-again/reviews
 
 - Proxy:
 https://github.com/Groundhog-Day/reviews-proxy
 
 - Siblings: 
    - https://github.com/Groundhog-Day/gallery-service
    - https://github.com/Groundhog-Day/scheduling
    - https://github.com/Groundhog-Day/relatedHomes-service

## CRUD

Gal has provided me with a GET endpoint that he developed for FEC.
(Located in "Service Plan for Reviews.txt")
This endpoint satisfies the "R" in crud, but he did recommend
some modifications that I should make to his schema. For example,
he says airBnB has deprecated review tags, so I can remove all
of the booleans included in his original schema. The changes I
am making to the schema are reflected below, along with the new
GET endpoint as well as three other new enpoints to satisfy the
rest of CRUD.

### Schema

#### Mongo
The data is organized into two schemas.
One for data describing the accommodation, and
one for data describing individual reviews. 
Schema: accommodationSchema, reviewSchema

accommodation: {
  id: number,
  accuracy: float,
  communication: float,
  cleanliness: float,
  checkIn: float,
  value: float,
  location: float,
},
review: {
  accommodationId: number
  userName: string,
  userPicture: string,
  userPageLink: string,
  date: date,
  reviewText: string
}


#### MySQL

The schema describes two tables.
GET will require nesting reviews query into accommodation query.

table: accommodations
  id: number (primary key)
  accuracy: float
  communication: float
  cleanliness: float
  checkIn: float
  value: float
  location: float 

table: reviews
  id: number (primary key)
  accommodationId: number (foreign key)
  userName: string
  userPicture: string
  userPageLink: string
  date: date
  reviewText: string


### Create -- POST

Posts a new review object to the db.
Requires nesting inside a GET query to calculate new averages.
This POST assigns a unique id to the created review.

app.post('/v1/api/:accommodationId/reviews', ...

{
  userName: string,
  userPicture: string,
  userPageLink: string,
  date: date,
  reviewText: string
}


### Read -- GET

Route returns JSON containing two objects: an accommodations
object with accommodation metadata, along with a reviews object
containing any number of review objects.
This object ideally omits reviewId.

app.get('/v1/api/:accommodationId/reviews', ...

{
  accommodation: {
    id: number,
    accuracy: float,
    communication: float,
    cleanliness: float,
    checkIn: float,
    value: float,
    location: float,
  },
  reviews: {
    {
      userName: string,
      userPicture: string,
      userPageLink: string,
      date: date,
      reviewText: string
    },
    {
      userName: string,
      userPicture: string,
      userPageLink: string,
      date: date,
      reviewText: string
    },

    ...
  }
}


### Update -- PUT

Updates an existing review object in the db.
Requires nesting inside a GET query to calculate new averages.
Any number of these fields could be included in the request.

app.put('/v1/api/:accommodationId/reviews/:reviewId', ...

{
  id: number,
  accommodationId: number,
  userName: string,
  userPicture: string,
  userPageLink: string,
  date: date,
  reviewText: string
}


### Destroy - DELETE

Deletes an existing review in the db with
review's primary key id as parameter.

app.delete('/v1/api/:accommodationId/reviews/:reviewId', ...

{
  reviewId: number
}