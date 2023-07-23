import React from 'react';
import './FaceRecognization.css';

const FaceRecognization = ({box, imageurl}) => {
    return(
        <div className='center ma'>
            <div className='absolute mt2'>
                <img id='inputimage' src={imageurl} width='500px' height='auto'/>
                <div className='boundingbox' style={{top: box.toprow, right: box.rightcol, bottom: box.bottomrow, left: box.leftcol}}></div>
            </div>
        </div>
    )
}

export default FaceRecognization;