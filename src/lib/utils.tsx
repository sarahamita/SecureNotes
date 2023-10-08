import CryptoJS from 'react-native-crypto-js';

export const generateRandomString = (length) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  return result;
}

export const encryptionKey = CryptoJS.lib.WordArray.random(256 / 8).toString();

export const encrypt = (value) => CryptoJS.AES.encrypt(value, encryptionKey).toString();

export const decrypt = async (encryptedValue) => await CryptoJS.AES.decrypt(encryptedValue, encryptionKey).toString(CryptoJS.enc.Utf8);
