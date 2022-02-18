const { app } = require("../../app");
const { connectMongoDb } = require("../../mongodb");
const supertest = require("supertest");
const mongoose = require("mongoose");

describe('token API INTEGRATION TESTS', () => {
  
    beforeAll(async()=> {
        await connectMongoDb();
    });

    afterAll(async()=> {
        await mongoose.connection.close(true);
    });

    it("POST /tokens/register", async ()=> {
        await supertest(app).post("/tokens/register")
            .send({ name: "John", email: "Doe", password: "1234567", confirmPassword: "1234567" })
            .set('Accept', 'application/json')
            .expect('Content-Type', /text/)
            .expect(200);
    });

    it("POST /tokens/delete", async ()=> {
        await supertest(app).get("/tokens/delete")
            .set('Accept', 'text/html')
            .expect('Content-Type', /text/)
            .expect(200);
    });

    it("POST /register fail", async()=>{
        await supertest(app)
            .post('/tokens/register')
            .set('Accept', 'applcation/json')
            .expect('Content-Type', /text/)
            .expect(200)
            .expect(new RegExp("Input Name, Email and Password", "ig"))
    }); 

    it("GET /login", async()=>{
        await supertest(app)
            .get('/tokens/login')
            .set('Accept', 'applcation/json')
            .expect('Content-Type', /text/)
            .expect(200);
    }); 

    it("GET /logout", async()=>{
        await supertest(app)
            .get('/tokens/logout')
            .set('Accept', 'text/html')
            .expect('Content-Type', /text/)
            .expect(302);
    }); 

    it("DELETE /tokens/delete FAIL", async()=>{
        await supertest(app)
            .post('/tokens/delete')
            .set('Accept', 'application/json')
            .expect(400);
    })
    
    
});