"use client"  
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import axios from 'axios';
export const metadata: Metadata = {
  title: "Trang Đăng nhập | Next.js E-commerce Dashboard Template",
  description: "Đây là trang đăng nhập cho TailAdmin Next.js",
  // các thông tin metadata khác
};

const url = 'http://127.0.0.1:8000'
const verifyOtp = `${url}/api/verify-forgot-password-otp`
const sendOtp = `${url}/api/send-forgot-password-otp`

const VerifyOtp: React.FC = () => {
  const router = useRouter();
  const [otp_code, setOtpcode] = useState("");
  const [error, setError] = useState<any>(null);
  const [success, setSuccess] = useState<any>(null);
  const [canResend, setCanResend] = useState(true);
  const email_or_parent_id = localStorage.getItem('email_or_parent_id');

  const handleOtpcode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtpcode(e.target.value);
  };
  
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const response = await axios.post(verifyOtp, { email_or_parent_id , otp_code});
      // console.log("Registration successful:", response.data);
      if(response.data){
        localStorage.setItem('token', response.data?.token);
        router.push('/change-password');
      }
    } catch (error: any) {
      setError(error.response.data.error || "Registration failed");
    }
  };

  const ResendOTP = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    
    // Kiểm tra xem có thể gửi lại OTP không
    if (canResend) {
      try {
        const response = await axios.post(sendOtp, { email_or_parent_id });
        console.log("Resent OTP successful:", response.data);
        if(response.data){
          setSuccess("OTP code has been sent back");
          setCanResend(false);
          setTimeout(() => {
            // Cho phép gửi lại sau 30s
            setCanResend(true);
          }, 30000); // 30s
        }
      } catch (error: any) {
        setError(error.response?.data?.message || "Resending OTP failed");
      }
    } else {
      setSuccess("Code OTP can only be resend after 30 seconds");
    }
  };
  return (
    <>
      {/* <Breadcrumb pageName="Sign In" /> */}

      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap items-center">
          <div className="hidden w-full xl:block xl:w-1/2">
            <div className="py-17.5 px-26 text-center">
              <Link className="mb-5.5 inline-block" href="/">
                <Image
                  className="hidden dark:block"
                  src={"/images/logo/logo.svg"}
                  alt="Logo"
                  width={176}
                  height={32}
                />
                <Image
                  className="dark:hidden"
                  src={"/images/logo/logo-dark.svg"}
                  alt="Logo"
                  width={176}
                  height={32}
                />
              </Link>

              <p className="2xl:px-20">
                The Chest X-ray Diagnostic project utilizes cutting-edge AI algorithms for precise image analysis and diagnostics.
              </p>
              {/* ảnh */}

            </div>
          </div>

          <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <span className="mb-1.5 block font-medium">Start for free</span>
              <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                Enter the OTP code sent to the Email
              </h2>

              <form  onSubmit={handleSubmit}>
                <div className="mb-4">
                  {success && <h2>{success}</h2>}
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Otp Code
                  </label>
                  <div className="relative">
                    <input
                      value={otp_code}
                      onChange={handleOtpcode}
                      type="otp_code"
                      placeholder="Enter your otp"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />

                    <span className="absolute right-4 top-4">
                      <svg
                        className="fill-current"
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.5">
                          <path
                            d="M19.2516 3.30005H2.75156C1.58281 3.30005 0.585938 4.26255 0.585938 5.46567V16.6032C0.585938 17.7719 1.54844 18.7688 2.75156 18.7688H19.2516C20.4203 18.7688 21.4172 17.8063 21.4172 16.6032V5.4313C21.4172 4.26255 20.4203 3.30005 19.2516 3.30005ZM19.2516 4.84692C19.2859 4.84692 19.3203 4.84692 19.3547 4.84692L11.0016 10.2094L2.64844 4.84692C2.68281 4.84692 2.71719 4.84692 2.75156 4.84692H19.2516ZM19.2516 17.1532H2.75156C2.40781 17.1532 2.13281 16.8782 2.13281 16.5344V6.35942L10.1766 11.5157C10.4172 11.6875 10.6922 11.7563 10.9672 11.7563C11.2422 11.7563 11.5172 11.6875 11.7578 11.5157L19.8016 6.35942V16.5688C19.8703 16.9125 19.5953 17.1532 19.2516 17.1532Z"
                            fill=""
                          />
                        </g>
                      </svg>
                    </span>
                  </div>
                </div>
                {error && <p className="text-red-500">{error}</p>}

                <div className="mb-5">
                  <input
                    type="submit"
                    value="Submit"
                    className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                  />
                </div>
                <div className="mt-6 text-center">
                  <p>
                    Resend OTP code?{" "}
                    <p className="text-primary cursor-pointer" onClick={ResendOTP}>
                      Resend OTP
                    </p>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerifyOtp;
