"use client"
import { useState, useRef } from 'react';
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import Image from "next/image";
export const metadata: Metadata = {
  title: "Chart Page | Next.js E-commerce Dashboard Template",
  description: "This is Chart Page for TailAdmin Next.js",
  // other metadata
};

const url = 'http://127.0.0.1:8000';
const urlPredict = `${url}/api/predict`;
const urlComments = `${url}/api/comments`;
const Home = () => {
  const [image1, setImage1] = useState<any>(null);
  const [image2, setImage2] = useState<any>(null);
  const [result, setResult] = useState<any>(null);
  const [likeState, setLikeState] = useState<number | null>(null);
  const [comment, setComment] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [showMessenger, setShowMessenger] = useState<boolean>();

  const handleClearImages = () => {
    setImage1(null);
    setImage2(null);
    setLikeState(null);
    setComment("");
    setResult(null)
  };
  const handleImageChange = (event: any, setImageFunc: any) => {
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
    setLoading(true);
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
        setLoading(false);
        setResult(data);
        console.log(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const handleLike = () => {
    setLikeState(1);
  };

  const handleDislike = () => {
    setLikeState(0);
  };

  const sendComment = (idPredict: string) => {
    const data = {
      id_predict: idPredict,
      like: likeState,
      comment: comment,
    };

    fetch(urlComments, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => {
        setShowMessenger(true)
        setTimeout(() => {
          setShowMessenger(false);
        }, 3000);
        // Handle the comment submission response
        // console.log(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <>
      <Breadcrumb pageName="Predicts" />
      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5 h-[75vh]">
        <div
          id="FileUpload"
          className="col-span-4 h-[70vh] relative mb-5.5 block w-full cursor-pointer appearance-none rounded border-2 border-dashed border-primary bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5"
        >
          <input
            disabled={image1}
            onChange={handleImage1Change}
            type="file"
            accept="image/*"
            className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
          />
          {image1 && (
            <div className="relative h-full w-full z-10">
              <img
                src={image1.preview}
                alt="Image 1"
                className="object-contain h-full w-full"
              />
            </div>
          )}
          {loading && (
            <div className="relative z-20 items-center justify-center bg-gray-500 bg-opacity-50 w-full h-full mt-[-65vh]">
              <div className="loading w-ful animate-moveUpDown"></div>
              {/* <p>loading ...</p> */}
            </div>
          )}
          {!image1 &&
            <div className="flex flex-col items-center justify-center space-y-3 mt-[22vh]">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M1.99967 9.33337C2.36786 9.33337 2.66634 9.63185 2.66634 10V12.6667C2.66634 12.8435 2.73658 13.0131 2.8616 13.1381C2.98663 13.2631 3.1562 13.3334 3.33301 13.3334H12.6663C12.8431 13.3334 13.0127 13.2631 13.1377 13.1381C13.2628 13.0131 13.333 12.8435 13.333 12.6667V10C13.333 9.63185 13.6315 9.33337 13.9997 9.33337C14.3679 9.33337 14.6663 9.63185 14.6663 10V12.6667C14.6663 13.1971 14.4556 13.7058 14.0806 14.0809C13.7055 14.456 13.1968 14.6667 12.6663 14.6667H3.33301C2.80257 14.6667 2.29387 14.456 1.91879 14.0809C1.54372 13.7058 1.33301 13.1971 1.33301 12.6667V10C1.33301 9.63185 1.63148 9.33337 1.99967 9.33337Z"
                    fill="#3C50E0"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.5286 1.52864C7.78894 1.26829 8.21106 1.26829 8.4714 1.52864L11.8047 4.86197C12.0651 5.12232 12.0651 5.54443 11.8047 5.80478C11.5444 6.06513 11.1223 6.06513 10.8619 5.80478L8 2.94285L5.13807 5.80478C4.87772 6.06513 4.45561 6.06513 4.19526 5.80478C3.93491 5.54443 3.93491 5.12232 4.19526 4.86197L7.5286 1.52864Z"
                    fill="#3C50E0"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.99967 1.33337C8.36786 1.33337 8.66634 1.63185 8.66634 2.00004V10C8.66634 10.3682 8.36786 10.6667 7.99967 10.6667C7.63148 10.6667 7.33301 10.3682 7.33301 10V2.00004C7.33301 1.63185 7.63148 1.33337 7.99967 1.33337Z"
                    fill="#3C50E0"
                  />
                </svg>
              </span>
              <p>
                <span className="text-primary">Click to upload</span> or
                drag and drop
              </p>
              <p className="mt-1.5">SVG, PNG, JPG </p>
            </div>
          }
        </div>
        <div className="col-span-4 h-[75vh]">
          <div
            id="FileUpload"
            className=" h-[70vh] relative mb-5.5 block w-full cursor-pointer appearance-none rounded border-2 border-dashed border-primary bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5"
          >
            <input
              disabled={image2}
              onChange={handleImage2Change}
              type="file"
              accept="image/*"
              className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
            />
            {image2 && (
            <div className="relative h-full w-full z-10">
              <img
                src={image2.preview}
                alt="Image 2"
                className="object-contain h-full w-full"
              />
            </div>
          )}
            {loading && (
            <div className="relative z-20 items-center justify-center bg-gray-500 bg-opacity-50 w-full h-full mt-[-65vh]">
              <div className="loading w-ful animate-moveUpDown"></div>
              {/* <p>loading ...</p> */}
            </div>
          )}
            {!image2 &&
              <div className="flex flex-col items-center justify-center space-y-3 mt-[22vh] ">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M1.99967 9.33337C2.36786 9.33337 2.66634 9.63185 2.66634 10V12.6667C2.66634 12.8435 2.73658 13.0131 2.8616 13.1381C2.98663 13.2631 3.1562 13.3334 3.33301 13.3334H12.6663C12.8431 13.3334 13.0127 13.2631 13.1377 13.1381C13.2628 13.0131 13.333 12.8435 13.333 12.6667V10C13.333 9.63185 13.6315 9.33337 13.9997 9.33337C14.3679 9.33337 14.6663 9.63185 14.6663 10V12.6667C14.6663 13.1971 14.4556 13.7058 14.0806 14.0809C13.7055 14.456 13.1968 14.6667 12.6663 14.6667H3.33301C2.80257 14.6667 2.29387 14.456 1.91879 14.0809C1.54372 13.7058 1.33301 13.1971 1.33301 12.6667V10C1.33301 9.63185 1.63148 9.33337 1.99967 9.33337Z"
                      fill="#3C50E0"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7.5286 1.52864C7.78894 1.26829 8.21106 1.26829 8.4714 1.52864L11.8047 4.86197C12.0651 5.12232 12.0651 5.54443 11.8047 5.80478C11.5444 6.06513 11.1223 6.06513 10.8619 5.80478L8 2.94285L5.13807 5.80478C4.87772 6.06513 4.45561 6.06513 4.19526 5.80478C3.93491 5.54443 3.93491 5.12232 4.19526 4.86197L7.5286 1.52864Z"
                      fill="#3C50E0"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7.99967 1.33337C8.36786 1.33337 8.66634 1.63185 8.66634 2.00004V10C8.66634 10.3682 8.36786 10.6667 7.99967 10.6667C7.63148 10.6667 7.33301 10.3682 7.33301 10V2.00004C7.33301 1.63185 7.63148 1.33337 7.99967 1.33337Z"
                      fill="#3C50E0"
                    />
                  </svg>
                </span>
                <p>
                  <span className="text-primary">Click to upload</span> or
                  drag and drop
                </p>
                <p className="mt-1.5">SVG, PNG, JPG </p>
              </div>
            }

          </div>
          <div style={{height:"5vh"}}>
            
            <button onClick={handleSubmit} disabled={(!image2 && !image1) || result} className=" handleSubmit bg-blue-500 text-red py-2 px-4 rounded float-right h-[40px]">
              Submit
            </button>
            <button onClick={handleClearImages} disabled={!image2 && !image1} 
              style={{marginRight:'10px'}}
              className=" handleClear bg-blue-500 text-red py-2 px-4 rounded float-right h-[40px]">
                Clear
            </button>
          </div>
        </div>

        <div className="col-span-4 h-[75vh]">
          {result && result.predict_result && (
            <div>
              <div className="h-[30vh]">
                <h1 className="text-lg font-semibold font-size-18">Diagnostic results:</h1>
                <p className="text-lg font-semibold">{result?.predict_result}</p>
              </div>
              <div className="h-[45vh]">
                <div style={{height:"5vh", color:"green"}}>
                  {showMessenger && (
                    <p className="float-right" style={{fontSize:'20px'}}>Comment successfully</p>
                  )}
                </div>
                <h1 style={{height:"5vh"}} className="text-lg font-semibold font-size-18">Do you agree with the result?</h1>
                <div className="flex items-center" style={{width:"100%",height:"8vh"}}>
                  <button onClick={() => handleLike()} className="mr-2">
                    <span>
                    {likeState === 1 ? (
                        <Image width={32} height={32} src={"/images/icon/like-blue.svg"} alt="Liked" />
                      ) : (
                        <Image width={32} height={32} src={"/images/icon/like.svg"} alt="Like" />
                      )}
                    </span>
                  </button>
                  <button onClick={() => handleDislike()} style={{marginLeft:"10px"}}>
                    <span>
                    {likeState === 0 ? (
                        <Image width={32} height={32} src={"/images/icon/dislike-blue.svg"} alt="Liked" />
                      ) : (
                        <Image width={32} height={32} src={"/images/icon/dislike.svg"} alt="Like" />
                      )}
                    </span>
                  </button>
                </div>
                <textarea
                  style={{width:"100%",height:"22vh", padding:'10px'}}
                  placeholder="Enter your comments"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <div style={{height:"5vh"}}>
                  <button 
                    disabled={likeState === null}
                    className=" handleSubmit bg-blue-500 text-red py-2 px-4 rounded float-right h-[40px]"
                    onClick={() => sendComment(result?.id_predict)}
                    style={{marginTop:"15px",color:"white",width:"80px",backgroundColor: likeState === null ? "#808080" : "blue",}}>
                      Submit
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <style>
        {`
          @keyframes moveUpDown {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(65vh);
            }
          }

          .animate-moveUpDown {
            animation: moveUpDown 4s linear infinite;
          }

          .loading {
            width: 100%;
            height: 10px;
            border-radius: 5px;
            background-color: #0573F5;
          }
          .handleSubmit{
            background-color: blue;
            text-color: white;
            color:white;
            width:80px
          }
          .handleSubmit:disabled {
            background-color: #808080;
          }
          .handleClear{
            text-color: white;
            background-color: #cc1e1e;
            color:white;
            width:80px;
          }
        `}
      </style>
    </>
  );
};

export default Home;
