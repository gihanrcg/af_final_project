const express = require('express');
const mongoose = require('mongoose');
const BodyParser = require('body-parser');
const path = require('path');

const userRoutes = require('./server/gihan/routes/api/UserRoute');

const app = express();
app.use(BodyParser.json());

const db = require('./config/keys').mongoURI;
app.use('/api/users', userRoutes);

mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log("Mongo database connected"))
    .catch(err => console.log(err));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendfile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}


const port = process.env.PORT || 5000;

app.listen(port, () => console.log('Server is listening on port ' + port));
