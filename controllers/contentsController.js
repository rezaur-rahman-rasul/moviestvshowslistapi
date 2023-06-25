const Content = require("../models/Content")
const getAllContents = async (req, res) => {
    const contents = await Content.find();
    if (!contents) return res.status(204).json({ 'message': 'No contents found.' });
    res.json(contents);
}

const createNewContent = async (req, res) => {
    if (!req?.body?.id ) {
        return res.status(400).json({ 'message': 'Id is required' });
    }
	
	if (!req?.body?.title ) {
        return res.status(400).json({ 'message': 'Title is required' });
    }
	
	if (!req?.body?.category ) {
        return res.status(400).json({ 'message': 'Category is required' });
    }
	
    try {
        const result = await Content.create({
            title: req.body.id,
            category: req.body.category,
            duration: req.body.duration,
            origin: req.body.origin,
            genre: req.body.genre
        });

        res.status(201).json(result);
    } catch (err) {
        console.error(err);
    }
}

const updateContent = async (req, res) => {
    if (!req?.body?.id) {
        return res.status(400).json({ 'message': 'ID parameter is required.' });
    }

    const content = await Content.findOne({ _id: req.body.id }).exec();
    if (!content) {
        return res.status(204).json({ "message": `No content matches ID ${req.body.id}.` });
    }
    if (req.body?.title) content.title = req.body.title;
    if (req.body?.category) content.category = req.body.category;
	if (req.body?.duration) content.duration = req.body.duration;
	if (req.body?.origin) content.origin = req.body.origin;
	if (req.body?.genre) content.genre = req.body.genre;
    const result = await content.save();
    res.json(result);
}

const deleteContent = async (req, res) => {
    if (!req?.body?.id) return res.status(400).json({ 'message': 'Content ID required.' });

    const content = await Content.findOne({ _id: req.body.id }).exec();
    if (!content) {
        return res.status(204).json({ "message": `No content matches ID ${req.body.id}.` });
    }
    const result = await content.deleteOne(); //{ _id: req.body.id }
    res.json(result);
}

const getContent = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ 'message': 'Content ID required.' });

    const content = await Content.findOne({ _id: req.params.id }).exec();
    if (!content) {
        return res.status(204).json({ "message": `No content matches ID ${req.params.id}.` });
    }
    res.json(content);
}

module.exports = {
    getAllContents,
    createNewContent,
    updateContent,
    deleteContent,
    getContent
}