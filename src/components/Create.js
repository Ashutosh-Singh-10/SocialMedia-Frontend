import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import Cook from '../utilities/GetCookie';
import Dropzone from 'react-dropzone'

export default function Create() {

  const[image,setImage]=useState(null);

  const onImageChange = (event) => {
    setImage(event.target.files[0])
    // if (event.target.files && event.target.files[0]) {
    //   setImage(URL.createObjectURL(event.target.files[0]));
    // }
   }
   const onDrop = (acceptedFiles) => {
    setImage(acceptedFiles[0])
    // if (acceptedFiles && acceptedFiles[0])  {
    //   setImage(URL.createObjectURL(acceptedFiles[0]));

    // }

  }
   
  const getPosts=()=>{
    let url = process.env.REACT_APP_BACKEND_URL+  "/feeds/createfeed";

        let token=Cook("access");  
    
        axios.post(url,{
          "avatar":image
        },
        {
          headers:{
            'Content-Type': 'multipart/form-data', 
            Authorization: "Bearer "+token
    
          },
        }
      ).then((res) => {
        console.log(res);
      }).catch((err)=>{console.log(err)})
    
      }
  return (
    <div>
      <input type="file" accept='.jpg, .jpeg, .png, .webp'
  onChange={onImageChange}
  />
  <br />
  <Dropzone onDrop={onDrop}>
          {({getRootProps, getInputProps}) => (
            <div {...getRootProps()}>
              <input {...getInputProps()} 
                onChange={onImageChange}
              />
              Drag and Drop to Upload 
          </div>

          )}
        </Dropzone>

  <button onClick={getPosts}>Create Post</button>
  
    </div>
  )
}
