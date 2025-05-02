const Subscription = require("../models/Subscription");

exports.subscribe = async (req, res) => {
  const { fullName, email } = req.body;

  if (!fullName || !email) {
    return res.status(400).json({ message: "الاسم والبريد الإلكتروني مطلوبان" });
  }

  try {
    const existing = await Subscription.findOne({ email });
    if (existing) return res.status(400).json({ message: "أنت مشترك بالفعل" });

    const newSub = new Subscription({ fullName, email });
    await newSub.save();
    res.status(201).json({ message: "تم الاشتراك بنجاح" });
  } catch (error) {
    res.status(500).json({ message: "حدث خطأ، حاول لاحقًا" });
  }
};





// جلب كل المشتركين
exports.getAllSubscribers = async (req, res) => {
  try {
    const subscribers = await Subscription.find().sort({ subscribedAt: -1 });
    res.json(subscribers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
