const Crew = require("../models/Crew");

const getAllCrews = async (req, res) => {
    const crews = await Crew.find().populate("content_id");
    if (!crews) return res.status(204).json({ 'message': 'No crews found.' });
    res.json(crews);
}

const createNewCrew = async (req, res) => {
  	if (!req?.body?.first_name || !req?.body?.last_name ) {
        return res.status(400).json({ 'message': 'First and last names are required' });
    }
	

    try {
        const result = await Crew.create({
            first_name: req.body.firstname,
            last_name: req.body.last_name,
            roles: req.body.roles
        });

        res.status(201).json(result);
    } catch (err) {
        console.error(err);
    }
}

const updateCrew = async (req, res) => {
    if (!req?.body?.id) {
        return res.status(400).json({ 'message': 'ID parameter is required.' });
    }

    const crew = await Crew.findOne({ _id: req.body.id }).exec();
    if (!crew) {
        return res.status(204).json({ "message": `No crew matches ID ${req.body.id}.` });
    }
    if (req.body?.first_name) crew.first_name = req.body.first_name;
    if (req.body?.last_name) crew.last_name = req.body.last_name;
	if (req.body?.roles) crew.roles = req.body.roles;
    const result = await crew.save();
    res.json(result);
}

const deleteCrew = async (req, res) => {
    if (!req?.body?.id) return res.status(400).json({ 'message': 'Crew ID required.' });

    const crew = await Crew.findOne({ _id: req.body.id }).exec();
    if (!crew) {
        return res.status(204).json({ "message": `No crew matches ID ${req.body.id}.` });
    }
    const result = await crew.deleteOne(); //{ _id: req.body.id }
    res.json(result);
}

const getCrew = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ 'message': 'Crew ID required.' });

    const crew = await Crew.findOne({ _id: req.params.id }).exec();
    if (!crew) {
        return res.status(204).json({ "message": `No crew matches ID ${req.params.id}.` });
    }
    res.json(crew);
}

module.exports = {
    getAllCrews,
    createNewCrew,
    updateCrew,
    deleteCrew,
    getCrew
}