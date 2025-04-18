import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

import '../styles/start.css';

export default function Start({musicSound, playSound}) {
    const navigate = useNavigate();

    const [displayOn, setDisplayOn] = useState(false);

    const displayClass = displayOn ? 'display-on' : '';

    const clickCheckbox = () => {
        setDisplayOn(true);
        playSound('start');
        playSound('music');
        setTimeout(() => navigate('/menu'), 1000)
    }

    useEffect(() => {
        if (musicSound) {
            musicSound.pause();
            musicSound.currentTime = 0;
        }
    }, [musicSound])

    return (
        <div className='start-page'>
            <div className={`captcha-prompt ${displayClass}`}>
                <div className='checkbox-wrapper'>
                    <div className={`checkbox ${displayClass}`} onClick={clickCheckbox}>
                        <div className={`checkbox-flash ${displayClass}`}></div>
                    </div>
                    <p>I'm not a robot</p>
                </div>
                <div className='image-wrapper'>
                    <img src='/arrow-wheel.svg'/>
                    <p style={{fontSize: '14px'}}>reSTORE</p>
                    <p style={{fontSize: '10px'}}>humanity</p>
                </div>
            </div>
            {/* <div className={`start-menu ${displayClass}`}>
            </div> */}
        </div>
    )
}