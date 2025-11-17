import mongoose from "mongoose";

const patientSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },      // اسم المريض
    personId: { type: String, required: true },      // رقم الهوية
    birthYear: { type: String, required: true },     // سنة الميلاد (YYYY)
    mobileNo: { type: String, required: true },      // رقم الجوال

    // حقول إضافية علشان نقدر نقلّد صفحة صحتي في الرسائل:
    status: {
      type: String,
      default: "تحت الاجراء"
    }, // مثل: "معتمد" - "تحت الاجراء"
    travelStatus: {
      type: Number,
      default: 0
    }, // 25 = تم السفر
    returnReason: { type: String }, // لو الحالة "معتمد (سبب الإرجاع)"
    categoryId: {
      type: String,
      default: "1"
    }, // 4 = متابعة محلية, 6 = لا يوجد تحويلة
    internalStatusCode: {
      type: Number,
      default: 1
    } // نفس الحقل item.status المستخدم في الكود الأصلي
  },
  { timestamps: true }
);

export const Patient = mongoose.model("Patient", patientSchema);
