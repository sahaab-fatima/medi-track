const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/meditrack')
.then(() => {
  console.log('Connected');
  mongoose.connection.close();
})
.catch(err => {
  console.log('Error:', err);
});