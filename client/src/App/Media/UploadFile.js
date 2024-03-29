import React ,{useState} from 'react';
import AWS from 'aws-sdk'
import { v4 as uuidv4 } from 'uuid';

const S3_BUCKET ='chargeup';
const REGION ='us-east-1';

AWS.config.update({
    accessKeyId: process.env.REACT_APP_ACCESSKEY,
    secretAccessKey: process.env.REACT_APP_SECRETKEY
})

const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET},
    region: REGION,
})

const UploadImageToS3WithNativeSdk = ({files,setSelectedFiles}) => {

    const [progress , setProgress] = useState(0);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileInput = (e) => {
        e.preventDefault();
        setSelectedFile(e.target.files[0]);
    }

    const uploadFile = (e, file) => {
        e.preventDefault();
        console.log("uploading")
        const id = uuidv4();
        const params = {
            ACL: 'public-read',
            Body: file,
            Bucket: S3_BUCKET,
            Key: id + "-" +file.name
        };
       
        myBucket.putObject(params)
            .on('httpUploadProgress', (evt) => {
                console.log(evt)
                setProgress(Math.round((evt.loaded / evt.total) * 100))
            })
            .send((err) => {

                if (err) {
                    console.log(err)
                } else {
                    console.log(files,file,"files before added")

                    setSelectedFiles(
                        [...files,
                        id + "-" +file.name]
                    )

                    console.log(files,"files added")
                }
                
            })
    }


    return <div className='spacev'>
        {/* <div>Native SDK File Upload Progress is </div> */}
        <input style={{color: "orange"}}type="file" onChange={handleFileInput}/> 
        <button onClick={(e) => uploadFile(e,selectedFile)}> Upload</button>
    </div>
}

export default UploadImageToS3WithNativeSdk;