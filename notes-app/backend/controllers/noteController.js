const mongoose = require("mongoose");
const Note = require("../models/Note");

const validateNoteInput = (req, res) => {
	const { title, content } = req.body;
	if (typeof title !== "string" || !title.trim() || typeof content !== "string" || !content.trim()) {
		res.status(400).json({ message: "Title and content are required" });
		return false;
	}
	return true;
};

const listNotes = async (req, res, next) => {
	try {
		const notes = await Note.find({ user: req.user.userId }).sort({ updatedAt: -1 });
		return res.json({ notes });
	} catch (error) {
		return next(error);
	}
};

const getNote = async (req, res, next) => {
	try {
		if (!mongoose.isValidObjectId(req.params.id)) {
			return res.status(400).json({ message: "Invalid note ID" });
		}
		const note = await Note.findOne({ _id: req.params.id, user: req.user.userId });
		if (!note) return res.status(404).json({ message: "Note not found" });
		return res.json({ note });
	} catch (error) {
		return next(error);
	}
};

const createNote = async (req, res, next) => {
	try {
		if (!validateNoteInput(req, res)) return;
		const note = await Note.create({
			title: req.body.title.trim(),
			content: req.body.content.trim(),
			user: req.user.userId,
		});
		return res.status(201).json({ note });
	} catch (error) {
		return next(error);
	}
};

const updateNote = async (req, res, next) => {
	try {
		if (!mongoose.isValidObjectId(req.params.id)) {
			return res.status(400).json({ message: "Invalid note ID" });
		}
		if (!validateNoteInput(req, res)) return;
		const note = await Note.findOneAndUpdate(
			{ _id: req.params.id, user: req.user.userId },
			{ title: req.body.title.trim(), content: req.body.content.trim() },
			{ new: true, runValidators: true }
		);
		if (!note) return res.status(404).json({ message: "Note not found" });
		return res.json({ note });
	} catch (error) {
		return next(error);
	}
};

const deleteNote = async (req, res, next) => {
	try {
		if (!mongoose.isValidObjectId(req.params.id)) {
			return res.status(400).json({ message: "Invalid note ID" });
		}
		const note = await Note.findOneAndDelete({ _id: req.params.id, user: req.user.userId });
		if (!note) return res.status(404).json({ message: "Note not found" });
		return res.json({ message: "Note deleted successfully" });
	} catch (error) {
		return next(error);
	}
};

module.exports = { listNotes, getNote, createNote, updateNote, deleteNote };
