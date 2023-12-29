import React, { useRef , useState, useEffect}    from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import leftImage from './assests/leftImage.jpg';
import { API_URL , uploadFile} from './services/api'; 
import Typed from 'typed.js'; 
import QRCode from 'qrcode.react';


function App() {


  const fileInputRef = useRef(null);
  const onUploadClick = () => {
    // Trigger the file input when the "Upload" button is clicked
    fileInputRef.current.click();
  };


  const [file, setFile] = useState(''); //to save the file 
  //to show the link on display
  const [result, setResult] = useState('');

  const handleFileChange = (event) => {
    // Handle the selected file
    const selectedFile = event.target.files[0];
    setFile(selectedFile); 
    // You can perform additional actions with the selected file, such as uploading it to a server
  };


  useEffect(() => {
    const getImage = async () => {
      if(file)
      {
        const data = new FormData() ;
        data.append("name", file.name);
        data.append("file", file);

        try {
          let response = await uploadFile(data);
          const updatedPath = response.path.replace('http://localhost:8000', API_URL);
          setResult(updatedPath);
        } catch (error) {
          console.error("Error uploading file:", error.message);
        }
      }
    };
    getImage();
  }, [file]);

  
  useEffect(() => {
    // Initialize Typed for the role element
    const typeData = new Typed('.role', {
      strings: ['Paras !!'],
      loop: true,
      typeSpeed: 100,
      backSpeed: 80,
      backDelay: 1000,
    });

    return () => {
      // Cleanup Typed instance on component unmount
      typeData.destroy();
    };
  }, []); // Empty dependency array ensures this runs only once on component mount

  return (

    <div className="App">
      <img src={leftImage} alt="leftImage" />
      <div className="RightContainer">
        <h1>Simple File Sharing</h1>
        <p>Welcome to the sharing world</p>
        <button onClick={onUploadClick}>Upload</button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />

        
        <a href={result}>{result}</a>

        {result ? (
          <div className="qr-code-container">
           <QRCode value={result} size={200} /> {/* Adjust the size as needed */}
          </div>
        ) : null}

        <div className="bottom-div">
          <a href="https://github.com/Paras-cyber/" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faGithub} style={{ fontSize: '24px', marginRight: '10px' }} />
          </a>
          Created By <span className="role"></span>
        </div>   
        
      </div>
    </div>
  );
}

export default App;
