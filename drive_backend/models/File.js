const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    original_name: {
        type: String,
        required: true,
    },
    file_name: {
        type: String,
        required: true,
    },
    path:{
        type:String,
        required:true
    },
    uploadDate:{
        type:Date,
        default:Date.now
    }

}, { timestamps: true });

module.exports = mongoose.model('file', FileSchema);