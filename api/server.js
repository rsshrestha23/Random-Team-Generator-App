import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import routes from './routes/index.js';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());
app.use('/api', routes);

mongoose.connect('mongodb+srv://testuser:yngZDBPbgfJNINfY@randomplayergenerator1.jtd2p.mongodb.net/?retryWrites=true&w=majority&appName=RandomPlayerGenerator1', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
    .catch(err => console.error(err));
