import express from 'express';
import crypto from 'crypto';
import ipfs from './ipfs';

const app = express();
const port = process.env.PORT || 5000;

const aesEncrypt = (content) => {
  const cipher = crypto.createCipher('aes192', 'a password');
  let encryptedContent = cipher.update(content, 'utf8', 'hex');
  encryptedContent += cipher.final('hex');

  return encryptedContent;
};

const aesDecrypt = (encryptedContent) => {
  const decipher = crypto.createDecipher('aes192', 'a password');
  let decrypted = decipher.update(encryptedContent, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
};

app.get('/api/hello', (req, res) => {
  const mockCollection = {
    img: 'some img buffer',
    tracks: [aesEncrypt('some encrypted mp3 1'), aesEncrypt('some  encrypted mp3 2')]
  };

  const jsonCollectionToBuffer = Buffer.from(JSON.stringify(mockCollection));

  ipfs.files.add({ path: '', content: jsonCollectionToBuffer })
    .then((result) => {
      const [onlyResult] = result;
      return ipfs.files.get(onlyResult.path);
    })
    .then((jsonBuffer) => {
      const inIpfs = JSON.parse(jsonBuffer[0].content.toString('utf8'));
      console.log(inIpfs);
      const returned = {
        img: inIpfs.img,
        tracks: inIpfs.tracks.map((encryptedTrack) => aesDecrypt(encryptedTrack))
      };
      res.send({ inIpfs, returned });
    })
    .catch((err) => {
      console.log(err);
      res.send({ express: err });
    });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
