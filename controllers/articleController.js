const Article = require("../models/Article");

// جميع المقالات (من الأحدث إلى الأقدم)
exports.getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// مقالات حسب التصنيف
exports.getArticlesByCategory = async (req, res) => {
  try {
    const articles = await Article.find({ category: req.params.category }).sort({ createdAt: -1 });
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createArticle = async (req, res) => {
  const { title, content, category } = req.body;
  try {
    const article = new Article({ title, content, category });
    await article.save();
    res.status(201).json(article);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.updateArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!article) return res.status(404).json({ message: "لم يتم العثور على المقال" });
    res.json(article);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.deleteArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);
    if (!article) return res.status(404).json({ message: "لم يتم العثور على المقال" });
    res.json({ message: "تم حذف المقال" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


