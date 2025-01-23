export const calculateAverageSkill = (teams) => {
    let totalSkill = 0;
    let totalPlayers = 0;

    teams.forEach(team => {
      team.players.forEach(player => {
        totalSkill += player.skill;
        totalPlayers += 1;
      });
    });

    return (totalSkill / totalPlayers).toFixed(2); // Rounded to 2 decimal places
  };