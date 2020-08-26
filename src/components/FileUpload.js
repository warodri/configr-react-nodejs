import React, { useRef, useState } from 'react';

// Use Axios to upload files
import axios from 'axios';

// Get global config
import { Config } from '../common/Config.js';

// Component to show uploaded data
import DisplayData from './DisplayData';


function FileUpload() {

    // storing the uploaded file
    const [file, setFile] = useState(''); 
    
    // storing the recived file from backend
    const [data, getFile] = useState({ name: "", path: "" });

    // progess bar
    const [progress, setProgess] = useState(0); 

    // accesing input element
    const el = useRef(); 

    const handleChange = (e) => {

        // progress init at 0
        setProgess(0)

        // accessing the file
        const file = e.target.files[0]; 

        // storing the file
        setFile(file); 
    }


    const uploadFile = () => {

        // create a form to send the file
        const formData = new FormData();

        // appending file
        formData.append(Config.uploadElementName, file); 

        // use Axios to upload
        axios.post(Config.server + Config.uploadPath, formData, {
            onUploadProgress: (ProgressEvent) => {
                let progress = Math.round(
                    ProgressEvent.loaded / ProgressEvent.total * 100) + '%';
                setProgess(progress);
            }
        }).then(res => {
            // Assign received values and show response 
            getFile({
                name: res.data.name,
                path: Config.server + res.data.path
            })
        }).catch(err => console.log(err))
    }

    return (
        <div>
            <div className="fileUpload">
                <input type="file" ref={el} onChange={handleChange} accept=".csv" />
                <button onClick={uploadFile} className="uploadButton">
                    Upload CSV File
                </button>
                <div className="progessBar" style={{ width: progress }}>
                    { progress } 
                </div>
                <hr />
                <DisplayData data={data} />
            </div>
        </div>
    );
}

export default FileUpload;