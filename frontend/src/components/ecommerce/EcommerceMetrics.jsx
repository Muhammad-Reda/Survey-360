import { useEffect, useState } from "react";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  BoxIconLine,
  GroupIcon,
} from "../../icons";
import Badge from "../ui/badge/Badge";
import apiClient from "../../services/Api";

export default function EcommerceMetrics() {
  const [data, setData] = useState({
    responden:[],
    survei:[]
  })

  const fetchData = async () => {
    try {
      // Jalankan kedua request API secara paralel untuk efisiensi
      const [responseResponden, resSurvei] = await Promise.all([
        apiClient.get("/responden"),
        apiClient.get("/survey")
      ]);
      
      // Ekstrak data dari masing-masing response
      const dataResponden = responseResponden.data.data.data;
      const dataSurvei = resSurvei.data.survey; // Sesuaikan dengan struktur response API survei Anda
      
      // Perbarui state satu kali dengan semua data baru
      setData({ responden: dataResponden, survei: dataSurvei });
    } catch (err) {
      console.log("Error fetch data", err.response ? err.response.data : err.response.message)
    }
  }

  useEffect(() => {
    fetchData()
  },[])
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Responden
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {data.responden.length}
            </h4>
          </div>
          {/* <Badge color="success">
            <ArrowUpIcon />
            11.01%
          </Badge> */}
        </div>
      </div>
      {/* <!-- Metric Item End --> */}

      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <BoxIconLine className="text-gray-800 size-6 dark:text-white/90" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Survey
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {data.survei.length}
            </h4>
          </div>

          {/* <Badge color="error">
            <ArrowDownIcon />
            9.05%
          </Badge> */}
        </div>
      </div>
      {/* <!-- Metric Item End --> */}
    </div>
  );
}
