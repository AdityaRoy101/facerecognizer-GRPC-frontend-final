import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange, onButtonClick}) => {
    return(
        <div>
            <p className='f3'>
                {'This ML Web Model recognizes faces in images. '}
                {<em>Just Give it a try...</em>}
            </p>
            <div className='center'>
                <div className='form center pa4 br3 shadow-5'>
                    <input className='f4 pa2 w-70 center' type='text' placeholder='Insert here' onChange={onInputChange}/>
                    <button 
                        className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'
                        onClick={onButtonClick}>Detect</button>
                </div>
            </div>
        </div>
        
    )
}

export default ImageLinkForm;