const express = require("express");
const router = express.Router();

const blogController = require("../controllers/blogController");
const upload = require("../config/multer");

router.get("/", blogController.getAllBlogs);
router.get("/new", blogController.getNewForm);

router.post("/blogs", upload.single("image"), blogController.createBlog);

router.get("/blogs/:id", blogController.getSingleBlog);
router.get("/blogs/:id/edit", blogController.getEditForm);

router
  .route("/blogs/:id")
  .put(upload.single("image"), blogController.updateBlog)
  .delete(blogController.deleteBlog);

module.exports = router;
