"use client" 
import { useEffect, useState } from "react";
import { Metadata } from "next";
import axios from "axios";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Calendar Page | Next.js E-commerce Dashboard Template",
  description: "This is Calendar page for TailAdmin Next.js",
  // other metadata
};


const url = 'http://127.0.0.1:8000'
const historyEndpoint = `${url}/api/history`
const deletePredicts = `${url}/api/delete-predicts`

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

  const deletePredict = async (idPredictToDelete: any) => {
    try {
      await axios.post(deletePredicts, {
        id_predict_list: [idPredictToDelete],
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });
  
      const response = await axios.get(historyEndpoint, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setHistoryData(response.data);
  
    } catch (error) {
      console.error("Error deleting predict:", error);
    }
  };

  return (
    <>
      <Breadcrumb pageName="History" />
      {/* Render your history data here */}
      <div className="w-full px-4">
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="w-[20%] text-left">ID Predict</th>
              <th className="w-[20%] text-left">Image 1</th>
              <th className="w-[20%] text-left">Image 2</th>
              <th className="w-[20%] text-left">Created</th>
              <th className="w-[20%] ">Delete</th>
            </tr>
          </thead>
          <tbody>
            {historyData.map((item) => (
              <tr key={item.id} className="bg-gray-200 mb-8">
                <td className="w-[20%]">
                  <Link key={item.id_predict} href={`/home/history/${item.id_predict}`}>
                    <p style={{color:'blue'}}>{item.id_predict}</p>
                  </Link>
                </td>
                <td className="w-[20%]">
                  <img src={url+"/"+item.url_image1} alt="Image 1" className="w-16 h-16" />
                </td>
                <td className="w-[20%]">
                  <img src={url+"/"+item.url_image2} alt="Image 2" className="w-16 h-16" />
                </td>
                <td className="w-[20%]">{item.created}</td>
                <td className="w-[20%] flex justify-center items-center">
                  <Image width={32} height={32} src={"/images/icon/trash.svg"} alt="Liked" onClick={() => deletePredict(item.id_predict)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default HistoryPage;
