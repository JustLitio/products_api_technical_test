const masterAPIEndpoint = process.env.masterAPIEndpoint;
const productsAPIEndpoint = process.env.productsAPIEndpoint;
const productsAPIRoute = masterAPIEndpoint + productsAPIEndpoint;
const dbHost = process.env.dbHost;
const dbName = process.env.dbName;
const dbConnectionString = 'mongodb://' + dbHost + '/' + dbName;
const authorizationHeaderContent = 'Bearer ' + process.env.dummy_bearer_token;

const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../app');


const nonExistantProductId = mongoose.Types.ObjectId();
let createdProductId = nonExistantProductId;
const postProductName = "POST product name";
const postProductDescription = "POST product description";
const putProductName = "PUT product name";
const putProductDescription = "PUT product name";
const productPOST = {
    name: postProductName,
    description: postProductDescription
};
const productPUT = {
    name: putProductName,
    description: putProductDescription
};


async function connectToDb() {
    try {
        await mongoose.connect(dbConnectionString);
    } catch (err) {
        console.log('TEST: Failed to connect to database: ' + dbName, err);
        process.exit(1);
    }
}

async function dropDbAndCloseConnection() {
    try {
        await mongoose.connection.db.dropDatabase();
    } catch (err) {
        throw err;
    }
    mongoose.connection.close();
}

function productReturnedIsAsProductPOSTorPUT(productReturned, productPOSTorPUT) {
    expect(productReturned._id).toBeDefined();
    expect(productReturned._id).not.toBeNull();
    expect(productReturned.name).toBe(productPOSTorPUT.name);
    expect(productReturned.description).toBe(productPOSTorPUT.description);
}


beforeAll(() => {
    return connectToDb();
});

afterAll(() => {
    return dropDbAndCloseConnection();
});


describe('GET ' + productsAPIEndpoint, () => {
    test('GET ' + productsAPIEndpoint, (done) => {
        request(app)
            .get(productsAPIRoute)
            .expect(200)
            .expect((res) => {
                res.body.length >= 0;
            })
            .end((err) => {
                if (err) return done(err);
                return done();
            });
    });
});

describe('POST ' + productsAPIEndpoint, () => {
    test('POST ' + productsAPIEndpoint + ' unauthorized', (done) => {
        request(app)
            .post(productsAPIRoute)
            .send(productPOST)
            .expect(401)
            .end((err) => {
                if (err) return done(err);
                return done();
            });
    });


    test('POST ' + productsAPIEndpoint + ' authorized', (done) => {
        request(app)
            .post(productsAPIRoute)
            .set('Authorization', authorizationHeaderContent)
            .send(productPOST)
            .expect(200)
            .expect(res => expect(productReturnedIsAsProductPOSTorPUT(res.body, productPOST)))
            .end((err, res) => {
                if (err) return done(err);                    
                createdProductId = res.body._id;
                return done();
            });
    });

    test('POST ' + productsAPIEndpoint + ' that does not have product name', (done) => {
        request(app)
            .post(productsAPIRoute)
            .set('Authorization', authorizationHeaderContent)
            .send({
                description: postProductDescription
            })
            .expect(400)
            .end((err) => {
                if (err) return done(err);
                return done();
            });
    });
});

describe('GET ' + productsAPIEndpoint + '/:id', () => {
    test('GET ' + productsAPIEndpoint + ' created in previous POST ' + productsAPIEndpoint + ' authorized', (done) => {
        request(app)
            .get(productsAPIRoute + '/' + createdProductId)
            .expect(200)
            .expect(res => expect(productReturnedIsAsProductPOSTorPUT(res.body, productPOST)))
            .end((err) => {
                if (err) return done(err);
                return done();
            });
    });

    test('GET ' + productsAPIEndpoint + ' that does not exist', (done) => {
        request(app)
            .get(productsAPIRoute + '/' + nonExistantProductId)
            .expect(404)
            .end((err) => {
                if (err) return done(err);
                return done();
            });
    });
});

describe('PUT ' + productsAPIEndpoint + '/:id', () => {
    test('PUT ' + productsAPIEndpoint + ' unauthorized', (done) => {
        request(app)
            .put(productsAPIRoute + '/' + createdProductId)
            .send(productPUT)
            .expect(401)
            .end((err) => {
                if (err) return done(err);
                return done();
            });
    });

    test('PUT ' + productsAPIEndpoint + ' created in previous POST ' + productsAPIEndpoint + ' authorized', (done) => {
        request(app)
            .put(productsAPIRoute + '/' + createdProductId)
            .set('Authorization', authorizationHeaderContent)
            .send(productPUT)
            .expect(200)
            .expect(res => expect(productReturnedIsAsProductPOSTorPUT(res.body, productPUT)))
            .end((err) => {
                if (err) return done(err);
                return done();
            });
    });

    test('PUT ' + productsAPIEndpoint + ' that does not exist', (done) => {
        request(app)
            .put(productsAPIRoute + '/' + nonExistantProductId)
            .set('Authorization', authorizationHeaderContent)
            .expect(404)
            .end((err) => {
                if (err) return done(err);
                return done();
            });
    });
});

describe('DELETE ' + productsAPIEndpoint + '/:id', () => {
    test('DELETE ' + productsAPIEndpoint + ' unauthorized', (done) => {
        request(app)
            .delete(productsAPIRoute + '/' + createdProductId)
            .expect(401)
            .end((err) => {
                if (err) return done(err);
                return done();
            });
    });

    test('DELETE ' + productsAPIEndpoint + ' created in previous POST ' + productsAPIEndpoint + ' authorized', (done) => {
        request(app)
            .delete(productsAPIRoute + '/' + createdProductId)
            .set('Authorization', authorizationHeaderContent)
            .expect(200)
            .end((err) => {
                if (err) return done(err);
                return done();
            });
    });

    test('DELETE ' + productsAPIEndpoint + ' that does not exist', (done) => {
        request(app)
            .delete(productsAPIRoute + '/' + nonExistantProductId)
            .set('Authorization', authorizationHeaderContent)
            .expect(404)
            .end((err) => {
                if (err) return done(err);
                return done();
            });
    });
});