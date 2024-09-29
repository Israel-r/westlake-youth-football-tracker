// client/src/components/LineupManagement.js
import React, { useState } from 'react';
import axios from 'axios';

function LineupManagement({ 
  lineups, 
  type, // 'offensive' or 'defensive'
  selectedLineup, 
  onLineupSelected, 
  onLineupAdded 
}) {
  const [newLineupName, setNewLineupName] = useState('');
  const [selectedPlayers, setSelectedPlayers] = useState([]); // For adding new lineups

  const handleLineupSelect = (lineupId) => {
    onLineupSelected(lineupId);
  };

  const handleAddLineup = async () => {
    try {
      const response = await axios.post(`/api/lineups/${type}`, { 
        name: newLineupName, 
        players: selectedPlayers 
      });
      onLineupAdded(response.data);
      setNewLineupName('');
      setSelectedPlayers([]);
    } catch (error) {
      console.error('Error adding lineup:', error);
    }
  };

  return (
    <div>
      <h2>{type.charAt(0).toUpperCase() + type.slice(1)} Lineups</h2>
      <ul>
        {lineups.map(lineup => (
          <li key={lineup.id}>
            <input 
              type="radio" 
              name={type} 
              value={lineup.id} 
              checked={selectedLineup === lineup.id} 
              onChange={() => handleLineupSelect(lineup.id)} 
            />
            {lineup.name}
          </li>
        ))}
      </ul>

      {/* Add new lineup section (potentially hidden initially) */}
      <input 
        type="text" 
        placeholder="New Lineup Name" 
        value={newLineupName} 
        onChange={e => setNewLineupName(e.target.value)} 
      />
      {/* ... player selection for the new lineup */}
      <button onClick={handleAddLineup}>Add Lineup</button>
    </div>
  );
}

export default LineupManagement;
