import { useMemo } from "react";
import Button from "../../ui/button/Button";
import DataTable from "react-data-table-component";
import { PencilIcon, TrashBinIcon, FolderIcon } from "../../../icons";
export default function BasicTableOne({
  onModalEdit,
  onModalHapus,
  dataSurvey,
}) {
  // ---- Columns ----
  const columns = useMemo(
    () => [
      {
        name: "No",
        width: "70px",
        selector: (row, index) => index + 1,
        sortable: false,
      },
      {
        name: "Title",
        selector: (row) => row.title,
        sortable: true,
        wrap: true,
      },
      {
        name: "Description",
          grow: 2,
        selector: (row) => row.description,
        sortable: false,
        wrap: true,
      },
      {
        name: "Tanggal Buat",
        selector: (row) =>
          new Date(row.created_at).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
          }),
        sortable: true,
      },
      {
        name: "Link Survei",
        cell: (row) => (
          <a className="text-blue-600 underline cursor-pointer"
          href={`/survey/${row.slug}`}
          target="blank"
          rel="noopener noreferrer"
          >
            https://survey360.generasiumatterbaik.com/survey/{row.slug}
          </a>
        ),
        sortable: false,
        wrap: true,
      },
      {
        name: "Aksi",
        grow: 2,
        ignoreRowClick: true,
        allowOverflow: true,
        cell: (row) => (
          <div className="flex gap-2">
            <Button
              as="div"
              size="sm"
              variant="gray"
              onClick={() => onModalEdit(row)}
              className="cursor-pointer"
              startIcon={<PencilIcon className="w-4 h-4" />}
            >
              Edit
            </Button>

            <Button
              as="div"
              size="sm"
              variant="danger"
              onClick={() => onModalHapus(row)}
              className="cursor-pointer"
              startIcon={<TrashBinIcon className="w-4 h-4" />}
            >
              Hapus
            </Button>
          </div>
        ),
      },
    ],
    []
  );

  // ---- Data dibalik agar seperti sebelumnya ----
  const dataReversed = [...dataSurvey].reverse();

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <DataTable
        columns={columns}
        data={dataReversed}
        highlightOnHover
        
        responsive
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
              Tidak ada data survey.
            </span>
          </div>
        }
         pagination
         
        
        fixedHeader
        fixedHeaderScrollHeight="500px" 
        customStyles={{
          headRow: {
            style: {
              backgroundColor: "rgba(243, 244, 246, 0.8)", // gray-100
              borderBottom: "1px solid #e5e7eb",
            },
          },
          headCells: {
            style: {
              fontSize: "12px",
              fontWeight: "600",
              color: "#6b7280", // gray-500
              padding: "14px",
            },
          },
          cells: {
            style: {
              padding: "14px",
              fontSize: "14px",
              color: "#6b7280",
            },
          },
        }}
      />
    </div>
  );
}
