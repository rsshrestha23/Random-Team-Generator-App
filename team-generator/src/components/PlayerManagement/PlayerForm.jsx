import React, { useState, useEffect } from 'react';
import { UserPlus, Save } from 'lucide-react';
import { addPlayer, editPlayer } from '../../services/api';

export function PlayerForm({ onSuccess, editingPlayer, onCancel }) {
  const [name, setName] = useState('');
  const [skill, setSkill] = useState(3);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (editingPlayer) {
      setName(editingPlayer.name);
      setSkill(editingPlayer.skill);
    }
  }, [editingPlayer]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    setLoading(true);
    setError('');

    try {
      if (editingPlayer) {
        await editPlayer(editingPlayer._id, { name, skill });
      } else {
        await addPlayer({ name, skill });
      }
      
      onSuccess();
      setName('');
      setSkill(3);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        {editingPlayer ? 'Edit Player' : 'Add New Player'}
      </h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Player Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter player name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label htmlFor="skill" className="block text-sm font-medium text-gray-700 mb-1">
            Skill Level
          </label>
          <div className="flex items-center space-x-2">
            {[1, 2, 3, 4, 5].map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => setSkill(level)}
                className={`w-10 h-10 rounded-full ${
                  skill === level
                    ? 'bg-indigo-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                } transition-colors`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        <div className="flex space-x-3">
          <button
            type="submit"
            disabled={loading}
            className={`flex-1 flex items-center justify-center px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition-colors ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {editingPlayer ? <Save className="w-5 h-5 mr-2" /> : <UserPlus className="w-5 h-5 mr-2" />}
            {loading ? 'Saving...' : editingPlayer ? 'Save Changes' : 'Add Player'}
          </button>
          
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              disabled={loading}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </form>
  );
}