import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm =({onInputChange, onSubmit})=> {
  return (
    <div>
      <div className='f3'>
        {'This face detection app by Donald Nyingifa will detect the position of the face in your picture '}
      </div>
      <div className='f3'>
        {'Give it a try and make sure you put in the correct image address !'}
      </div>
      <div className='center '>
       <div className='form center pa4 br3 shadow-5'>
        <input className='f4 pa2 w-70 center' onChange={onInputChange} type='text' />
        <button onClick={onSubmit}className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'> Detect </button>
       </div>
      </div>
    </div>
  );
}

export default ImageLinkForm;
