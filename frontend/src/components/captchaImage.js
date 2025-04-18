import '../styles/captchaBlock.css';

export default function CaptchaImage({imageIndex, blockIndex, imageList, challengeTypes, setBlockData, verified}) {
    const imageClick = () => {

        if (verified) return;

        setBlockData(prevBlockData => {
            const arr = [...prevBlockData];
            const block = {...prevBlockData[blockIndex]};
            block.imageList[imageIndex].clicked = !block.imageList[imageIndex].clicked; 
            arr.splice(blockIndex, 1, block);

            return arr;
        })
    }


    const challengeClasses = challengeTypes.length ? challengeTypes.join(' ') : '';
    const blurNegativeClass = challengeTypes.includes('blur') && challengeTypes.includes('negative') ? 'blur-negative' : ''
    const clickedClass = imageList[imageIndex].clicked ? 'clicked' : '';

    const skewStyle = challengeTypes.includes('skew') && !verified ? {transform: imageList[imageIndex].skew} : {};
    const rotationStyle = challengeTypes.includes('rotate')  && !verified ? {transform: imageList[imageIndex].rotation} : {};
    const skewRotationStyle = challengeTypes.includes('skew') && challengeTypes.includes('rotate') && !verified ? {transform: `${imageList[imageIndex].skew} ${imageList[imageIndex].rotation}`} : {};
    const offsetStyle = challengeTypes.includes('movement') && !verified ? imageList[imageIndex].offset : {};

    return (
        <div
            className={`captcha-image ${challengeClasses} ${blurNegativeClass} ${clickedClass}`}
            style={{...skewStyle, ...rotationStyle, ...skewRotationStyle, ...offsetStyle, backgroundImage: `url(${imageList[imageIndex].url})`}}
            onClick={imageClick}
        />
        )
}