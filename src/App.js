import React, { useState } from 'react';
import axios from 'axios';

import css from './App.css'
import fileSvg from "../src/assets/file.svg"

function App() {
  const [file, setFile] = useState(null);
  const [data, setData] = useState([]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    document.getElementById("upload-btn").style.display="block";
    document.getElementById("FileChange-btn").style.display="none";
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      
    
      setData(response.data);  // Assuming response data is an array of rows
    } catch (error) {
      console.error("Error uploading file", error);
    }
  };

  return (
    <>
    
    <div className='container'>
      <h1 style={{textAlign:'center'}}>Free Online XLSX Viewer</h1>
      <p style={{textAlign:'center'}}>Upload and View XLSX Files Online</p>
      <div className='upload-group'>
        <img src={fileSvg} width={80}/>
        <label htmlFor="FileChange" className='FileChange' id='FileChange-btn'>Choose xlsx file</label>
        <button id='upload-btn' className='FileChange' onClick={handleUpload} style={{display:'none'}}>Upload and View</button>
        <input type="file" id='FileChange' style={{display:'none'}} onChange={handleFileChange} />
        <p>or, drop the file here</p>
      </div>

      
      

      
    </div>


    {data.length > 0 && (
        <table border="1" style={{ marginTop: '20px' , overflowX:'scroll !important'}}>
          <thead>
            <tr>
              {Object.keys(data[0]).map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {Object.values(row).map((cell, cellIndex) => (
                  <td key={cellIndex}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export default App;
