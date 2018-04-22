import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import lodash from 'lodash';
import {
  aesDecrypt,
  aesEncrypt,
} from './server/utils';
import ipfs from './server/ipfs';

const app = express();

app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
const port = process.env.PORT || 5000;

app.post('/api/tracks/encrypt', (req, res) => {
  console.log(req.body);
  const tracks = lodash.cloneDeep(req.body);
  tracks.forEach((track) => {
    console.log(typeof track.mp3);
  });

  res.code(200).send(tracks);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
//
// app.get('/api/hello', (req, res) => {
//   const mockCollection = {
//     img: 'some img buffer',
//     tracks: [{ track: 'track1', mp3: aesEncrypt('some encrypted mp3 1') },
//       { track: 'track2', mp3: aesEncrypt('some  encrypted mp3 2') }]
//   };
//
//   const jsonCollectionToBuffer = Buffer.from(JSON.stringify(mockCollection));
//
//   ipfs.files.add({ path: '', content: jsonCollectionToBuffer })
//     .then((result) => {
//       const [onlyResult] = result;
//       return ipfs.files.get(onlyResult.path);
//     })
//     .then((jsonBuffer) => {
//       const inIpfs = JSON.parse(jsonBuffer[0].content.toString('utf8'));
//       console.log(inIpfs);
//       const returned = {
//         img: inIpfs.img,
//         tracks: inIpfs.tracks.map((encryptedTrack) => aesDecrypt(encryptedTrack))
//       };
//       res.send({ inIpfs, returned });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.send({ express: err });
//     });
// });
