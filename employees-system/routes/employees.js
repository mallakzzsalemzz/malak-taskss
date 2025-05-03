const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');

router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find().sort({ createdAt: -1 });
    res.render('index', { employees });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

router.get('/add', (req, res) => {
  res.render('add');
});

router.post('/', async (req, res) => {
  try {
    const newEmployee = new Employee({
      name: req.body.name,
      address: req.body.address,
      salary: req.body.salary,
      gender: req.body.gender
    });

    await newEmployee.save();
    res.redirect('/employees');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

router.get('/edit/:id', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).send('Employee not found');
    }
    res.render('edit', { employee });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Update employee
router.put('/:id', async (req, res) => {
  try {
    const { name, address, salary, gender } = req.body;
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      { name, address, salary, gender },
      { new: true }
    );
    if (!updatedEmployee) {
      return res.status(404).send('Employee not found');
    }
    res.redirect('/employees');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Delete employee
router.delete('/:id', async (req, res) => {
  try {
    const employee = await Employee.findByIdAndRemove(req.params.id);
    if (!employee) {
      return res.status(404).send('Employee not found');
    }
    res.redirect('/employees');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router; 