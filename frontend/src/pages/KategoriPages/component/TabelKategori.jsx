import DataTable from "react-data-table-component";
import Button from "../../../components/ui/button/Button";
import { PencilIcon, TrashBinIcon, FolderIcon } from "../../../icons";
// import Button from "../../../components/ui/button/Button";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../../components/ui/table";
export default function TabelKategori({ loading, dataKategori, openModalHapus, openModalEdit }) {

  // Kolom-kolom DataTable
  const columns = [
    {
      name: "No",
      width: "70px",
      selector: (row, index) => index + 1,
      sortable: true,
      ignoreRowClick: true,   // ⬅ row tidak clickable
      // allowOverflow: true,    // ⬅ konten bebas overflow tanpa wrapper
      cell: (row, index) => (
        <span className="text-gray-700 dark:text-gray-300 font-semibold">
          {index + 1}
        </span>
      ),
    },
    {
      name: (
        <div className="flex items-center gap-2 font-bold">
          {/* <FolderIcon className="w-4 h-4 text-gray-700 dark:text-gray-200" /> */}
          Nama Kategori
        </div>
      ),
      selector: (row) => row.ktg_nama,
      sortable: true,
      cell: (row) => (
        <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
          {/* <div className="w-2 h-2 rounded-full bg-blue-500"></div> */}
          {row.ktg_nama}
        </div>
      ),
    },
    {
      name: "Aksi",
      width: "220px",
      cell: (row) => (
        <div className="flex gap-3">
          <Button
            as="div"
            variant="gray"
            size="sm"
            onClick={() => openModalEdit(row)}
            className="cursor-pointer"
            startIcon={<PencilIcon className="w-4 h-4" />}
          >
            Edit
          </Button>

          <Button
            as="div"
            variant="danger"
            size="sm"
            onClick={() => openModalHapus(row.id)}
            className="cursor-pointer"
            startIcon={<TrashBinIcon className="w-4 h-4" />}
          >
            Hapus
          </Button>

        </div>
      ),
    },
  ];

 
  const customStyles = {
    headCells: {
      style: {
        backgroundColor: "#f9fafb",
        color: "#6b7280", // gray-500
        fontWeight: 600,
        fontSize: "12px",
        paddingTop: "14px",
        paddingBottom: "14px",
      },
    },
    rows: {
      style: {
        fontSize: "14px",
        color: "#4b5563", // gray-600
        paddingTop: "12px",
        paddingBottom: "12px",
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
        data={dataKategori}
        customStyles={customStyles}
        
        pagination
         highlightOnHover
        responsive
        fixedHeader
        fixedHeaderScrollHeight="500px" 
        progressPending={loading}
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
              Tidak ada data kategori.
            </span>
          </div>
        }
      />
    </div>
  );
}
