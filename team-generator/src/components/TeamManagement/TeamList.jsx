import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { deleteTeam } from '../../services/api';

export function TeamList({ teams, onEdit, onTeamDeleted }) {
  const handleDelete = async (team) => {
    if (window.confirm(`Are you sure you want to delete ${team.name}?`)) {
      try {
        await deleteTeam(team._id);
        onTeamDeleted();
      } catch (err) {
        alert(err.response?.data?.message || 'Failed to delete team');
      }
    }
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Teams List</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {teams.map((team) => (
          <div
            key={team.id}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-800">{team.name}</h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => onEdit(team)}
                  className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(team)}
                  className="p-1.5 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}