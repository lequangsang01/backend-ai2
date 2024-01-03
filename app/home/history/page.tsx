"use client" 
import { useEffect, useState } from "react";
import { Metadata } from "next";
import axios from "axios";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Calendar Page | Next.js E-commerce Dashboard Template",
  description: "This is Calendar page for TailAdmin Next.js",
  // other metadata
};


const url = 'http://127.0.0.1:8000'
const historyEndpoint = `${url}/api/history`

const HistoryPage = () => {
  const [historyData, setHistoryData] = useState<any[]>([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get(historyEndpoint, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setHistoryData(response.data);
      } catch (error) {
        console.error("Error fetching history:", error);
      }
    };

    fetchHistory();
  }, []);

  return (
    <>
      <Breadcrumb pageName="History" />
      {/* Render your history data here */}
      <div className="w-full px-4">
        <table className="w-full table-auto">
          <thead>
            <tr className="text-left">
              <th className="w-1/4">ID Predict</th>
              <th className="w-1/4">Image 1</th>
              <th className="w-1/4">Image 2</th>
              <th className="w-1/4">Created</th>
            </tr>
          </thead>
          <tbody>
            {historyData.map((item) => (
              <tr key={item.id} className="bg-gray-200 mb-8">
                <Link key={item.id_predict} href={`/home/history/${item.id_predict}`}>
                  {item.id_predict}
                </Link>
                <td className="w-1/4">
                  <img src={url+"/"+item.url_image1} alt="Image 1" className="w-16 h-16" />
                </td>
                <td className="w-1/4">
                  <img src={url+"/"+item.url_image2} alt="Image 2" className="w-16 h-16" />
                </td>
                <td className="w-1/4">{item.created}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default HistoryPage;
