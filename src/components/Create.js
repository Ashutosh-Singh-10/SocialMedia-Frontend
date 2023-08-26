import React from 'react'
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Cook from '../utilities/GetCookie';
import Dropzone from 'react-dropzone'
import "../assets/css/create.css"
export default function Create() {

  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [desc, setDesc] = useState("")
  const onImageChange = (event) => {
    setImage(event.target.files[0])
    // if (event.target.files && event.target.files[0]) {
    //   setImage(URL.createObjectURL(event.target.files[0]));
    // }
  }
  const onDrop = (acceptedFiles) => {
    setImage(acceptedFiles[0])
    if (acceptedFiles && acceptedFiles[0]) {
      // console.log(acceptedFiles[0]);
      // console.log(URL.createObjectURL(acceptedFiles[0]))
      setImageURL(URL.createObjectURL(acceptedFiles[0]));

    }

  }
  const backBtn = () => {
    setImage(null);

  }

  const getPosts = () => {
    console.log(image)
    console.log(desc)
    console.log(typeof (desc))
    let url = process.env.REACT_APP_BACKEND_URL + "/feeds/createfeed";

    let token = Cook("access");

    axios.post(url, {
      "avatar": image,
      "desc": desc
    },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: "Bearer " + token

        },
      }
    ).then((res) => {
      console.log(res);
    }).catch((err) => { console.log(err) })

  }




  return (
    <div className='pfixed w100 h100 flexCenter' >

      <div className='w60 h80 flexCenter cr-mcn' >
        <div className="w100 h100 flexCenter" style={{ display: image ? "flex" : "none" }}>
          <img src={imageURL} className="h100 w60 imgContain" alt="" />
          <div className='w40 h100 flexV cr-cn1'>
            <div className='myFlex alignC'>
              <img src={require("../assets/images/gal.webp")} className="cr-im1" alt="" />
              <div className='cr-f1'>Gal_Godot</div>

            </div>
            <hr className='w100' />
            <textarea onChange={(e) => setDesc(e.target.value)} type="text" className='cr-in1' placeholder='type something' />
            <div className='flexVC w100'>
              <br />
              <button className='cr-cr-bt w50' onClick={getPosts}>Create new post</button>
              <br />
              <button className='cr-bk-bt w50' onClick={backBtn}>Back</button>
            </div>

          </div>
        </div>

        {/* <div className="w100 h100 flexCenter" style={{display:image?"none":"flex"}}>
      hiii */}

        <Dropzone onDrop={onDrop} className="w100 h100 flexVC" style={{ display: image != null ? "none" : "flex" }} >
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()} className='w100 h100 flexCenter' style={{ display: image != null ? "none" : "flex" }} >

              {/* <img src={require("../assets/images/images.jpg")} alt="" /> */}
              <br /><br />
              <button className='cr-bt1'>
                Drag and Drop to Upload
              </button>

            </div>

          )}
        </Dropzone>
        {/* </div> */}

      </div>


      {/* <input type="file" accept='.jpg, .jpeg, .png, .webp'
    onChange={onImageChange}
    /> */}
      {/* <br /> */}
      {/* <Dropzone onDrop={onDrop}>
          {({getRootProps, getInputProps}) => (
            <div {...getRootProps()}>
              <input {...getInputProps()} 
                onChange={onImageChange}
              />
              Drag and Drop to Upload 
          </div>

          )}
        </Dropzone> */}

      {/* <button onClick={getPosts}>Create Post</button> */}

    </div>
  )
}
