const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const methodOverride = require('method-override');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');

const app = express();
const PORT = process.env.PORT || 3000;
mongoose.connect('mongodb://localhost:27017/employees_db', {
  useNewUrlParser: true,

  useUnifiedTopology: true})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('layout', 'layouts/main');
app.use('/employees', require('./routes/employees'));
app.get('/', (req, res) => {
  res.redirect('/employees');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 