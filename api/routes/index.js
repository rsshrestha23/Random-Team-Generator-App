import express from 'express';
import * as playerController from '../controllers/playerController.js';
import * as teamController from '../controllers/teamController.js';

const router = express.Router();

router.post('/players', playerController.addPlayer);
router.put('/players/:id', playerController.editPlayer);
router.delete('/players/:id', playerController.deletePlayer);
router.get('/players', playerController.getPlayers);

router.post('/teams', teamController.addTeam);
router.put('/teams/:id', teamController.editTeam);
router.delete('/teams/:id', teamController.deleteTeam);
router.get('/teams',teamController.getAllTeams)
router.post('/generate-teams', teamController.generateTeams);
router.get('/generate-teams', teamController.getGeneratedTeams)

export default router;
