import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const metadata: Metadata = {
  title: "TailAdmin | Next.js E-commerce Dashboard Template",
  description: "This is Home Blog page for TailAdmin Next.js",
  // other metadata
};

export default function Home() {
  // useEffect(() => {
  //   const handleRouteChange = () => {
  //     // Load lại trang khi có thay đổi route
  //     window.location.reload();
  //   };
  // }, []);
  // };
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
      </div>
    </main>
  );
}
