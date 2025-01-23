import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getGeneratedTeamsById } from '../services/api';

 function SharedTeams() {
  const { id } = useParams();
  const [generationData, setGenerationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchGeneratedTeams = async () => {
      try {
        const response = await getGeneratedTeamsById(id);
        setGenerationData(response.data);
      } catch (err) {
        setError('Failed to load teams. They might have expired or been deleted.');
      } finally {
        setLoading(false);
      }
    };

    fetchGeneratedTeams();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 text-red-700 p-4 rounded-lg max-w-md text-center">
          <h2 className="text-lg font-semibold mb-2">Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!generationData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-indigo-900 mb-2">
            {generationData.title}
          </h1>
          <p className="text-gray-600">
            Generated on {new Date(generationData.createdAt).toLocaleDateString()}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {generationData.teams.map((team, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <h2 className="text-2xl font-bold text-indigo-700 mb-4">
                {team.name}
              </h2>
              <div className="space-y-3">
                {team.players.map((player, playerIndex) => (
                  <div
                    key={playerIndex}
                    className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                  >
                    <span className="font-medium text-gray-700">
                      {player.name}
                    </span>
                    <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm">
                      Skill: {player.skill}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SharedTeams