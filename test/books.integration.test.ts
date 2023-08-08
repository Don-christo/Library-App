import express from 'express';
import supertest from 'supertest';
import request from "supertest";
import app from '../src/app';
import userRoutes from '../src/routes/userRoutes';
import bookRoutes from '../src/routes/bookRoutes'

app.use('/users', userRoutes);
app.use('/books', bookRoutes);


const signupInfo =  {
     
    firstName: "ikechukwu",
    lastName: "odokoro",
     email:"odokoroikechukwujnr@gmail.com"
   }

   const logInfo ={
     email:"odokoroikechukwujnr@gmail.com",
     password:"password",
}

describe('User route functionalities', () => { 
    it('/POST user signup', async () => {
        const user =  await request(app).post('/users/create')
         .send(signupInfo)

        //  test for signup success
         if( user.statusCode === 200){
          expect(user.body.message).toBe( `User created successfully`)
        //  }else if(signupInfo.email){
        //   expect(user.body.message).toBe( `User already exists`)
         }
    });

         // test for login success
    it('/POST user login', async () => {
         const user =  await request(app).post('/users/login')
        .send(logInfo)
        if( user.statusCode === 200){
         expect(user.body.message).toBe('Login successful')
         }
     })
       
      // Get all users
     it('/GET get all users', async () => {
        const user = await request(app).get('/users/getall')
        if(user.statusCode === 200){
           expect(user.body.message).toBe("Users fetched successfully")
            // infos:allUsers
       }
 })
   
    // Update user
    it('/PUT update users', async () => {
        const user = await request(app).put('/users/update')
        if(user.statusCode === 200){
           expect(user.body.message).toBe("User updated succesfully")
            // infos:allUsers
       }
 })


     // Delete all books
   it('/delete users', async () => {
    const user = await request(app).delete('/users/delete')
    if(user.statusCode === 200){
       expect(user.body.message).toBe("Deleted Successfully")
        // infos:allUsers
   }
})

})


describe('Book route functionalities', () => { 
     
    // CREATE BOOK
    it('/POST create books',async () => {
        // const user = await request(app).post('/users/login').send(logInfo)
        // const token = user.body.token

        const books = {
            "title": "john890",
            "author": "kingobiora",
            "date_published": "11-10-11",
            "description": "spain madrid",
            "page_count": 707,
            "genre": "poems",
             "publisher": "decagon"
        }

        const bookResponse = (await request(app).post('/books/create').send(books)
        .set('authorization', `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGFmMzQ2ZmQ3NDJjMjUxZTE4ZTlhMDUiLCJmaXJzdE5hbWUiOiJBbWFyYSIsImxhc3ROYW1lIjoib2Jpb3JhIiwiZW1haWwiOiJvYmlvcmFraW5nc2xleTI0QGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJhJDEwJE5KSk9jQ1VyT0hhbm5XdFUvaTVURU9oYzUydU5lai90RjA0UG93QThnVmwvYzFaMG9ERkVHIiwicm9sZSI6IkF1dG9yIiwiYm9va3MiOltdLCJjcmVhdGVkQXQiOiIyMDIzLTA3LTEyVDIzOjE3OjAzLjM0OVoiLCJ1cGRhdGVkQXQiOiIyMDIzLTA3LTEyVDIzOjE3OjAzLjM0OVoiLCJfX3YiOjAsImlhdCI6MTY4OTI0Mjg3MiwiZXhwIjoxNjg5ODQ3NjcyfQ.rIp3lHfHym5Q2Ba6BF7ackPJUnJ3MrIi1eiSpubMJOY`) )

        if(bookResponse.statusCode === 200){
            expect(bookResponse.body.message).toBe(`Book created successfully`)
        }
    })

    //   GET ALL BOOKS
    it('/GET books', async () =>{
        const books = (await request(app).get('/books/getbooks').set('authorization',
        `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGFmMzQ2ZmQ3NDJjMjUxZTE4ZTlhMDUiLCJmaXJzdE5hbWUiOiJBbWFyYSIsImxhc3ROYW1lIjoib2Jpb3JhIiwiZW1haWwiOiJvYmlvcmFraW5nc2xleTI0QGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJhJDEwJE5KSk9jQ1VyT0hhbm5XdFUvaTVURU9oYzUydU5lai90RjA0UG93QThnVmwvYzFaMG9ERkVHIiwicm9sZSI6IkF1dG9yIiwiYm9va3MiOltdLCJjcmVhdGVkQXQiOiIyMDIzLTA3LTEyVDIzOjE3OjAzLjM0OVoiLCJ1cGRhdGVkQXQiOiIyMDIzLTA3LTEyVDIzOjE3OjAzLjM0OVoiLCJfX3YiOjAsImlhdCI6MTY4OTI0Mjg3MiwiZXhwIjoxNjg5ODQ3NjcyfQ.rIp3lHfHym5Q2Ba6BF7ackPJUnJ3MrIi1eiSpubMJOY`))
         
        if(books.statusCode === 200){
            expect(books.body.message).toBe("All Books fetched successfully")
        }
    });

    // UPDATE BOOK

    it('/PUT UPDATE BOOK',async () => {
        // const user = await request(app).post('/users/login').send(logInfo)
        // const token = user.body.token

        const books = {
            "title": "john890",
            "author": "kingobiora",
            "date_published": "11-10-11",
            "description": "spain madrid",
            "page_count": 707,
            "genre": "poems",
             "publisher": "decagon"
        }

        const bookUpdate = (await request(app).put('/books/update').send(books)
        .set('authorization', `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGFmMzQ2ZmQ3NDJjMjUxZTE4ZTlhMDUiLCJmaXJzdE5hbWUiOiJBbWFyYSIsImxhc3ROYW1lIjoib2Jpb3JhIiwiZW1haWwiOiJvYmlvcmFraW5nc2xleTI0QGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJhJDEwJE5KSk9jQ1VyT0hhbm5XdFUvaTVURU9oYzUydU5lai90RjA0UG93QThnVmwvYzFaMG9ERkVHIiwicm9sZSI6IkF1dG9yIiwiYm9va3MiOltdLCJjcmVhdGVkQXQiOiIyMDIzLTA3LTEyVDIzOjE3OjAzLjM0OVoiLCJ1cGRhdGVkQXQiOiIyMDIzLTA3LTEyVDIzOjE3OjAzLjM0OVoiLCJfX3YiOjAsImlhdCI6MTY4OTI0Mjg3MiwiZXhwIjoxNjg5ODQ3NjcyfQ.rIp3lHfHym5Q2Ba6BF7ackPJUnJ3MrIi1eiSpubMJOY`) )

        if(bookUpdate.statusCode === 200){
            expect(bookUpdate.body.message).toBe(`Book updated successfully`)
        }
    });
       

    // DELETE BOOK
    it('/DELETE DELETE BOOK',async () => {
        // const user = await request(app).post('/users/login').send(logInfo)
        // const token = user.body.token

        const books = {
            "title": "john890"
        }

        const bookDelete = (await request(app).delete('/books/delete').send(books)
        .set('authorization', `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGFmMzQ2ZmQ3NDJjMjUxZTE4ZTlhMDUiLCJmaXJzdE5hbWUiOiJBbWFyYSIsImxhc3ROYW1lIjoib2Jpb3JhIiwiZW1haWwiOiJvYmlvcmFraW5nc2xleTI0QGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJhJDEwJE5KSk9jQ1VyT0hhbm5XdFUvaTVURU9oYzUydU5lai90RjA0UG93QThnVmwvYzFaMG9ERkVHIiwicm9sZSI6IkF1dG9yIiwiYm9va3MiOltdLCJjcmVhdGVkQXQiOiIyMDIzLTA3LTEyVDIzOjE3OjAzLjM0OVoiLCJ1cGRhdGVkQXQiOiIyMDIzLTA3LTEyVDIzOjE3OjAzLjM0OVoiLCJfX3YiOjAsImlhdCI6MTY4OTI0Mjg3MiwiZXhwIjoxNjg5ODQ3NjcyfQ.rIp3lHfHym5Q2Ba6BF7ackPJUnJ3MrIi1eiSpubMJOY`) )

        if(bookDelete.statusCode === 200){
            expect(bookDelete.body.message).toBe(`Deleted successfully`)
        }
    })


    // GET SINGLE BOOK INFORMATION

    it('/GET GET SINGLE BOOK INFO',async () => {
        // const user = await request(app).post('/users/login').send(logInfo)
        // const token = user.body.token

        const books = {
            "title": "john890"
        }

        const bookInfo = (await request(app).get('/books/getbookinfo').send(books)
        .set('authorization', `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGFmMzQ2ZmQ3NDJjMjUxZTE4ZTlhMDUiLCJmaXJzdE5hbWUiOiJBbWFyYSIsImxhc3ROYW1lIjoib2Jpb3JhIiwiZW1haWwiOiJvYmlvcmFraW5nc2xleTI0QGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJhJDEwJE5KSk9jQ1VyT0hhbm5XdFUvaTVURU9oYzUydU5lai90RjA0UG93QThnVmwvYzFaMG9ERkVHIiwicm9sZSI6IkF1dG9yIiwiYm9va3MiOltdLCJjcmVhdGVkQXQiOiIyMDIzLTA3LTEyVDIzOjE3OjAzLjM0OVoiLCJ1cGRhdGVkQXQiOiIyMDIzLTA3LTEyVDIzOjE3OjAzLjM0OVoiLCJfX3YiOjAsImlhdCI6MTY4OTI0Mjg3MiwiZXhwIjoxNjg5ODQ3NjcyfQ.rIp3lHfHym5Q2Ba6BF7ackPJUnJ3MrIi1eiSpubMJOY`))

        if(bookInfo.statusCode === 200){
            expect(bookInfo.body.message).toBe(`Books information fetched successfully`)
        }
    })
})