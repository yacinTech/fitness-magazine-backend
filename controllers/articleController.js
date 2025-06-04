const Article = require("../models/Article");
const cloudinary = require("../config/cloudinary");

// جميع المقالات (من الأحدث إلى الأقدم)
exports.getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// مقال حسب المعرف (ID)
exports.getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: "لم يتم العثور على المقال" });
    }
    res.json(article);
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
  let imageUrl = null;

  if (req.file) {
    // إذا تم تحميل صورة
    imageUrl = req.file.path; // هذا هو رابط الصورة المخزن في Cloudinary
  }

  try {
    const article = new Article({
      title,
      content,
      category,
      image: imageUrl, // حفظ الرابط في MongoDB
    });

    await article.save(); // حفظ المقال
    res.status(201).json(article); // إرسال المقال الذي تم حفظه
  } catch (error) {
    console.error("❌ Error creating article:", error);
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


