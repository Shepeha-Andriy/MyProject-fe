import React, { useState } from 'react';

export default function LoadImg() {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileInputChange = (event) => {
    const files = Array.from(event.target.files);
    
    setSelectedFiles(prev => [...prev, files]);
  };

  const handleRemoveImage = (index) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);
  };

  return (
    <div className='loadimg'>
      <input type="file" multiple onChange={handleFileInputChange} />
      <div>
        {selectedFiles.map((file, index) => (
          <div key={index}>
            <img src={URL.createObjectURL(file[0])} alt={file.name} style={{width: '300px'}}/>
            <button onClick={() => handleRemoveImage(index)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
};
