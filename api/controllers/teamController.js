import Team from '../models/Team.js';
import Player from '../models/Player.js';

export const addTeam = async (req, res) => {
    const team = new Team(req.body);
    await team.save();
    res.status(201).send(team);
};

export const editTeam = async (req, res) => {
    const team = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(team);
};

export const deleteTeam = async (req, res) => {
    await Team.findByIdAndDelete(req.params.id);
    res.status(204).send();
};

export const getAllTeams = async (req, res) => {
    const teams = await Team.find();
    res.send(teams);
};


// Store generated teams with their IDs and data
const generatedTeamsStore = new Map();

export const generateTeams = async (req, res) => {
    try {
        const { title } = req.body;
        const players = await Player.find();

        if (!players.length) {
            return res.status(400).json({ message: "No players available to generate teams" });
        }

        // Sort players by skill level in descending order
        players.sort((a, b) => b.skill - a.skill);

        const numberOfTeams = 2;
        const teams = Array.from({ length: numberOfTeams }, (_, i) => ({ 
            name: `Team ${i + 1}`, 
            players: [] 
        }));

        // Distribute players into teams using snake draft method
        players.forEach((player, index) => {
            const teamIndex = index % numberOfTeams;
            teams[teamIndex].players.push({
                name: player.name,
                skill: player.skill
            });
        });

        // Generate a unique ID
        const generationId = Math.floor(Math.random() * 100000000).toString();

        // Store the generated teams with their data
        const generationData = {
            id: generationId,
            title: title || 'Generated Teams',
            teams,
            createdAt: new Date().toISOString()
        };

        generatedTeamsStore.set(generationId, generationData);

        // === LOGGING SOLUTIONS ===
        
        // Option 1: Convert Map to an array of key-value pairs and log it
        console.log('@__-generationData (Array):', Array.from(generatedTeamsStore.entries()));

        // Option 2: Use forEach to log each key and value
        generatedTeamsStore.forEach((value, key) => {
            console.log(`Key: ${key}`, 'Value:', value);
        });

        // Option 3: Convert Map to an Object and log it as JSON
        console.log('@__-generationData (JSON):', JSON.stringify(Object.fromEntries(generatedTeamsStore), null, 2));

        // Option 4: Use console.dir for a structured log
        console.dir(generatedTeamsStore, { depth: null });

        res.status(200).json({
            ...generationData,
            publicLink: `http://localhost:5173/shared/${generationId}`
        });
    } catch (error) {
        console.error('Error generating teams:', error);
        res.status(500).json({ message: "Error generating teams" });
    }
};

export const getGeneratedTeams = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("@__id",id)

        if (!id) {
            return res.status(400).json({ message: "Generation ID is required" });
        }

        const generationData = generatedTeamsStore.get(id);

        if (!generationData) {
            return res.status(404).json({ message: "Generated teams not found" });
        }

        res.status(200).json(generationData);
    } catch (error) {
        console.error('Error getting generated teams:', error);
        res.status(500).json({ message: "Error retrieving generated teams" });
    }
};

export const getAllGeneratedTeams = async (req, res) => {
    try {
        const allGenerations = Array.from(generatedTeamsStore.values());
        
        if (allGenerations.length === 0) {
            return res.status(404).json({ message: "No teams have been generated yet." });
        }

        res.status(200).json(allGenerations);
    } catch (error) {
        console.error('Error getting all generated teams:', error);
        res.status(500).json({ message: "Error retrieving all generated teams" });
    }
};