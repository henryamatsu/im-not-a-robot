import {useState, useEffect} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Start from './pages/start';
import Menu from './pages/menu';
import Game from './pages/game';
import GameOver from './pages/gameOver';
import Leaderboard from './pages/leaderboard';
import Motivation from './pages/motivation';
import About from './pages/about';

function App() {
  const [level, setLevel] = useState(1);
  const [muted, setMuted] = useState(false);
  const [startSound, setStartSound] = useState();
  const [beepSound, setBeepSound] = useState();
  const [gameOverSound, setGameOverSound] = useState();
  const [musicSound, setMusicSound] = useState();
  const [leaders, setLeaders] = useState([]);

  if (startSound) {
    startSound.volume = .1;
    beepSound.volume = .5;
    gameOverSound.volume = .005;
    musicSound.volume = .03;
    musicSound.loop = true;  
  }

  useEffect(() => {
    setStartSound(new Audio("/sounds/start-game.mp3"));
    setBeepSound(new Audio("/sounds/beep.mp3"));
    setGameOverSound(new Audio("/sounds/game-over.mp3"));
    setMusicSound(new Audio("/sounds/music.mp3"));  
  }, []);

  useEffect(() => {
    fetch("https://captcha-backend.onrender.com/scoreboard/")
    .then(res => res.json())
    .then(data => setLeaders(data)); 
  }, [])

  
  useEffect(() => {
    if (window.location.href !== window.location.origin + '/' && musicSound && !muted) {
      const startMusic = () => playSound('music');

      document.body.addEventListener('click', startMusic);
    
      return () => document.body.removeEventListener('click', startMusic);
    }
  }, [musicSound, muted]);

  useEffect(() => {
    if (muted && musicSound) {
      musicSound.pause();
      musicSound.currentTime = 0;
    }
  }, [muted])

  const playSound = type => {
    if (!muted) {
      switch (type) {
        case'start':
          startSound.play();
          break;
        case'beep':
          beepSound.play();
          break;
        case'game-over':
          gameOverSound.play();
          break;
        case'music':
          musicSound.play();
          break;
      }  
    }
  } 

  const toggleSound = () => {
    setMuted(prevMuted => !prevMuted);
  }

  return (
    <BrowserRouter>
    <main>
      <div className='bg bg-1'/>
      <div className='bg bg-2'/>
      <div className='bg bg-3'/>
      <div className='bg bg-4'/>
      <div className='mute-button' onClick={toggleSound}>
        {
          muted
          ? <img src='/mute-icon.svg'/>
          : <img src='/speaker-icon.svg'/>
        }
      </div>
      <Routes>
        <Route path="/" element={<Start {...{musicSound, playSound}}/>}/>
        <Route path="/menu" element={<Menu {...{playSound}}/>}/>
        <Route path="/game" element={<Game {...{level, setLevel, playSound}}/>}/>
        <Route path="/gameOver" element={<GameOver  {...{level, setLeaders, playSound}}/>}/>
        <Route path="/leaderboard" element={<Leaderboard {...{leaders, playSound}}/>}/>
        <Route path="/motivation" element={<Motivation {...{playSound}}/>}/>
        <Route path="/about" element={<About {...{playSound}}/>}/>
      </Routes>
    </main>
    </BrowserRouter>
  );
}

export default App;

