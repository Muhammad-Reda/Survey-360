import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import apiClient from "../../../services/Api";
import DataTable from "react-data-table-component";
import { FolderIcon } from "../../../icons";

export default function TabelNilai({ dataResponden }) {
  // Kolom DataTable
  const columns = [
    {
      name: "No",
      selector: (_, index) => index + 1,
      width: "70px",
      sortable: true,
      center: true,
    },
    {
      name: "Nama",
      selector: (row) => row.responden?.svy_nama,
      sortable: true,
      wrap: true,
    },
    {
      name: "Jabatan",
      selector: (row) => row.responden?.svy_jabatan,
      sortable: true,
      wrap: true,
    },
    {
      name: "Nomor Whatsapp",
      selector: (row) => row.responden?.svy_nomor_whatsapp,
      sortable: true,
    },
    {
      name: "Tanggal",
      selector: (row) => new Date(row.created_at).toLocaleDateString("id-ID"),
      sortable: true,
    },
    {
      name: "Skor Total",
      selector: (row) => row.skor_total,
      sortable: true,
      center: true,
    },
  ];

  // Custom Style supaya mirip UI komponen kamu
  const customStyles = {
    rows: {
      style: {
        paddingTop: "12px",
        paddingBottom: "12px",
        fontSize: "14px",
        color: "#4b5563", // gray-600
      },
    },
    headCells: {
      style: {
        backgroundColor: "#f9fafb",
        fontWeight: 600,
        fontSize: "12px",
        color: "#6b7280", // gray-500
        paddingTop: "14px",
        paddingBottom: "14px",
      },
    },
    table: {
      style: {
        borderRadius: "12px",
      },
    },
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <DataTable
        columns={columns}
        data={dataResponden}
        pagination
        
        highlightOnHover
        responsive
        customStyles={customStyles}
        progressComponent={
          <div className="py-10 flex flex-col items-center gap-3 w-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <span className="text-gray-500 dark:text-gray-400 font-medium">
              Loading data...
            </span>
          </div>
        }
        noDataComponent={
          <div className="py-12 flex flex-col items-center gap-3 w-full">
            <FolderIcon className="w-12 h-12 text-gray-300 dark:text-gray-600" />
            <span className="text-gray-500 dark:text-gray-400 font-medium">
              Tidak ada data nilai.
            </span>
          </div>
        }
        fixedHeader
        fixedHeaderScrollHeight="500px"
      />
    </div>
  );
}
