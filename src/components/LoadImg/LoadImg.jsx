import React, { useState } from 'react';
import axios from 'axios';

export default function LoadImg() {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileInputChange = (event) => {
    const files = Array.from(event.target.files);
    
    setSelectedFiles(prev => [...prev, files[0]]);
  };

  const handleRemoveImage = (index) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);
  };

  const sendfiles = async () => {
    const formData = new FormData();

    for (const file of selectedFiles) {
      formData.append('image', file);
    }

    axios.post('http://localhost:8080/test', formData)
  }

  return (
    <div className='loadimg'>
      <input type="file" multiple onChange={handleFileInputChange} />
      <div>
        {selectedFiles.map((file, index) => (
          <div key={index}>
            <img src={URL.createObjectURL(file)} alt={file.name} style={{width: '300px'}}/>
            <button onClick={() => handleRemoveImage(index)}>Remove</button>
          </div>
        ))}
      </div>
      <button onClick={sendfiles}>ggggg</button>
    </div>
  );
};
