const Blog = require("../models/blog");


exports.getAllBlogs = async (req, res) => {
  const blogs = await Blog.find().sort({ createdAt: -1 });
  res.render("index", { blogs });
};


exports.getNewForm = (req, res) => {
  res.render("new");
};


exports.createBlog = async (req, res) => {
  const { title, content, author } = req.body;

  const image = req.file ? req.file.filename : null;

  await Blog.create({
    title,
    content,
    author,
    image,
  });

  res.redirect("/");
};


exports.getSingleBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  res.render("show", { blog });
};


exports.getEditForm = async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  res.render("edit", { blog });
};


exports.updateBlog = async (req, res) => {
  const { title, content, author } = req.body;

  let updateData = { title, content, author };

  if (req.file) {
    updateData.image = req.file.filename;
  }

  await Blog.findByIdAndUpdate(req.params.id, updateData);
  res.redirect("/");
};


exports.deleteBlog = async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.redirect("/");
};
