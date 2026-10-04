const express = require("express");
const requireAuth = require("../middleware/authMiddleware");
const {
  listNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote,
} = require("../controllers/noteController");
const router = express.Router();

router.use(requireAuth);
router.get("/", listNotes);
router.post("/", createNote);
router.get("/:id", getNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

module.exports = router;