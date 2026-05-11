import { useCallback, useEffect, useState } from "react";
import TabelNilai from "./components/TabelNilai";
import Search from "../../components/Search/Search";
import apiClient from "../../services/Api";
import debounce from "lodash.debounce";
import Button from "../../components/ui/button/Button";
import ComponentCard from "../../components/common/ComponentCard"

export default function PenilaianPage() {
  const [dataResponden, setDataResponden] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    lastPage: 1,
    perPage: 15,
    total: 0,
  });
  const [searchQuery, setSearchQuery] = useState("");

  const fetchData = async () => {
    setLoading(true);

    try {
      const params = new URLSearchParams();
      if (searchQuery) {
        params.append("search", searchQuery);
      }
      if (currentPage) {
        params.append("page", currentPage);
      }
      const url = `/penilaian?${params.toString()}`;
      const response = await apiClient.get(url);
      const pagination = response.data.data;
      const data = response.data.data.data; // Ambil array 'data' dari dalam objek paginasi
      setDataResponden(data);
      setPagination({
        currentPage: pagination.current_page,
        lastPage: pagination.last_page,
        perPage: pagination.per_page,
        total: pagination.total,
      });
    } catch (err) {
      console.log("Error fetched data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchQuery, currentPage]);

  const debounceSearch = useCallback(
    debounce((query) => {
      setCurrentPage(1);
      setSearchQuery(query);
    }, 500),
    []
  );

  function handleNextPage() {
    if (currentPage < pagination.lastPage) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  }

  function handlePrevPage() {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  }

  // console.log("Data responden", dataResponden);
  return (
    <>
      <div className="space-y-6">
        <ComponentCard>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
            <div className="w-full sm:w-auto">
              <Search onSearch={debounceSearch} />
            </div>
          </div>
          <TabelNilai dataResponden={dataResponden} />
          {/* <div className="flex gap-2">
            <Button
              size="sm"
              onClick={handlePrevPage}
              disabled={pagination.currentPage <= 1 || loading}
            >
              Previous
            </Button>
            <Button
              size="sm"
              onClick={handleNextPage}
              disabled={pagination.currentPage >= pagination.lastPage || loading}
            >
              Next
            </Button>

          </div> */}
        </ComponentCard>
      </div>
    </>
  );
}
