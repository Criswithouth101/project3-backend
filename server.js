const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const logger = require('morgan');

const app = express();
app.use(cors());
app.use(express.json());
app.use(logger('dev'));

console.log('Mongo URI:', process.env.MONGO_URI);
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=>console.log('MongoDB connected'))
  .catch(err=>console.error(err));

app.get('/', (req, res) => {
  res.send(' API is running');
});
app.use('/api/insights', require('./routes/insights'));
app.use('/api/auth', require('./routes/auth')); 
//app.use('/api/companies', require('./routes/companies'));
//app.use('/api/sectors', require('./routes/sectors')); //strech goal


app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || 'Server Error' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=>console.log(`Server listening on ${PORT}`));

