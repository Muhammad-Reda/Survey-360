export default function InputSelect({ 
  options = [], 
  value = "", 
  onChange, 
  name,
  placeholder = "Pilih sebuah pilihan" 
}) {
  // Validasi options
  const safeOptions = Array.isArray(options) ? options : [];
  
  return (
    // <div className="max-w-md mx-auto">
    <div>

      <div className="select-wrapper relative">
        <select
          name={name}
          value={value || ""}
          onChange={onChange}
          className="appearance-none h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-blue-500 focus:outline-hidden focus:ring-3 focus:ring-blue-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-blue-800 text-gray-800 dark:text-white/90"
        >
          <option value="" disabled className="text-gray-400 dark:bg-gray-900 dark:text-gray-400">
            {placeholder}
          </option>
          {safeOptions.map((option, index) => (
            <option 
              key={option.value || index} 
              value={option.value || ""}
              className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
            >
              {option.label || "Unknown"}
            </option>
          ))}
        </select>
        <svg className="w-5 h-5 text-gray-400 absolute top-1/2 right-4 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
}