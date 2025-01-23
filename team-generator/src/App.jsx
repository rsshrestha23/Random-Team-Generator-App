import React, { useState, useEffect } from "react";
import { Users, Trophy, Shuffle } from "lucide-react";
import { PlayerForm } from "./components/PlayerManagement/PlayerForm";
import { PlayerList } from "./components/PlayerManagement/PlayerList";
import { TeamForm } from "./components/TeamManagement/TeamForm";
import { TeamList } from "./components/TeamManagement/TeamList";
import { GenerationForm } from "./components/TeamGeneration/GenerationForm";
import { GeneratedTeams } from "./components/TeamGeneration/GeneratedTeams";
import { getPlayers, getTeams } from "./services/api";

function App() {
  const [activeTab, setActiveTab] = useState("players");
  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [editingPlayer, setEditingPlayer] = useState(null);
  const [editingTeam, setEditingTeam] = useState(null);
  const [generatedTeams, setGeneratedTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPlayers = async () => {
    const response = await getPlayers();
    setPlayers(response.data);
  };

  useEffect(() => {
    setTimeout(()=>{
      fetchPlayers();
      fetchTeams();
    },2000)
  
  }, []);

  useEffect(() => {
    if (teams.length > 0 && players.length > 0) {
      setLoading(false);
    } else {
      setTimeout(() => {
        setLoading(false);
      }, 50000);
    }
  }, [players,teams]);

  const fetchTeams = async () => {
    const response = await getTeams();
    setTeams(response.data);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
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
            {[
              { id: "players", icon: Users, label: "Players" },
              { id: "teams", icon: Trophy, label: "Teams" },
              { id: "generate", icon: Shuffle, label: "Generate" },
            ].map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                  activeTab === id
                    ? "bg-indigo-500 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Icon className="w-5 h-5 mr-2" />
                {label}
              </button>
            ))}
          </nav>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl p-6">
          {activeTab === "players" && (
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
          )}

          {activeTab === "teams" && (
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
          )}

          {activeTab === "generate" && (
            <>
              <GenerationForm
                teams={teams}
                players={players}
                onTeamsGenerated={setGeneratedTeams}
              />
              {generatedTeams.length > 0 && (
                <GeneratedTeams teams={generatedTeams} />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
