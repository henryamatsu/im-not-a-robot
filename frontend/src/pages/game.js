import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

import CaptchaBlock from '../components/captchaBlock';
import '../styles/game.css';

export default function Game({level, setLevel, playSound}) {
    const navigate = useNavigate();

    const [timer, setTimer] = useState(-1);
    const [blockData, setBlockData] = useState([]);

    useEffect(() => {
        setLevel(1);
    }, [])

    useEffect(() => {
        setTimer(-1);
        const timerInterval = setInterval(() => {
            setTimer(prevTimer => prevTimer + 1);
        }, 1000);

        return () => clearInterval(timerInterval);
    }, [level]);

    // setLevel when you either win or lose a round
    useEffect(() => {        
        if (blockData.some(e => e.verified === false)) {
            setTimeout(() => navigate('/gameOver'), 600);
            playSound('game-over');
        }
        else if (blockData.length && blockData.every(e => e.verified)) {
            setLevel(prevLevel => prevLevel + 1);
        }
    }, [blockData]);

    useEffect(() => {
        if (timer > 10) {
            setTimeout(() => navigate('/gameOver'), 600);
            playSound('game-over');
        }
    }, [timer])

    // setBlockData when level changes
    useEffect(() => {
        setTimeout(() => {
            const challengeTypes = ['skew', 'negative', 'rotate', 'movement', 'four'];
            let challengeArr = [];
    
            for (let i = 0; i < level; i++) {
                const shortest = [...challengeArr].sort((a,b) => a.length - b.length)[0];
                const lowest = [...challengeArr]
                    .filter(e => e.length === shortest.length)
                    .sort((a,b) => a[a.length - 1] - b[b.length - 1])[0];
    
                let innerArr = challengeArr[challengeArr.findIndex(e => e.every(f => lowest.includes(f)))];
    
                if (!innerArr || innerArr.length === challengeTypes.length) {
                    challengeArr.push([0]);
                    challengeArr = challengeArr.map(() => [0]);
                }
                else {
                    if (innerArr[innerArr.length - 1] === challengeTypes.length) {
                        innerArr.push(0);
                        challengeArr[challengeArr.findIndex(e => e.every(f => lowest.includes(f)))] = innerArr.map((e,i) => i + 1);
                    }
                    else {
                        innerArr[innerArr.length - 1]++;
                    }    
                }
            }
    
            const imageTypes = ['bicycles', 'bridges', 'cars', 'crosswalks', 'streetlights', 'trains'];
    
            const arr = challengeArr.map(innerArr => {
                const innerChallenges = innerArr.map(e => challengeTypes[e - 1]);
                
                const randomType = Math.floor(Math.random()*imageTypes.length);
                const imageCount = innerChallenges.includes('four') ? 16 : 9;
    
                const imageArrays = {
                    bicycles: Array(16).fill().map((e,i) => `/captcha-images/bicycles/${i}.jpg`),
                    bridges: Array(16).fill().map((e,i) => `/captcha-images/bridges/${i}.jpg`),
                    cars: Array(16).fill().map((e,i) => `/captcha-images/cars/${i}.jpg`),
                    crosswalks: Array(16).fill().map((e,i) => `/captcha-images/crosswalks/${i}.jpg`),
                    streetlights: Array(16).fill().map((e,i) => `/captcha-images/streetlights/${i}.jpg`),
                    trains: Array(16).fill().map((e,i) => `/captcha-images/trains/${i}.jpg`)
                }
    
                return {
                    imageList: Array(imageCount).fill().map(() => {
                        const randomType = Math.floor(Math.random()*imageTypes.length);
                        const imageArr = imageArrays[imageTypes[randomType]];
    
                        const randomImage = imageArr.splice(Math.floor(Math.random()*imageArr.length), 1)[0];
    
                        const skewX = 10 - Math.round(Math.random()*20) + 'deg';
                        const skewY = 10 - Math.round(Math.random()*20) + 'deg';
                        const skew = `skew(${skewX}, ${skewY})`;
    
    
                        const rotation = innerChallenges.includes('rotate') ? `rotate(${Math.floor(Math.random()*4)*90 + 'deg'})` : '';
                        
                        const offsetX = 30 - Math.round(Math.random()*60) + 'px';
                        const offsetY = 30 - Math.round(Math.random()*60) + 'px';
    
                        const offset = innerChallenges.includes('movement') ? {
                            left: offsetX,
                            top: offsetY
                        } : {};
    
                        return {url: randomImage, clicked: false, type: imageTypes[randomType], skew, rotation, offset}
                    }),
                    imageType: imageTypes[randomType],
                    challengeTypes: innerChallenges,
                    verified: null
                }
            });
    
            setBlockData(arr);    
        }, 600)
    }, [level])


    const timerWidth = {width: 100 - timer*10 < 100 ? `${100 - timer*10}%` : `${100}%`};

    return (
        <div className='game-content'>
            <div className='level-tracker'>Level: {level}</div>
            <div className='captcha-blocks'>
                {blockData.map((e,i) => <CaptchaBlock blockIndex={i} {...{level, timer, blockData, setBlockData, playSound}} key={`block-${i}`}/>)}
            </div>
            <div className='timer-bar' style={timerWidth}></div>
        </div>
    )
}