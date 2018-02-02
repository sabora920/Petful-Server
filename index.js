const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const {PORT, CLIENT_ORIGIN} = require('./config');
const {dbConnect} = require('./db-mongoose');
// const {dbConnect} = require('./db-knex');

const cats = [
    {
    imageURL:'https://assets3.thrillist.com/v1/image/2622128/size/tmg-slideshow_l.jpg',
    imageDescription: 'Orange bengal cat with black stripes lounging on concrete.',
    name: 'Fluffy',
    sex: 'Female',
    age: 2,
    breed: 'Bengal',
    story: 'Thrown on the street'
  },
  {
    imageURL:'https://assets3.thrillist.com/v1/image/2622128/size/tmg-slideshow_l.jpg',
    imageDescription: 'Orange bengal cat with black stripes lounging on concrete.',
    name: 'Garfield',
    sex: 'Female',
    age: 3,
    breed: 'Calley Cat',
    story: 'Stray'
  },
  {
    imageURL:'https://assets3.thrillist.com/v1/image/2622128/size/tmg-slideshow_l.jpg',
    imageDescription: 'Orange bengal cat with black stripes lounging on concrete.',
    name: 'Tom',
    sex: 'Male',
    age: 6,
    breed: 'House Cat',
    story: "Wouldn't leave Jerry alone"
  },
]
const dogs = [
    {
        imageURL:'https://assets3.thrillist.com/v1/image/2622128/size/tmg-slideshow_l.jpg',
        imageDescription: 'Orange bengal cat with black stripes lounging on concrete.',
        name: 'Balto',
        sex: 'Male',
        age: 2,
        breed: 'Husky',
        story: 'Retired Sled dog'
      },
      {
        imageURL:'https://assets3.thrillist.com/v1/image/2622128/size/tmg-slideshow_l.jpg',
        imageDescription: 'Orange bengal cat with black stripes lounging on concrete.',
        name: 'Frenchie',
        sex: 'Female',
        age: 4,
        breed: 'French Bulldog',
        story: 'Kids were allergic'
      },
      {
        imageURL:'https://assets3.thrillist.com/v1/image/2622128/size/tmg-slideshow_l.jpg',
        imageDescription: 'Orange bengal cat with black stripes lounging on concrete.',
        name: 'Doggo',
        sex: 'Male',
        age: 5,
        breed: 'German Shepherd',
        story: 'Owner had to move'
      },
      {
        imageURL: 'http://www.dogster.com/wp-content/uploads/2015/05/Cute%20dog%20listening%20to%20music%201_1.jpg',
        imageDescription: 'A smiling golden-brown golden retreiver listening to music.',
        name: 'Zeus',
        sex: 'Male',
        age: 3,
        breed: 'Golden Retriever',
        story: 'Owner Passed away'
      },
]

const app = express();

app.use(
    morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev', {
        skip: (req, res) => process.env.NODE_ENV === 'test'
    })
);

app.use(
    cors({
        origin: CLIENT_ORIGIN
    })
);

app.get('/', (req, res) => {
    res.send("hello world!")
})

app.get("/api/cats", (req, res) => { 
        return res.send(cats[0]);
});

app.get("/api/dogs", (req, res) => { 
    return res.send(dogs[0]);
});

app.delete('/api/cats', (req, res) => {
    cats.shift()
    console.log(cats)
    res.end()
})

app.delete('/api/dogs', (req, res) => {
    dogs.shift()
    console.log(dogs)
    res.end()
})

function runServer(port = PORT) {
    const server = app
        .listen(port, () => {
            console.info(`App listening on port ${server.address().port}`);
        })
        .on('error', err => {
            console.error('Express failed to start');
            console.error(err);
        });
}

if (require.main === module) {
    // dbConnect();
    runServer();
}

module.exports = {app};
