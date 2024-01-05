"use client";
import "./globals.css";
import "./data-tables-css.css";
import "./satoshi.css";
import { useState, useEffect } from "react";
import Loader from "@/components/common/Loader";
import jwt from 'jsonwebtoken';
import { useRouter, usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathnane = usePathname();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken: any = jwt.decode(token);
        if (decodedToken && decodedToken.exp) {
          const expirationTime = decodedToken.exp * 1000;
          const currentTime = new Date().getTime();
          if (currentTime <= expirationTime) {
            if (pathnane == 'signin' || pathnane == 'signup' || pathnane == '/' || pathnane == 'verify-otp' || pathnane == 'forgot-password' || pathnane == 'change-password') {
              router.push('/home');
            }
          }
        }
      } catch (error) {
        console.error('Error decoding or checking token expiration:', error);
      }
    }
  }, []);

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
          {loading ? (
            <Loader />
          ) : (
            <div className="flex h-screen overflow-hidden">
              <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                <main>
                  <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                    {children}
                  </div>
                </main>
              </div>
            </div>
          )}
        </div>
      </body>
    </html>
  );
}
