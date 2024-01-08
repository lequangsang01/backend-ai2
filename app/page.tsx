"use client"
import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

// export const metadata: Metadata = {
//   title: "Chest X-ray Diagnostic",
//   description: "For precise image analysis and diagnostics",
//   // other metadata
// };

export default function Home() {
  useEffect(() => {
    if (localStorage.getItem('reload')) {
      localStorage.removeItem('reload');
      window.location.reload();
    }
  }, []);


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <div className="fixed top-0 right-0 flex items-center p-4">
          <button className="bg-blue-500 hover:bg-blue-600 text-back font-bold py-2 px-4 rounded mr-2">
            <Link href="/signup">Sign up</Link>
          </button>
          <button className="bg-green-500 hover:bg-green-600 text-back font-bold py-2 px-4 rounded">
            <Link href="/signin">Login</Link>
          </button>
        </div>
        <div className="w-[100%] flex justify-between">
          <div className="w-[50%] h-[80vh]">
          <Image
                src={"/images/intro.jpg"}
                alt="Logo"
                width={520}
                height={720}
              />
          </div>
          <div className="text-center w-[50%]">
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
            <p >
              The Chest X-ray Diagnostic project utilizes cutting-edge AI algorithms for precise image analysis and diagnostics.
            </p>
            {/* ảnh */}
          </div>
        </div>
      </div>


    </main>
  );
}
