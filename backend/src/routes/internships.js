const express = require('express');
const Internship = require('../models/Internship');
const auth = require('../middleware/auth');
const router = express.Router();

// Create
router.post('/', auth, async (req, res) => {
  try {
    const data = { ...req.body, user: req.user.id };
    const internship = new Internship(data);
    await internship.save();
    res.json(internship);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Read all for user
router.get('/', auth, async (req, res) => {
  try {
    const list = await Internship.find({ user: req.user.id }).sort({ reminderDate: 1 });
    res.json(list);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Read single
router.get('/:id', auth, async (req, res) => {
  try {
    const item = await Internship.findById(req.params.id);
    if (!item) return res.status(404).json({ msg: 'Not found' });
    if (item.user.toString() !== req.user.id) return res.status(403).json({ msg: 'Forbidden' });
    res.json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Update
router.put('/:id', auth, async (req, res) => {
  try {
    const item = await Internship.findById(req.params.id);
    if (!item) return res.status(404).json({ msg: 'Not found' });
    if (item.user.toString() !== req.user.id) return res.status(403).json({ msg: 'Forbidden' });
    Object.assign(item, req.body);
    await item.save();
    res.json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Delete
router.delete('/:id', auth, async (req, res) => {
  try {
    const item = await Internship.findById(req.params.id);
    if (!item) return res.status(404).json({ msg: 'Not found' });
    if (item.user.toString() !== req.user.id) return res.status(403).json({ msg: 'Forbidden' });
    await item.deleteOne();
    res.json({ msg: 'Deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;