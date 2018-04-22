import crypto from 'crypto';

export const aesEncrypt = (content) => {
  const cipher = crypto.createCipher('aes192', 'a password');
  let encryptedContent = cipher.update(content, 'utf8', 'hex');
  encryptedContent += cipher.final('hex');

  return encryptedContent;
};

export const aesDecrypt = (encryptedContent) => {
  const decipher = crypto.createDecipher('aes192', 'a password');
  let decrypted = decipher.update(encryptedContent, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
};
