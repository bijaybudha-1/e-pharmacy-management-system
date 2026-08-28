import { randomBytes } from "node:crypto";
import bcrypt from "bcrypt";

const generateTemporaryToken = async () => {
  const unHashedToken = randomBytes(20).toString("hex");
  const hashedToken = await bcrypt.hash(unHashedToken, 10);
  const tokenExpiry = new Date(Date.now() + 20 * 60 * 1000); // 20min

  return { unHashedToken, hashedToken, tokenExpiry };
};

export { generateTemporaryToken };
