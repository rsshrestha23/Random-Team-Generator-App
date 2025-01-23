import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { deletePlayer } from '../../services/api';

export function PlayerList({ players, onEdit, onPlayerDeleted }) {
  const handleDelete = async (player) => {
    if (window.confirm(`Are you sure you want to delete ${player.name}?`)) {
      try {
        await deletePlayer(player._id);
        onPlayerDeleted();
      } catch (err) {
        alert(err.response?.data?.message || 'Failed to delete player');
      }
    }
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Players List</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {players.map((player) => (
          <div
            key={player.id}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-medium text-gray-800">{player.name}</h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => onEdit(player)}
                  className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(player)}
                  className="p-1.5 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="flex items-center">
              <span className="text-sm text-gray-600 mr-2">Skill Level:</span>
              <div className="flex space-x-1">
                {[...Array(5)].map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index < player.skill ? 'bg-indigo-500' : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}