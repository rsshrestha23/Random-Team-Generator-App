import mongoose from 'mongoose';
import Player from './models/Player.js';
import Team from './models/Team.js';

const players = [
    { name: 'Sujan Shrestha', skill: 5 },
    { name: 'Nisha Maharjan', skill: 4 },
    { name: 'Bikash Shrestha', skill: 3 },
    { name: 'Rina Shrestha', skill: 2 },
    { name: 'Pratik Shrestha', skill: 1 },
    { name: 'Anisha Tamang', skill: 5 },
    { name: 'Manoj Shrestha', skill: 3 },
    { name: 'Puja Shrestha', skill: 4 },
    { name: 'Sanjay Manandhar', skill: 2 },
    { name: 'Kriti Shrestha', skill: 1 }
];

const teams = [
    { name: 'Team A' },
    { name: 'Team B' }
];

const seedDatabase = async () => {
    try {
        await mongoose.connect('mongodb+srv://testuser:yngZDBPbgfJNINfY@randomplayergenerator1.jtd2p.mongodb.net/?retryWrites=true&w=majority&appName=RandomPlayerGenerator1', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        // Clear existing data
        await Player.deleteMany({});
        await Team.deleteMany({});

        // Seed players
        const createdPlayers = await Player.insertMany(players);
        console.log('Players seeded:', createdPlayers);

        // Seed teams
        const createdTeams = await Team.insertMany(teams);
        console.log('Teams seeded:', createdTeams);

        // Optionally, you can associate players with teams here if needed

    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        mongoose.connection.close();
    }
};

seedDatabase();
