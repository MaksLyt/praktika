// server.js
import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;

app.get('/exercise-image/:id', async (req, res) => {
  const exerciseId = req.params.id;
  const resolution = '180'; // або 360 якщо доступно

  try {
    const response = await axios.get(
      `https://exercisedb.p.rapidapi.com/image`,
      {
        params: { exerciseId, resolution },
        headers: {
          'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
          'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY
        },
        responseType: 'arraybuffer' // важливо, щоб отримати GIF
      }
    );

    res.set('Content-Type', 'image/gif');
    res.send(Buffer.from(response.data, 'binary'));
  } catch (err) {
    res.status(500).send('Error fetching image');
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
