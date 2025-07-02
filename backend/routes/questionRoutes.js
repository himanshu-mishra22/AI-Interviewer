const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const { addQuestions, togglePinQuestion, updateNoteQuestions } = require("../controllers/questionController");
const router = express.Router();

router.post("/add",protect,addQuestions);
router.post("/:id/pin",protect,togglePinQuestion);
router.post("/:id/note",protect,updateNoteQuestions);

module.exports = router;