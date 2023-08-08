## Solve using your mongodb-compass aggregation tool

### Requirements:

- Import the restaurant.json file as a new collection

### Exercise:

1. Write a MongoDB query to find the restaurant Id, name, borough and cuisine for those restaurants which contain 'Reg' as three letters somewhere in its name.

db.Restaurant.find(
  { name: { $regex: 'Reg', $options: 'i' } },
  { restaurant_id: 1, name: 1, borough: 1, cuisine: 1, _id: 0 }
)

2. Write a MongoDB query to find the restaurants which belong to the borough Bronx and prepared either American or Chinese dish.

db.Restaurant.find({
  $and: [
    { borough: 'Bronx' },
    { $or: [
      { cuisine: 'American' },
      { cuisine: 'Chinese' }
    ]}
  ]
})

3. Write a MongoDB query to find the restaurant Id, name, borough and cuisine for those restaurants which belong to the borough Staten Island or Queens or Bronxor Brooklyn.

db.Restaurant.find(
  { borough: { $in: ['Staten Island', 'Queens', 'Bronx', 'Brooklyn'] } },
  { restaurant_id: 1, name: 1, borough: 1, cuisine: 1, _id: 0 }
)

4. Write a MongoDB query to find the restaurant Id, name, borough and cuisine for those restaurants which are not belonging to the borough Staten Island or Queens or Bronxor Brooklyn.

db.Restaurant.find(
  { borough: { $nin: ['Staten Island', 'Queens', 'Bronx', 'Brooklyn'] } },
  { restaurant_id: 1, name: 1, borough: 1, cuisine: 1, _id: 0 }
)

5. Write a MongoDB query to find the restaurant Id, name, borough and cuisine for those restaurants which achieved a score which is not more than 10.

db.Restaurant.find(
  { "score": { $lte: 10 } },
  { restaurant_id: 1, name: 1, borough: 1, cuisine: 1, _id: 0 }
)

6. Write a MongoDB query to find the restaurant Id, name, borough and cuisine for those restaurants which prepared dish except 'American' and 'Chinees' or restaurant's name begins with letter 'Wil'.

db.Restaurant.find(
  {
    $or: [
      { cuisine: { $nin: ['American', 'Chinese'] } },
      { name: { $regex: '^Wil', $options: 'i' } }
    ]
  },
  { restaurant_id: 1, name: 1, borough: 1, cuisine: 1, _id: 0 }
)

7. Write a MongoDB query to find the restaurant Id, name, and grades for those restaurants which achieved a grade of "A" and scored 11 on an ISODate "2014-08-11T00:00:00Z" among many of survey dates..

db.Restaurant.find(
  {
    grades: {
      $elemMatch: {
        grade: "A",
        score: 11,
        date: ISODate("2014-08-11T00:00:00Z")
      }
    }
  },
  { restaurant_id: 1, name: 1, grades: 1, _id: 0 }
)

8. Write a MongoDB query to find the restaurant Id, name and grades for those restaurants where the 2nd element of grades array contains a grade of "A" and score 9 on an ISODate "2014-08-11T00:00:00Z".

db.Restaurant.find(

  {

    "grades.1.grade": "A",

    "grades.1.score": 9,

    "grades.1.date": ISODate("2014-08-11T00:00:00Z")

  },

  { restaurant_id: 1, name: 1, grades: 1 }

);

9. Write a MongoDB query to find the restaurant Id, name, address and geographical location for those restaurants where 2nd element of coord array contains a value which is more than 42 and upto 52..

10. Write a MongoDB query to arrange the name of the restaurants in ascending order along with all the columns.

db.Restaurant.find().sort({ name: 1 })

11. Write a MongoDB query to arrange the name of the restaurants in descending along with all the columns.

db.Restaurant.find().sort({ name: -1 })

12. Write a MongoDB query to arranged the name of the cuisine in ascending order and for that same cuisine borough should be in descending order.

db.Restaurant.find().sort({ cuisine: 1, borough: -1 })

13. Write a MongoDB query to know whether all the addresses contains the street or not.

db.Restaurant.find({
  address: {
    $not: {
      $elemMatch: {
        street: {
          $regex: /^\s*$|^$/
        }
      }
    }
  }
})