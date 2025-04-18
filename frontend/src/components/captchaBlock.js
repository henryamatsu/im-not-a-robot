import {useState, useRef, useEffect} from 'react';

import CaptchaImage from './captchaImage';

import '../styles/captchaBlock.css';

export default function CaptchaBlock({level, timer, blockIndex, blockData, setBlockData, playSound}) {
    const {imageList, imageType, challengeTypes, verified} = blockData[blockIndex];

    // console.log(blockData[blockIndex])
    const [displayOn, setDisplayOn] = useState(false);
    const [gridHeight, setGridHeight] = useState();
    const gridRef = useRef(null);

    useEffect(() => {
        if (level) {
            setTimeout(() => setDisplayOn(true), 600);
        }
    }, [level])


    useEffect(() => {
        if (timer > 10) {
            setDisplayOn(false);
        }
    }, [timer]);

    useEffect(() => {
        if (gridRef.current && gridHeight !== gridRef.current.clientWidth) {
            setGridHeight(gridRef.current.clientWidth);
        }    
    })

    const clickVerify = () => {
        setDisplayOn(false);

        const verification = imageList.every(e => {
            if ((e.clicked && e.type === imageType)
            || !e.clicked && e.type !== imageType) {
                return true;
            }
            else return false;
        })

        if (verification) playSound('beep');
    
        setBlockData(prevBlockData => {
            const arr = [...prevBlockData];
            const block = {...prevBlockData[blockIndex]};
            block.verified = verification;
            arr.splice(blockIndex, 1, block);

            return arr;
        });
    }

    const displayClass = displayOn ? 'display-on' : '';

    const challengeClasses = challengeTypes.length ? challengeTypes.join(' ') : '';

    return (
        <div className={`captcha-block ${displayClass} ${challengeClasses}`}>
            <div className='captcha-banner'>
                <p>Select all images with</p>
                <h1>{imageType}</h1>
                <p>Click verify once there are none left.</p>
            </div>
            <div className={`captcha-image-grid  ${challengeClasses}`} ref={gridRef} style={{height: gridHeight}}>
                {imageList.map((e,i) => <CaptchaImage imageIndex={i} {...{blockIndex, imageList, challengeTypes, setBlockData, verified}} key={'image-' + i}/>)}
            </div>
            <div className='captcha-footer'>
                <button className='verify-button' onClick={clickVerify}>VERIFY</button>
            </div>
            <div className={`block-flash ${displayClass}`}></div>
        </div>
    )
}