// client/src/components/AddPlayer.js
import React, { useState } from 'react';
import axios from 'axios';

function AddPlayer({ onPlayerAdded }) {
  const [playerName, setPlayerName] = useState('');

  const handleAddPlayer = async () => {
    try {
      const response = await axios.post('/api/players', { name: playerName });
      onPlayerAdded(response.data); // Assuming the server returns the newly added player
      setPlayerName('');
    } catch (error) {
      console.error('Error adding player:', error);
      // Handle error, e.g., show an error message to the user
    }
  };

  return (
    <div>
      <input 
        type="text" 
        placeholder="Player Name" 
        value={playerName} 
        onChange={e => setPlayerName(e.target.value)} 
      />
      <button onClick={handleAddPlayer}>Add Player</button>
    </div>
  );
}

export default AddPlayer;
