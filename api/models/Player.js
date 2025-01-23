import mongoose from 'mongoose';

const playerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    skill: { type: Number, required: true, min: 1, max: 5 }
});

export default mongoose.model('Player', playerSchema);
