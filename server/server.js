const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
const dbURI = 'mongodb+srv://richi:123@earthguardian.rtv7vbw.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(dbURI)
  .then(() => {
    console.log('Connected to MongoDB Atlas');
    app.listen(3001, () => console.log('Server is running on port 3001'));
  })
  .catch((err) => console.error(err));

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

app.post('/verifica-utente', async (req, res) => {
  const { username } = req.body;

  try {
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      res.status(409).json({ message: 'Utente già esistente' });
    } else {
      res.status(200).json({ message: 'Utente non trovato' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Errore durante la verifica dell\'utente' });
  }
});

app.post('/registrati', async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      res.status(409).json({ message: 'Utente già esistente. Impossibile effettuare la registrazione.' });
    } else {
      const newUser = new User({
        username: username,
        password: password,
      });

      await newUser.save();
      console.log('Registrazione avvenuta con successo!');
      res.status(201).json({ message: 'Registrazione avvenuta con successo' });
    }
  } catch (error) {
    console.error('Errore durante la registrazione:', error);
    res.status(500).json({ message: 'Errore durante la registrazione' });
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username, password });

    if (user) {
      res.status(200).json({ message: 'Login avvenuto con successo!' });
    } else {
      res.status(401).json({ message: 'Credenziali non valide. Il login ha fallito.' });
    }
  } catch (error) {
    console.error('Errore durante il login:', error);
    res.status(500).json({ message: 'Errore durante il login. Si prega di riprovare più tardi.' });
  }
});

app.get('/get-user-details', async (req, res) => {
  const { username } = req.query;

  try {
    // Cerca l'utente nel database MongoDB e restituisci i dettagli
    const user = await User.findOne({ username });

    if (user) {
      // Trovato l'utente, restituisci i dettagli
      res.status(200).json({ userDetails: { username: user.username } });
    } else {
      // Utente non trovato
      res.status(404).json({ message: 'Utente non trovato' });
    }
  } catch (error) {
    // Errore durante la ricerca dell'utente nel database
    console.error('Errore durante il recupero dei dettagli dell\'utente:', error);
    res.status(500).json({ message: 'Errore durante il recupero dei dettagli dell\'utente. Si prega di riprovare più tardi.' });
  }
});
