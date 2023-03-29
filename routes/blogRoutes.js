const express = require("express");
const Blog = require("../models/blog");
const router = express.Router();
const blogController = require("../controllers/blogController");

//blog routes
router.get("/", blogController.blog_index);

router.get("/create", blogController.blog_create_get);

router.post("/", blogController.blog_create_post);

router.get("/:id", blogController.blog_details);

router.delete("/:id", blogController.blog_delete);

module.exports = router;
