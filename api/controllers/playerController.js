import Player from '../models/Player.js';

export const addPlayer = async (req, res) => {
    const player = new Player(req.body);
    await player.save();
    res.status(201).send(player);
};

export const editPlayer = async (req, res) => {
    const player = await Player.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(player);
};

export const deletePlayer = async (req, res) => {
    await Player.findByIdAndDelete(req.params.id);
    res.status(204).send();
};

export const getPlayers = async (req, res) => {
    const players = await Player.find();
    res.send(players);
};
