import bcrypt from "bcryptjs";

export async function generateHashPassword(plainTextPassword) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(plainTextPassword, salt);
    return hashedPassword;
  } catch (err) {
    return null;
  }
}

export async function checkHashedPassword(plainTextPassword, hashedPassword) {
  try {
    const isMatch = await bcrypt.compare(plainTextPassword, hashedPassword);
    return isMatch; // Returns true if passwords match, false otherwise
  } catch (err) {
    return false;
  }
}
