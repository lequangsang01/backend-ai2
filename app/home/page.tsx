"use client"
import { useState, useRef } from 'react';
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Chart Page | Next.js E-commerce Dashboard Template",
  description: "This is Chart Page for TailAdmin Next.js",
  // other metadata
};

const url = 'http://127.0.0.1:8000';
const urlPredict = `${url}/api/predict`;

const Home = () => {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);

  const handleImageChange = (event, setImageFunc) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImageFunc({ file, preview: reader.result });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleImage1Change = (event: any) => {
    handleImageChange(event, setImage1);
  };

  const handleImage2Change = (event: any) => {
    handleImageChange(event, setImage2);
  };

  const handleSubmit = () => {
    // Send images to the API with Authorization header
    const formData = new FormData();
    formData.append('image1', image1.file);
    formData.append('image2', image2.file);

    fetch(urlPredict, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        // Handle the API response
        console.log(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <>
      <Breadcrumb pageName="Home" />
      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <div className="col-span-4">
          <input
            type="file"
            name="image1"
            accept="image/*"
            onChange={handleImage1Change}
            ref={inputRef1}
          />
          {image1 && <img src={image1.preview} alt="Image 1" />}
        </div>
        <div className="col-span-4">
          <input
            type="file"
            name="image2"
            accept="image/*"
            onChange={handleImage2Change}
            ref={inputRef2}
          />
          {image2 && <img src={image2.preview} alt="Image 2" />}
          <div>
            <button onClick={handleSubmit}>Submit</button>
          </div>
        </div>
        <div className="col-span-4"></div>
      </div>
    </>
  );
};

export default Home;
