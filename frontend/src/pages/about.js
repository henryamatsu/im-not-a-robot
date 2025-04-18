import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

import '../styles/menu.css';

export default function About({playSound}) {
    const navigate = useNavigate();

    const [displayOn, setDisplayOn] = useState(false);

    useEffect(() => {
        setTimeout(() => setDisplayOn(true));
    }, [])

    const displayClass = displayOn ? 'display-on' : '';

    const changePage = path => {
        setDisplayOn(false);
        setTimeout(() => navigate(path), 600);
        playSound('beep');
    }

    return (
        <div className='about menu'>
            <div className={`menu-content ${displayClass}`}>
                <div className='menu-title-wrapper'>
                    <img src='/arrow-wheel.svg'/>
                    <h1>About the App</h1>
                </div>
                <div className='text-block'>
                    <p>What is the biggest problem that aspiring young web developers face? It is the fear that we will be replaced by machines. “I'm Not a Robot!” is more than just a game, it’s a motivational tool that can give you back the self-confidence you need to compete in a world increasingly dominated by AI. The game achieves this by presenting the player with the one type of challenge that humans can apparently do better than robots: solving captchas.</p>
                    <p>Restore your faith in your own humanity with “I'm Not a Robot!” the game.</p>
                </div>
                <button className='menu-button' onClick={() => changePage('/menu')}>Main Menu</button>
            </div>
            <div className={`menu-flash ${displayClass}`}></div>
        </div>
    )
}