const { response } = require('express');
const express = require('express');

// express app
const app = express();

//listen request
app.listen(3000, () => console.log('server started'));

app.get('/', (req, res) => {
    // res.send('<p>home page</p>');
    res.sendFile('./views/index.html', { root: __dirname }); // second param is to show from where the given relative path starts
});

app.get('/about', (req, res) => {
    // res.send('<p>about page</p>')
    res.sendFile('./views/about.html', { root:__dirname });
});

//redirects
app.get('/about-us', (req, res) => {
    res.redirect('/about');
});

/**
 * 404 page
 * it will fire only if the code comes to this. it will happen if it don't match with any of the routes.
 * position is important. it has to be the last one.
 */
app.use((req, res) => {
    res.status(404).sendFile('./views/404.html', { root: __dirname });
});
