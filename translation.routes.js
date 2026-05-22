console.log("translation.routes loaded");

const express = require("express");

const router = express.Router();

const Translation = require("../models/translations.model");

// GET all translations
router.get("/", async (req, res) => {
  try {
    const data = await Translation.find();

    res.json(data);

  } catch (error) {

    res.status(500).json({
      message: error.message
    }); 
  }
});  
    


// POST translation
router.post("/", async (req, res) => {
  try {
    const data = await Translation.create(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



// DELETE by MongoDB ID
router.delete("/:id", async (req, res) => {

  try {
    const deleted = await Translation.findByIdAndDelete(req.params.id);

  if (!deleted) {

    return res.status(404).json({
       message: "Document not found"
    });

  }

  res.json({
    message: "Deleted successfully"
 });
} catch (error) {

  res.status(500).json({
    message: error.message
  });
}

});

// PATCH update
router.patch("/:id", async (req, res) => {
  try {
    const updated = await Translation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});


module.exports = router;