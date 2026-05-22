const mongoose =
require("mongoose");

const connectDB =
async ()=>{

try{

await mongoose.connect(
"mongodb://back:Samriddhi123@ac-3sdfuml-shard-00-00.xuoa9og.mongodb.net:27017,ac-3sdfuml-shard-00-01.xuoa9og.mongodb.net:27017,ac-3sdfuml-shard-00-02.xuoa9og.mongodb.net:27017/?ssl=true&replicaSet=atlas-np4cd8-shard-0&authSource=admin&appName=backend-packing"
);

console.log(
"connected to MongoDB"
);

}catch(error){

console.log(
error.message
);

process.exit();

}

};

module.exports =
connectDB;