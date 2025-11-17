import mongoose from "mongoose";
import dotenv from "dotenv";
import { Admin } from "./models/Admin.js";

dotenv.config();

const seedAdmins = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // Create two admin users
    const admins = [
      { username: "admin1", password: "password123" },
      { username: "admin2", password: "password456" }
    ];

    for (const adminData of admins) {
      const existingAdmin = await Admin.findOne({ username: adminData.username });
      if (!existingAdmin) {
        const admin = new Admin(adminData);
        await admin.save();
        console.log(`Admin ${adminData.username} created`);
      } else {
        console.log(`Admin ${adminData.username} already exists`);
      }
    }

    console.log("Seeding completed");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding admins:", error);
    process.exit(1);
  }
};

seedAdmins();
