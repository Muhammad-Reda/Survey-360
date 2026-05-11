import DataTable from "react-data-table-component";
import Button from "../../../components/ui/button/Button";
import { PencilIcon, TrashBinIcon, FolderIcon } from "../../../icons";
export default function TabelPeriode({
  dataPeriode,
  loading,
  openModalHapus,
  openModalEdit,
}) {
  const columns = [
    {
      name: "No",
      selector: (_, index) => index + 1,
      width: "70px",
      center: true,
      sortable: true,
    },
    {
      name: "Kategori",
      selector: (row) => row.kategori?.ktg_nama,
      sortable: true,
      wrap: true,
    },
    {
      name: "Tanggal Mulai",
      selector: (row) =>
        new Date(row.prd_tgl_mulai).toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
      sortable: true,
      wrap: true,
    },
    {
      name: "Tanggal Selesai",
      selector: (row) =>
        new Date(row.prd_tgl_selesai).toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
      sortable: true,
      wrap: true,
    },
    {
      name: "Status",
      selector: (row) => row.prd_status,
      sortable: true,
    },
    {
      name: "Aksi",
      width: "220px",
      button: true,
      cell: (row) => (
        <div className="flex gap-2 justify-center">
          <Button
            size="sm"
            variant="gray"
            startIcon={<PencilIcon className="w-4 h-4" />}
            onClick={() => openModalEdit(row)}
          >
            Edit
          </Button>

          <Button
            size="sm"
            variant="danger"
            startIcon={<TrashBinIcon className="w-4 h-4" />}
            onClick={() => openModalHapus(row.id)}
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
        data={dataPeriode.slice().reverse()}
        progressPending={loading}
        pagination
        highlightOnHover
        responsive
        fixedHeader
        fixedHeaderScrollHeight="500px"
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
              Tidak ada data periode.
            </span>
          </div>
        }
      />
    </div>
  );
}
