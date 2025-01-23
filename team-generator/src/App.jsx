import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  Navigate,
} from "react-router-dom";
import { Users, Trophy, Shuffle } from "lucide-react";
import { PlayerForm } from "./components/PlayerManagement/PlayerForm";
import { PlayerList } from "./components/PlayerManagement/PlayerList";
import { TeamForm } from "./components/TeamManagement/TeamForm";
import { TeamList } from "./components/TeamManagement/TeamList";
import { GenerationForm } from "./components/TeamGeneration/GenerationForm";
import { GeneratedTeams } from "./components/TeamGeneration/GeneratedTeams";
import { getPlayers, getTeams } from "./services/api";
import SharedTeams from "./components/SharedTeams";

function App() {
  const [players, setPlayers] = React.useState([]);
  const [teams, setTeams] = React.useState([]);
  const [editingPlayer, setEditingPlayer] = React.useState(null);
  const [editingTeam, setEditingTeam] = React.useState(null);
  const [generatedTeams, setGeneratedTeams] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  const fetchPlayers = async () => {
    const response = await getPlayers();
    setPlayers(response.data);
  };

  const fetchTeams = async () => {
    const response = await getTeams();
    setTeams(response.data);
  };

  React.useEffect(() => {
    setTimeout(() => {
      fetchPlayers();
      fetchTeams();
    }, 2000);
  }, []);

  React.useEffect(() => {
    if (teams.length > 0 && players.length > 0) {
      setLoading(false);
    } else {
      setTimeout(() => {
        setLoading(false);
      }, 50000);
    }
  }, [players, teams]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent"></div>
      </div>
    );
  }

  const NavButton = ({ to, icon: Icon, label }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center px-4 py-2 rounded-md transition-colors ${
          isActive
            ? "bg-indigo-500 text-white"
            : "text-gray-600 hover:bg-gray-100"
        }`
      }
    >
      <Icon className="w-5 h-5 mr-2" />
      {label}
    </NavLink>
  );

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-indigo-900 mb-2">
              Team Generator
            </h1>
            <p className="text-gray-600">Create balanced teams instantly</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <div className="flex justify-center mb-8">
            <nav className="flex space-x-4 bg-white rounded-lg p-2 shadow-md">
              <NavButton to="/players" icon={Users} label="Players" />
              <NavButton to="/teams" icon={Trophy} label="Teams" />
              <NavButton to="/generate" icon={Shuffle} label="Generate" />
            </nav>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl p-6">
            <Routes>
              <Route path="/" element={<Navigate to="/players" replace />} />
              <Route
                path="/players"
                element={
                  <>
                    <PlayerForm
                      onSuccess={fetchPlayers}
                      editingPlayer={editingPlayer}
                      onCancel={() => setEditingPlayer(null)}
                    />
                    <PlayerList
                      players={players}
                      onEdit={setEditingPlayer}
                      onPlayerDeleted={fetchPlayers}
                    />
                  </>
                }
              />
              <Route
                path="/teams"
                element={
                  <>
                    <TeamForm
                      onSuccess={fetchTeams}
                      editingTeam={editingTeam}
                      onCancel={() => setEditingTeam(null)}
                    />
                    <TeamList
                      teams={teams}
                      onEdit={setEditingTeam}
                      onTeamDeleted={fetchTeams}
                    />
                  </>
                }
              />
              <Route
                path="/generate"
                element={
                  <>
                    <GenerationForm
                      teams={teams}
                      players={players}
                      onTeamsGenerated={setGeneratedTeams}
                      activeTab="generate"
                    />
                    {generatedTeams.length > 0 && (
                      <GeneratedTeams teams={generatedTeams} />
                    )}
                  </>
                }
              />
              <Route path="/shared/:id" element={<SharedTeams />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
