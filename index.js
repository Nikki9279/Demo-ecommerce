const express = require('express');
const app = express();
const compression = require('compression');
const path = require('path');
const fetch = require('node-fetch');
const template = require('./views/template');

// Compress
app.use(compression());

// Serving static files
app.use('/assets', express.static(path.resolve(__dirname, 'assets')));
app.use('/media', express.static(path.resolve(__dirname, 'media')));

// hide powered by express
app.disable('x-powered-by');
// start the server
app.listen(process.env.PORT || 4000, () => console.log('> Listening on port 4000...'));

// app data model
const initialSettings = require('./initialSettings.json');

const ssr = require('./views/server');

// server rendered product page
app.get('/product/:id', (req, res) => {

  fetch(`https://api.myjson.com/bins/6ch17`) // fetch json
  .then(res => res.json())
  .then(data => {
    initialSettings.details['product'] = data[req.params.id - 1]; // grabbing the target object
    // rest of your code
    const initialState = Object.assign({}, initialSettings);
    const { preloadedState, content}  = ssr(req, res, initialState);
    const response = template(`${initialSettings.details['product'].name} |Ecommerce Demo`, preloadedState, content);
    res.setHeader('Cache-Control', 'assets, max-age=604800');
    res.send(response);
  })
  .catch(err => {
    console.log(err);
  });
})

// server rendered list page
app.get('/', (req, res) => {

    fetch('https://api.myjson.com/bins/6ch17')
        .then(res => res.json())
        .then(data => {
            const initialState = Object.assign({},
                {
                    products: {
                        items: data,
                        isFetching: false
                    }
                }, initialSettings);
            const { preloadedState, content}  = ssr(req, res, initialState);
            const response = template('Ecommerce Demo', preloadedState, content);
            res.setHeader('Cache-Control', 'assets, max-age=604800');
            res.send(response);
        })
        .catch(err => {
            console.log(err);
        });

});
