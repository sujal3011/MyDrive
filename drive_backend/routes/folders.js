const express = require("express");
const fetchUser = require("../middleware/fetchUser");
const router = express.Router();
const Folder = require("../models/Folder");
const { body, validationResult } = require('express-validator');


// ROUTE-1---->getting all the folders of the user

router.get('/getfolders', fetchUser, async (req, res) => {
    try {
        const folders = await Folder.find({ user: req.user.id });
        res.json(folders);
    } catch (error) {
        res.status(500).send("Internal server error")
    }
})

// ROUTE-2---->adding a folder

router.post('/addfolder', fetchUser, [
    body('name', 'Enter a valid name').isLength({ min: 2 }),
], async (req, res) => {
    try {
        const { name } = req.body; 
        const errors = validationResult(req);    
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const folder = new Folder({
            name, user: req.user.id   
        })
        const savedFolder = await folder.save();
        res.json(savedFolder);


    } catch (error) {
        res.status(500).send("Internal server error");
    }
})

//ROUTE-3----->updating a folder

router.put('/updatefolder/:id', fetchUser, async (req, res) => {   

    const { name } = req.body;  

    try {

        const newFolder = {};  
        if (name) { newFolder.name = name };  

       
        let folder = await Folder.findById(req.params.id);  

        if (!folder) { 
            return res.status(404).send("Not found");
        }

        

        if (req.user.id !== folder.user.toString()) {  
            return res.status(401).send("Not allowed");
        }

        

        folder = await Folder.findByIdAndUpdate(req.params.id, { $set: newFolder }, { new: true });
        res.json(folder);
    } catch (error) {
        res.status(500).send("Internal server error");
    }
})





module.exports = router