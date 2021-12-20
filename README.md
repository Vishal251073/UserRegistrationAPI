# UserRegistration
RESTAPI of userRegistartion
This API is build using Node.js as Backened Express.js as a webframework for serverside protocols. For database NOSQL database Monogodb is used and for encrypting the passwords bcrypt npm package is used. Also jwt tokens is used for authorization and for testing purpose POSTMAN or Thunder Client is recommended.

The base URL of the API is [Link to API](https://userregistratiom.herokuapp.com)

In this API we have only one route i.e. /user route so the URL becomes [Link to API](https://userregistratiom.herokuapp.com/user) : <https://userregistratiom.herokuapp.com/user>

To build the model mongoose dependency is used and a genric Schema is created for any User

We can get any particular User data we have /id endpoint so the URL becomes [Link to API](https://userregistratiom.herokuapp.com/user/<id>) : <https://userregistratiom.herokuapp.com/user/<id>>

For User SignUp we have do the POST request using endpoint /signup so the URL becomes [Link to API](https://userregistratiom.herokuapp.com/user/signup) :<https://userregistratiom.herokuapp.com/user/signup> and to test it in POSTMAN we have to send data in JSON format following the scehma as follows :

{
    name:String,
    email:String,
    phoneNumber:Number,
    city:String,
    pasword:String,
    userType:String,   
}


After the post request the data will be saved in the Mongodb Cluster and again giving GET request you can see it updated.

PUT request:
For updating user credentials I have preferred PUT request over PATCH request so you have to follow the above schema again update the credential and leave the other fields unchanged and make PUT request it will be updated.
The endpoint used for this functionality is id i.e. URL becomes [Link to API](https://userregistratiom.herokuapp.com/user/<id>) : <https://userregistratiom.herokuapp.com/user/<id>>

Similar is the case with the delete request you have to provide the id and just make the request i.e URL becomes [Link to API](https://userregistratiom.herokuapp.com/user/<id>) : https://userregistratiom.herokuapp.com/user/<id>


And at last User login part is there where you have to make a POST request following the schema:
{
    "name":"User",
    "password":"password"
}


NOTE: Previously I had made one Typo in password had return pasword but I had fixed this before deployment but the test user I had kept in database may have pasword field so please be careful about it!!

