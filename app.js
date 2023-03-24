const { response } = require('express');
const express = require('express');

// express app
const app = express();

// register view engine ejs - lly letting it know that we are using ejs
app.set('view engine','ejs');
// app.set('views', 'myviews'); --- this line is needed when we want to store view files in other directory than view.

//listen request
app.listen(3000, () => console.log('server started'));

app.get('/', (req, res) => {
    // res.send('<p>home page</p>');
    // res.sendFile('./views/index.html', { root: __dirname }); // second param is to show from where the given relative path starts
    const blogs = [
        {title: 'Naruto finds eggs', snippet: 'Lorem ipsum, dolor sit amet consectetur'},
        {title: 'Sasuke Finds stars', snippet: 'Lorem ipsum, dolor sit amet consectetur'},
        {title: 'How to defeat Fire Farting Dragon', snippet: 'Lorem ipsum, dolor sit amet consectetur'}
    ];
    res.render('index', { title: 'Home', blogs });
});

app.get('/about', (req, res) => {
    // res.send('<p>about page</p>')
    // res.sendFile('./views/about.html', { root:__dirname });
    res.render('about', { title: 'About' });
});

//redirects
app.get('/about-us', (req, res) => {
    res.redirect('/about');
});

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a new Blog' });
});

/**
 * 404 page
 * it will fire only if the code comes to this. it will happen if it don't match with any of the routes.
 * position is important. it has to be the last one.
 * use() is for middleware
 */
app.use((req, res) => {
    // res.status(404).sendFile('./views/404.html', { root: __dirname });
    res.status(404).render('404', { title: '404' });
});
