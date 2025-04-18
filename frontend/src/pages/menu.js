import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

import '../styles/menu.css';

export default function Menu({playSound}) {
    const navigate = useNavigate();

    const [displayOn, setDisplayOn] = useState(false);

    useEffect(() => {
        setTimeout(() => setDisplayOn(true));
    }, [])

    const displayClass = displayOn ? 'display-on' : '';

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

    return (
        <div className='menu'>
            <div className={`menu-content ${displayClass}`}>
                <div className='menu-title-wrapper'>
                    <img src='/arrow-wheel.svg'/>
                    <h1 className='main-menu-title'>I'm Not a Robot!</h1>
                </div>
                <button className='new-game-button' onClick={() => changePage('/game')}>New Game</button>
                <button className='leaderboard-button'onClick={() => changePage('/leaderboard')}>Leaderboard</button>
                <button className='motivation-button' onClick={() => changePage('/motivation')}>Motivational Quotes</button>
                <button className='about-button' onClick={() => changePage('/about')}>About</button>
            </div>
            <div className={`menu-flash ${displayClass}`}></div>
        </div>
    )
}