const mongoose =
require("mongoose");

const translationSchema =
new mongoose.Schema({

    sourceText:{
        type:String,
        required:true
    },

    translatedText:{
        type:String,
        required:true
    },

    language:{
        type:String,
        required:true
    }

});

module.exports =
mongoose.model(
"Translation",
translationSchema
);
