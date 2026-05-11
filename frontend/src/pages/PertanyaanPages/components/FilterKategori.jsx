export default function FilterKategori({selectedCategory, categories, onCategoryChange}){
    const categoriesList = categories || []
    return(
        <>
           <div className="w-full sm:w-1/4">
            <select
                value={selectedCategory}
                onChange={(e) => onCategoryChange(e.target.value)}
                className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-800 dark:border-gray-600"
            >
                {/* Opsi untuk menampilkan semua data */}
                <option value="">Semua Kategori</option>
                
                {/* Mapping data kategori */}
                {categoriesList.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                        {cat.ktg_nama}
                    </option>
                ))}
            </select>
        </div>
        </>
    )
}