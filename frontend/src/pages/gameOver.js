import {useState, useRef, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

import '../styles/menu.css';

export default function GameOver({level, setLeaders, playSound}) {
    const navigate = useNavigate();

    const [displayOn, setDisplayOn] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const inputRef = useRef();

    useEffect(() => {
        setTimeout(() => setDisplayOn(true));
    }, [])

    const displayClass = displayOn ? 'display-on' : '';
    const submittedClass = submitted ? 'submitted' : '';

    const changePage = path => {
        setDisplayOn(false);
        setTimeout(() => navigate(path), 600);

        if (path === '/game') {
            playSound('start');
        }
        else {
            playSound('beep');
        }
    }

    const submitScore = e => {
        if (e.type === 'click' || e.code === 'Enter') {
            if (!submitted && inputRef.current.value.trim()) {
                setSubmitted(true);
    
                const entry = {
                    name: inputRef.current.value.trim(),
                    level
                }

                setLeaders(prevLeaders => [...prevLeaders, entry]);

                fetch("https://captcha-backend.onrender.com/scoreboard/", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(entry)
                })    
                playSound('beep'); 
            }
            else if (!submitted) {
                inputRef.current.style.outline = '3px solid red';
                inputRef.current.focus();
                playSound('game-over'); 
            }
        }

    }

    return (
        <div className='menu'>
            <div className={`menu-content ${displayClass}`}>
                <div className='menu-title-wrapper'>
                    <img src='/arrow-wheel.svg'/>
                    <h1>You got to Level {level}!</h1>
                </div>
                <input className={`name-entry ${submittedClass}`} ref={inputRef} maxLength='12' placeholder='Enter your name' onKeyDown={submitScore}/>
                <button className={`submit-button ${submittedClass}`} onClick={submitScore}>Submit Score</button>
                <button className='new-game-button' onClick={() => changePage('/game')}>New Game</button>
                <button className='menu-button' onClick={() => changePage('/menu')}>Main Menu</button>
            </div>
            <div className={`menu-flash ${displayClass}`}></div>

        </div>
    )
}