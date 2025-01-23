import React from 'react';
import { calculateAverageSkill } from '../../helpers/generalHelpers';

export function GeneratedTeams({ teams }) {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Generated Teams</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {teams.map((team,i) => (
          <div key={team.id} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-800">{team.name}</h3>
              <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">
                Avg. Skill: {calculateAverageSkill(teams)}
              </span>
            </div>
            
            <div className="space-y-3">
              {team.players.map((player) => (
                <div
                  key={player.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
                >
                  <span className="font-medium text-gray-700">{player.name}</span>
                  <div className="flex items-center space-x-1">
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
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}