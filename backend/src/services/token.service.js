import crypto from "node:crypto";

const generateTemporaryToken = () => {
  const unHashedToken = crypto.randomBytes(20).toString("hex");
  const hashedToken = crypto
    .createHash("sha256")
    .update(unHashedToken)
    .digest("hex");

  const tokenExpiry = new Date(Date.now() + 20 * 60 * 1000); // 20min

  return { unHashedToken, hashedToken, tokenExpiry };
};

const getHashedToken = (verificationToken) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(verificationToken)
    .digest("hex");

  return hashedToken;
};
export { generateTemporaryToken, getHashedToken };
