import { Link } from "react-router";
import GridShape from "../../components/common/GridShape";
import PageMeta from "../../components/common/PageMeta";

export default function ThankYou() {
  return (
    <>
      <PageMeta
        title="Terima Kasih - Survei Selesai"
        description="Terima kasih telah meluangkan waktu untuk mengisi survei kami. Kontribusi Anda sangat berharga."
      />
      <div className="relative flex flex-col items-center justify-center min-h-screen p-6 overflow-hidden z-1">
        <GridShape />
        
        <div className="mx-auto w-full max-w-[242px] text-center sm:max-w-[472px]">
          {/* Bagian Icon/Gambar - Bisa diganti dengan ilustrasi sukses */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center justify-center w-20 h-20 bg-green-100 rounded-full dark:bg-green-500/10">
              <svg
                className="w-10 h-10 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
          </div>

          <h1 className="mb-4 font-bold text-gray-800 text-title-md dark:text-white/90 xl:text-title-2xl">
            Terima Kasih!
          </h1>

          <p className="mt-4 mb-10 text-base text-gray-700 dark:text-gray-400 sm:text-lg">
            Data survei Anda telah berhasil kami terima. Masukan Anda sangat membantu kami untuk menjadi lebih baik lagi ke depannya.
          </p>

          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-lg border border-transparent bg-primary px-6 py-3 text-sm font-medium text-white shadow-theme-xs hover:bg-primary-dark transition-colors dark:bg-brand-500"
          >
            Kembali ke Beranda
          </Link>
        </div>

        {/* Footer */}
        <p className="absolute text-sm text-center text-gray-500 -translate-x-1/2 bottom-6 left-1/2 dark:text-gray-400">
          &copy; {new Date().getFullYear()} - TailAdmin
        </p>
      </div>
    </>
  );
}