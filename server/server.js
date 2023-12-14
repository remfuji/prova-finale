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
    segnalazioni: [{ 
      nome: String,
      tipologia: String,
      descrizione: String,
    }],
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
app.post('/insert-segnalazione', async (req, res) => {
  const { username, nome, tipologia, descrizione } = req.body;

  try {
    // Cerca l'utente nel database MongoDB
    const user = await User.findOne({ username });

    if (user) {
      // Crea una nuova segnalazione
      const newSegnalazione = {
        nome,
        tipologia,
        descrizione,
      };

      // Aggiungi la nuova segnalazione all'array segnalazioni dell'utente
      user.segnalazioni.push(newSegnalazione);
      await user.save();

      res.status(200).json({ message: 'Segnalazione inserita con successo e associata all\'utente' });
    } else {
      // Utente non trovato
      res.status(404).json({ message: 'Utente non trovato' });
    }
  } catch (error) {
    console.error('Errore durante l\'inserimento della segnalazione:', error);
    res.status(500).json({ message: 'Errore durante l\'inserimento della segnalazione. Si prega di riprovare più tardi.' });
  }
});

app.get('/get-segnalazioni', async (req, res) => {
  const { username } = req.query;
  console.log('Username ricevuto:', username);

  try {
    const user = await User.findOne({ username });
    if (user) {
      res.status(200).json({ segnalazioni: user.segnalazioni });
    } else {
      res.status(404).json({ message: 'Utente non trovato' });
    }
  } catch (error) {
    console.error('Errore durante il recupero delle segnalazioni:', error);
    res.status(500).json({ message: 'Errore durante il recupero delle segnalazioni. Si prega di riprovare più tardi.' });
  }
});
app.get('/all-segnalazioni', async (req, res) => {
  try {
    // Cerca tutti gli utenti e restituisci solo le loro segnalazioni
    const users = await User.find().select('segnalazioni -_id');
    let allSegnalazioni = [];

    // Estrai tutte le segnalazioni da ogni utente
    users.forEach(user => {
      allSegnalazioni = allSegnalazioni.concat(user.segnalazioni);
    });

    res.status(200).json({ segnalazioni: allSegnalazioni });
  } catch (error) {
    console.error('Errore durante il recupero delle segnalazioni:', error);
    res.status(500).json({ message: 'Errore durante il recupero delle segnalazioni. Si prega di riprovare più tardi.' });
  }
});

app.delete('/delete-segnalazione/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await User.updateOne(
      {},
      { $pull: { segnalazioni: { _id: id } } },
      { multi: true }
    );
    res.status(200).json({ message: 'Segnalazione cancellata con successo' });
  } catch (error) {
    console.error('Errore durante la cancellazione della segnalazione:', error);
    res.status(500).json({ message: 'Errore durante la cancellazione della segnalazione.' });
  }
});
app.put('/update-segnalazione/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, tipologia, descrizione } = req.body;

  try {
    await User.updateOne(
      { "segnalazioni._id": id },
      { 
        "$set": {
          "segnalazioni.$.nome": nome,
          "segnalazioni.$.tipologia": tipologia,
          "segnalazioni.$.descrizione": descrizione
        }
      }
    );
    res.status(200).json({ message: 'Segnalazione aggiornata con successo' });
  } catch (error) {
    console.error('Errore durante l\'aggiornamento della segnalazione:', error);
    res.status(500).json({ message: 'Errore durante l\'aggiornamento della segnalazione.' });
  }
});







