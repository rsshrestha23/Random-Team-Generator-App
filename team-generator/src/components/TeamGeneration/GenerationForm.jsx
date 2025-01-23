import React, { useState } from 'react';
import { Shuffle, Link } from 'lucide-react';
import { generateTeams } from '../../services/api';

export function GenerationForm({ teams, players, onTeamsGenerated }) {
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (!title.trim()) return;

    setLoading(true);
    setError('');

    try {
      const response = await generateTeams({ title, teamIds: teams.map(t => t._id) });
      setGeneratedLink(response.data.publicLink);
  

      onTeamsGenerated(response.data.teams);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to generate teams');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyLink = () => {
    if (generatedLink) {
      navigator.clipboard.writeText(generatedLink);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Generate Teams</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Generation Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Friday Futsal"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            // required
          />
        </div>

        <div className="flex flex-col space-y-4">
          <button
            type="submit"
            disabled={teams.length < 2 || players.length < 2 || loading}
            className={`flex items-center justify-center px-6 py-3 rounded-md text-white transition-colors ${
              teams.length < 2 || players.length < 2 || loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-indigo-500 hover:bg-indigo-600'
            }`}
          >
            <Shuffle className="w-5 h-5 mr-2" />
            {loading ? 'Generating...' : 'Generate Teams'}
          </button>

          {generatedLink && (
            <div className="flex items-center space-x-3 p-3 bg-indigo-50 rounded-md">
              <div className="flex-1 text-sm text-indigo-700 truncate">
                {generatedLink}
              </div>
              <button
                type="button"
                onClick={handleCopyLink}
                className="flex items-center px-3 py-1 bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200 transition-colors"
              >
                <Link className="w-4 h-4 mr-1" />
                Copy
              </button>
            </div>
          )}
        </div>
      </form>

      {(teams.length < 2 || players.length < 2) && (
        <div className="mt-4 text-sm text-red-500">
          You need at least 2 teams and 2 players to generate teams.
        </div>
      )}
    </div>
  );
}