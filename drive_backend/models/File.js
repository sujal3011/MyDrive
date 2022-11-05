const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    folderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'folder'
    },
    original_fileId:{
        type:String,
        required: true,
    },
    name: {
        type: String,
        required: true,
        minLength: 5,
        trim: true
    },

}, { timestamps: true });

module.exports = mongoose.model('file', FileSchema);