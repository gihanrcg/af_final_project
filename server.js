const express = require('express');
const mongoose = require('mongoose');
const BodyParser = require('body-parser');
const path = require('path');
const config = require('config');


const userRoutes = require('./server/gihan/routes/api/UserRoute');
const AuthRoutes = require('./server/gihan/routes/api/Auth');
const FileRoutes=require('./server/nishitha/routes/api/FileUploadRoute');

const app = express();
app.use(BodyParser.json());

const db = config.get('mongoURI');
app.use('/uploads', express.static('uploads'));
app.use('/api/users', userRoutes);
app.use('/api/auth', AuthRoutes);
app.use('/api/files',FileRoutes);

mongoose
    .connect(db, { useNewUrlParser: true, useFindAndModify: false })
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
