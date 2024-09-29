import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddPlayer from './components/AddPlayer';
import LineupManagement from './components/LineupManagement';
import PlayerList from './components/PlayerList';
import WestlakeLogo from './WestlakeLogo.png'; // Replace with actual path

function App() {
  const [players, setPlayers] = useState([]);
  const [offensiveLineups, setOffensiveLineups] = useState([]);
  const [defensiveLineups, setDefensiveLineups] = useState([]);
  const [selectedOffensiveLineup, setSelectedOffensiveLineup] = useState(null);
  const [selectedDefensiveLineup, setSelectedDefensiveLineup] = useState(null);
  const [nonStarters, setNonStarters] = useState([]);

  useEffect(() => {
    // Fetch initial data from the server
    axios.get('/api/players')
      .then(res => setPlayers(res.data))
      .catch(err => console.error(err));

    axios.get('/api/lineups/offensive')
      .then(res => setOffensiveLineups(res.data))
      .catch(err => console.error(err));

    axios.get('/api/lineups/defensive')
      .then(res => setDefensiveLineups(res.data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    // Calculate non-starters whenever lineups are selected
    if (selectedOffensiveLineup && selectedDefensiveLineup) {
      const starters = new Set([
        ...selectedOffensiveLineup.players,
        ...selectedDefensiveLineup.players
      ]);
      setNonStarters(players.filter(player => !starters.has(player.id)));
    }
  }, [selectedOffensiveLineup, selectedDefensiveLineup, players]);

  // ... (Other functions for adding players, lineups, etc.)

  return (
    <div className="App">
      <header>
        <img src={WestlakeLogo} alt="Westlake High School Logo" />
        <h1>Westlake Youth Football 6A2 Player Tracker</h1>
      </header>

      {/* ... other components */}
    </div>
  );
}

export default App;
