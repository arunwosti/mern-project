import mongoose from "mongoose";

const userSchema = new mongoose.Schema ({
    // creating schema that stored users credentials in auth0/database which will be created when user register for 1st time
    // A schema defines the structure of the documents within a collection, specifying the fields and their data types
auth0Id: {
    type: String,
    required: true,
},
email: {
    type: String,
    required: true,
},
name: {
    type: String,
} ,
addressLine1 :{
    type: String,
},
city:{
    type: String,
},
country: {
    type: String,
}

});

const User = mongoose.model("User", userSchema);

export default User;