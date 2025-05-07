const express = require("express");
const router = express.Router();
const articleController = require("../controllers/articleController");
const upload = require("../middlewares/upload");

router.get("/", articleController.getAllArticles);
router.get("/category/:category", articleController.getArticlesByCategory);

router.post("/", upload.single("image"), articleController.createArticle);

router.put("/:id", articleController.updateArticle);

router.delete("/:id", articleController.deleteArticle);




module.exports = router;
