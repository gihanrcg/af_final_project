const express = require('express');
const mongoose = require('mongoose');
const BodyParser = require('body-parser');
const path = require('path');
const config = require('config');

//Initializing Routes to the server
const userRoutes = require('./server/gihan/routes/api/UserRoute');
const AuthRoutes = require('./server/gihan/routes/api/Auth');
const FileRoutes=require('./server/nishitha/routes/api/FileUploadRoute');
const AssignmentRoutes=require('./server/nishitha/routes/api/AssignmentSubmisisonRoutes');
const ModuleRouter=require('./server/moduleManager/ModuleRouter');
//Setting up express app 
const app = express();
app.use(BodyParser.json());

//Assigning routes to urls
app.use('/uploads', express.static('uploads'));
app.use('/api/users', userRoutes);
app.use('/api/auth', AuthRoutes);
app.use('/api/files',FileRoutes);
app.use('/api/assignmentSubmissions',AssignmentRoutes);
app.use('/api/assignmentSubmissions',AssignmentRoutes);
app.use('/api/module',ModuleRouter);

//Creating mongo instance
const db = config.get('mongoURI');
mongoose
    .connect(db, { useNewUrlParser: true, useFindAndModify: false })
    .then(() => console.log("Mongo database connected"))
    .catch(err => console.log(err));


//Setting up port
//Production for hosting server    
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendfile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}


const port = process.env.PORT || 5000;

//starting server
app.listen(port, () => console.log('Server is listening on port ' + port));
