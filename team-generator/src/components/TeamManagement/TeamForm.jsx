import React, { useState, useEffect } from 'react';
import { Users, Save } from 'lucide-react';
import { addTeam, editTeam } from '../../services/api';

export function TeamForm({ onSuccess, editingTeam, onCancel }) {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (editingTeam) {
      setName(editingTeam.name);
    }
  }, [editingTeam]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    setLoading(true);
    setError('');

    try {
      if (editingTeam) {
        await editTeam(editingTeam._id, { name });
      } else {
        await addTeam({ name });
      }
      
      onSuccess();
      setName('');
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        {editingTeam ? 'Edit Team' : 'Add New Team'}
      </h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Team Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter team name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div className="flex space-x-3">
          <button
            type="submit"
            disabled={loading}
            className={`flex-1 flex items-center justify-center px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition-colors ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {editingTeam ? <Save className="w-5 h-5 mr-2" /> : <Users className="w-5 h-5 mr-2" />}
            {loading ? 'Saving...' : editingTeam ? 'Save Changes' : 'Add Team'}
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