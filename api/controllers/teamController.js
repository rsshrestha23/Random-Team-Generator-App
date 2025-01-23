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

let generatedTeams = []; // This will store the generated teams in memory
let generatedTitles = new Set(); // Set to store unique titles

export const generateTeams = async (req, res) => {
    const { title } = req.body; // Extract title from request body

    // Check if the title is unique
    if (generatedTitles.has(title)) {
        return res.status(400).json({ message: "Title must be unique. Please provide a different title." });
    }

    const players = await Player.find(); // Fetch all players

    // Sort players by skill level in descending order
    players.sort((a, b) => b.skill - a.skill);

    const numberOfTeams = 2; // You can modify this based on your requirements
    generatedTeams = Array.from({ length: numberOfTeams }, (_, i) => ({ name: `Team ${i + 1}`, players: [] }));

    // Distribute players into teams
    players.forEach((player, index) => {
        generatedTeams[index % numberOfTeams].players.push(player);
    });

    // Store the title in the set
    generatedTitles.add(title);

    res.status(200).json({ title, teams: generatedTeams });
};

export const getGeneratedTeams = (req, res) => {
    if (generatedTeams.length === 0) {
        return res.status(404).json({ message: "No teams have been generated yet." });
    }

    res.status(200).json({ teams: generatedTeams });
};