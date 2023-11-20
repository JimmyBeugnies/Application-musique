import React from "react";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="music-player">
        <h2 className="player-title">Titre Chanson</h2>
        <div className="player-controls">
          <button className="btn">Précédent</button>
          <button className="btn">Play</button>
          <button className="btn">Suivant</button>
        </div>
        <div className="track">
          <div className="track-progress" style={{ width: "50%" }}></div>
        </div>
      </div>
    </div>
  );
}

export default App;