const { response } = require("express");
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/blog");
const { render } = require("ejs");

// express app
const app = express();

const dbURI =
  "mongodb+srv://shahriar:1qaz2wsx@ninjsblogs.dwu04wd.mongodb.net/blog-ninja?retryWrites=true&w=majority";

mongoose
  .connect(dbURI)
  .then((result) => {
    //listen request
    app.listen(3000, () => console.log("server started"));
  })
  .catch((err) => {
    console.error(err);
  });

// register view engine ejs - lly letting it know that we are using ejs
app.set("view engine", "ejs");
// app.set('views', 'myviews'); --- this line is needed when we want to store view files in other directory than view.

// middleware and static files (css, images,etc.)
app.use(express.static("public")); // anything in public folder will be accessible from browser
app.use(express.urlencoded({ extended: true })); // parse the url encoded data and pass it into a object with the req
app.use(morgan("dev"));

app.get("/", (req, res) => {
  // res.send('<p>home page</p>');
  // res.sendFile('./views/index.html', { root: __dirname }); // second param is to show from where the given relative path starts
  res.redirect("/blogs");
});

//blog routes
app.get("/blogs", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 }) // -1 means descending order
    .then((result) => {
      res.render("index", { title: "All Blogs", blogs: result });
    })
    .catch((err) => {
      console.error(err);
    });
});

app.get("/about", (req, res) => {
  // res.send('<p>about page</p>')
  // res.sendFile('./views/about.html', { root:__dirname });
  res.render("about", { title: "About" });
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create a new Blog" });
});

app.post("/blogs", (req, res) => {
  $blog = new Blog(req.body);
  $blog
    .save()
    .then((result) => {
      res.redirect("/blogs");
    })
    .catch((err) => {
      console.error(err);
    });
});

app.get("/blogs/:id", (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then(result => {
      res.render('details', {blog: result, title: 'Blog Details'});
    })
    .catch(err => {
      console.error(err);
    });
});

app.delete("/blogs/:id", (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then(result => {
      res.json({redirect: '/blogs'});
    })
    .catch(err => {
      console.error(err);
    });
});

//redirects
app.get("/about-us", (req, res) => {
  res.redirect("/about");
});

/**
 * 404 page
 * it will fire only if the code comes to this. it will happen if it don't match with any of the routes.
 * position is important. it has to be the last one.
 * use() is for middleware
 */
app.use((req, res) => {
  // res.status(404).sendFile('./views/404.html', { root: __dirname });
  res.status(404).render("404", { title: "404" });
});
