import bcrypt from 'bcryptjs';
import AdminModel from '../models/Admin';

export const seedAdmin = async (): Promise<void> => {
  try {
    // Check if admin already exists
    const existingAdmin = await AdminModel.findOne({ email: process.env.ADMIN_EMAIL });
    if (existingAdmin) {
      console.log('Admin already exists');
      return;
    }

    // Create a new admin with hashed password
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD as string, 10);

    const newAdmin = new AdminModel({
      email: process.env.ADMIN_EMAIL,
      password: hashedPassword,
    });

    await newAdmin.save();
    console.log('Admin has been seeded');
  } catch (error) {
    console.error('Error seeding admin:', error);
  }
};
