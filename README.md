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
The schema is organized as an array of review objects
nested inside an accommodation object.
The accommodation statistics (floats) are included
at the top level as well as the review level because
I don't want to average my all records on every get query.
This method allows me to recalculate the top-level statistic
every post and update, and also recalculate the top-level
when a single review is deleted.

```json
accommodation: {
  "id": "number",
  "accuracy": "float",
  "communication": "float",
  "cleanliness": "float",
  "checkIn": "float",
  "value": "float",
  "location": "float",
  "reviews": [{
    "id": "number",
    "userName": "string",
    "userPicture": "string",
    "userPageLink": "string",
    "date": "date",
    "reviewText": "string",
    "accuracy": "float",
    "communication": "float",
    "cleanliness": "float",
    "checkIn": "float",
    "value": "float",
    "location": "float",
  }]
}
```


#### MySQL

The schema describes two tables.
GET will require nesting reviews query into accommodation query.

Table: accommodations

| id                   | accuracy | communication | cleanliness | checkIn | value | location |
|----------------------|----------|---------------|-------------|---------|-------|----------|
| number (primary key) | float    | float         | float       | float   | float | float    |


table: reviews

| id                   | accommodationId      | userName | userPicture | userPageLink | date | reviewText | accuracy | communication | cleanliness | checkIn | value | location |
|----------------------|----------------------|----------|-------------|--------------|------|------------|----------|---------------|-------------|---------|-------|----------|
| number (primary key) | number (foreign key) | string   | string      | string       | date | string     | float    | float         | float       | float   | float | float    |

### Create -- POST

Posts a new review object to the db.
Requires nesting inside a GET query to calculate new averages.
This POST assigns a unique id to the created review.

app.post('/v1/api/:accommodationId/reviews', ...

The request object:
```json 
{
  "accommodationId": "number",
  "userName": "string",
  "userPicture": "string",
  "userPageLink": "string",
  "date": "date",
  "reviewText": "string",
  "accuracy": "float",
  "communication": "float",
  "cleanliness": "float",
  "checkIn": "float",
  "value": "float",
  "location": "float",
}
```


### Read -- GET

Route returns JSON containing accommodation metadata and an array containing any number of review objects.
This response omits statistic metadata in the review object.

app.get('/v1/api/:accommodationId/reviews', ...

The response object:
```json
{
  "id": "number",
  "accuracy": "float",
  "communication": "float",
  "cleanliness": "float",
  "checkIn": "float",
  "value": "float",
  "location": "float",
  "reviews": [{
    "userName": "string",
    "userPicture": "string",
    "userPageLink": "string",
    "date": "date",
    "reviewText": "string"
  }]
}
```


### Update -- PATCH

Updates an existing review object in the db.
Requires nesting inside a GET query to calculate new averages.
Any number of these fields could be included in the request.

app.patch('/v1/api/:accommodationId/reviews/:reviewId', ...

The request object:
```json
{
  "id": "number",
  "accommodationId": "number",
  "accuracy": "float",
  "communication": "float",
  "cleanliness": "float",
  "checkIn": "float",
  "value": "float",
  "location": "float",
  "reviewText": "string"
}
```


### Destroy - DELETE

Deletes an existing review in the db with
review's primary key id as parameter.

app.delete('/v1/api/:accommodationId/reviews/:reviewId', ...

The request object:
```json
{
  "reviewId": "number"
}
```