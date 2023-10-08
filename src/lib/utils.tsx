import Aes from 'react-native-aes-crypto';
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

export const generateKey = (password, salt, cost, length) => {
  return Aes.pbkdf2(password, salt, cost, length)
}

export const encryptText = (text, key) => {
  return Aes.randomKey(16).then(iv => {
    return Aes.encrypt(text, key, iv, 'aes-256-cbc').then(cipher => ({
      cipher,
      iv,
    }))
  })
}

export const decryptData = (encryptedData, key) => {
  return Aes.decrypt(encryptedData.cipher, key, encryptedData.iv, 'aes-256-cbc')
}


export const encryptNote = (notes, encryptionKey) => {
  console.log('cek notes', notes)
  const encryptedTitle = encryptText(notes.title, encryptionKey);
  const encryptedContent = encryptText(notes.content, encryptionKey);
  console.log('cek notes 2', encryptedTitle)
  console.log('cek notes 3', encryptedContent)

  return { id: notes.id, title: encryptedTitle, content: encryptedContent };
}


// export const encryptNote = (notes, encryptionKey) => {
  
//   console.log('cek notes', notes)
//   const iv = generateRandomString(16);

//   const encryptedTitle = Aes.encrypt(notes.title, encryptionKey, iv, 'aes-256-cbc');
//   const encryptedContent = Aes.encrypt(notes.content, encryptionKey, iv, 'aes-256-cbc');
//   console.log('cek notes 2', encryptedTitle)
//   console.log('cek notes 3', encryptedContent)

//   return { id: notes.id, title: encryptedTitle, content: encryptedContent };
// }


export const encryptionKey = CryptoJS.lib.WordArray.random(256 / 8).toString();

export const encrypt = (value) => CryptoJS.AES.encrypt(value, encryptionKey).toString();

export const decrypt = async (encryptedValue) => await CryptoJS.AES.decrypt(encryptedValue, encryptionKey).toString(CryptoJS.enc.Utf8);
// export const decrypt = async (encryptedValue) => await CryptoJS.AES.decrypt(encryptedValue, encryptionKey).toString(CryptoJS.enc.Utf8);
