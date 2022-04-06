const port = 8000;
const dbHost = process.env.dbHost;
const dbName = process.env.dbName;
const dbConnectionString = 'mongodb://' + dbHost + '/' + dbName;

const mongoose = require('mongoose');
const app = require('./app');


const server = app.listen(
    port,
    () => console.log(`Products API server listening at http://localhost:${port}`)
);

mongoose.connect(dbConnectionString, (err) => {
    if(err) {
        console.log(err);
        server.close(() => {
            console.log('Products API server terminated')
        });
        process.exit(1);
    };

    console.log('Connected to database: ' + dbName);
});