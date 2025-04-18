import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

import '../styles/menu.css';

export default function Leaderboard({playSound, leaders}) {
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
        <div className='leaderboard menu'>
            <div className={`menu-content ${displayClass}`}>
                <div className='menu-title-wrapper'>
                    <img src='/arrow-wheel.svg'/>
                    <h1>Leaderboard</h1>
                </div>
                <div className='score-column'>{
                    leaders.length
                        ? leaders.sort((a,b) => b.level - a.level).map((e,i) => {
                            return <div className='score-entry' key={`score-${i}`}>
                                <div>{e.name}</div>
                                <div>Level {e.level}</div>
                            </div>
                        })
                        : <>
                            <div className='loading-caption'>Loading</div>
                            <div className='loading loading-1'>
                                <div className='loading-light'></div>
                            </div>
                            <div className='loading loading-2'>
                                <div className='loading-light'></div>
                            </div>
                            <div className='loading loading-3'>
                                <div className='loading-light'></div>
                            </div>
                        </>
                }</div>
                <button className='motivation-button' onClick={() => changePage('/menu')}>Main Menu</button>
            </div>
            <div className={`menu-flash ${displayClass}`}></div>
        </div>
    )
}