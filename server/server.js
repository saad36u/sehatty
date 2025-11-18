import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { Patient } from "./models/Patient.js";
import { Admin } from "./models/Admin.js";

dotenv.config();

const app = express();
app.use(cors({
  origin: process.env.CLIENT_URL || "*",
  credentials: true
}));

app.use(express.json());

// اتصال MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// 🔹 API: بحث عن تحويلة (نفس فكرة /get_search_result)
app.get("/api/search", async (req, res) => {
  try {
    const { personid, DOB } = req.query;

    if (!personid || !DOB) {
      return res.json({
        success: 0,
        message: "يرجى إدخال رقم الهوية وسنة الميلاد",
      });
    }

    const patients = await Patient.find({
      personId: personid,
      birthYear: DOB,
    });

    if (!patients || patients.length === 0) {
      return res.json({
        success: 2,
        message: "لا يوجد تحويلة عالنظام",
      });
    }

    // تحويل النتائج إلى نفس شكل jsObj.transfers في النظام الأصلي:
    const transfers = patients.map((p) => ({
      FULL_NAME: p.fullName,
      MOBILE_NO: p.mobileNo,
      STATUS: p.status,
      TRAVEL_STATUS: p.travelStatus,
      RETURN_REASON: p.returnReason,
      CATEGORY_ID: p.categoryId,
      status: p.internalStatusCode,
    }));

    return res.json({
      success: 1,
      transfers,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: 0,
      message: "خطأ في السيرفر",
    });
  }
});

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ message: "Access denied" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET || "secretkey");
    req.admin = verified;
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid token" });
  }
};

// 🔹 Admin Login
app.post("/api/admin/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });
    if (!admin || !(await admin.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { id: admin._id, username: admin.username },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: "1h" }
    );
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// 🔹 Admin API: إضافة مريض (Protected)
app.post("/api/patients", authenticateToken, async (req, res) => {
  try {
    const {
      fullName,
      personId,
      birthYear,
      mobileNo,
      status,
      travelStatus,
      returnReason,
      categoryId,
      internalStatusCode,
    } = req.body;

    const patient = await Patient.create({
      fullName,
      personId,
      birthYear,
      mobileNo,
      status,
      travelStatus,
      returnReason,
      categoryId,
      internalStatusCode,
    });

    res.status(201).json(patient);
  } catch (err) {
    console.error(err);
    res
      .status(400)
      .json({ message: "خطأ في إدخال البيانات", error: err.message });
  }
});

// 🔹 Admin API: عرض جميع المرضى (Protected)
app.get("/api/patients", authenticateToken, async (req, res) => {
  try {
    const patients = await Patient.find().sort({ createdAt: -1 });
    res.json(patients);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "خطأ في جلب البيانات" });
  }
});

// (اختياري) تحديث وحذف (Protected)
app.put("/api/patients/:id", authenticateToken, async (req, res) => {
  try {
    const updated = await Patient.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: "خطأ في التحديث" });
  }
});

app.delete("/api/patients/:id", authenticateToken, async (req, res) => {
  try {
    await Patient.findByIdAndDelete(req.params.id);
    res.json({ message: "تم الحذف بنجاح" });
  } catch (err) {
    res.status(400).json({ message: "خطأ في الحذف" });
  }
});

// تشغيل السيرفر
const PORT = process.env.PORT || 5000;

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve React frontend in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  });
}


app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
