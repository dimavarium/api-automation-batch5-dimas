const request = require ('supertest');
var chai = require ('chai');
chai.use (require('chai-json-schema'));
const fs = require ('fs')

const assert = chai.assert
const should = chai.should

describe ('API test for "https://reqres.in/"', () => {
    const BASE_URL = "https://reqres.in/"
    
    // PUT Test
    it ('GET Single User', async () => {
        const response = await request (BASE_URL).get("api/users/2")
        console.log(response.statusCode);
        console.log(response.body)
    });
    
    // POST Test
    it ('POST Create', async () => {
        const body = {
            "name": "morpheus",
            "job": "leader"   
        }
    
    const response = await request (BASE_URL)
    .post("api/users")
    .send(body)
    
    console.log(response.statusCode);
    console.log(response.body)

    // assertion
    should(response.statusCode === 200)

    const schemaPath = "resources/jsonSchema/post-object-schema.json"
    const jsonSchema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'))
    assert.jsonSchema(response.body, jsonSchema)
    });
    
    // DELETE Test
    it ('DELETE', async () => {
       const response = await request (BASE_URL).delete("api/users/2")
       console.log(response.statusCode);
       console.log(response.body)
    });
    
    // PUT Test
    it ('PUT Update', async () => {
        const body = {
            "name": "morpheus",
            "job": "zion resident"
        }
    const response = await request (BASE_URL)
    .put("api/users/2")
    .send(body)
    
    console.log(response.statusCode);
    console.log(response.body)
    });
});