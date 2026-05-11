<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Pertanyaan;
use Exception;
use Illuminate\Http\Request;

class PertanyaanController extends Controller
{
    public function index(Request $request){
        // Mulai query builder
        $query = Pertanyaan::with('kategori');

        // Cek jika ada parameter 'kategori_id' di request
        if ($request->has('kategori_id') && $request->kategori_id != '') {
            // Terapkan filter where
            $query->where('ktg_id', $request->kategori_id);
        }

        // Cek jika ada parameter 'search' dan terapkan logika pencarian & pengurutan
        if ($request->has('search') && $request->search != '') {
            $searchTerm = $request->search;
            
            // Filter berdasarkan kata kunci pencarian
            $query->where('prtn_isi', 'like', '%' . $searchTerm . '%');

            // Urutkan berdasarkan relevansi, lalu berdasarkan yang terbaru
            $query->orderByRaw("
                CASE
                    WHEN prtn_isi = ? THEN 3
                    WHEN prtn_isi LIKE ? THEN 2
                    ELSE 1
                END DESC, created_at DESC
            ", [$searchTerm, $searchTerm . '%']);
        } else {
            // Jika tidak ada pencarian, urutkan berdasarkan yang terbaru saja
            $query->latest();
        }

        $pertanyaan = $query->paginate(15);
        return response()->json([
                'status' => true,
                'data' => $pertanyaan
            ]);
    }

    public function store(Request $request){
      try{
        $validated = $request->validate([
            'ktg_id' => 'required',
            'prtn_isi' => 'required'
        ]);
        $pertanyaan = Pertanyaan::create($validated);
         return response()->json([
                'status' => true,
                'message' => 'berhasil input data',
                'data' => $pertanyaan
            ]);
      }catch(Exception $err){
        return response()->json([
                'status' => false,
                'messgae' => 'gagal input data',
                'error' => $err->getMessage() 
            ]);
      }
    }

    public function update(Request $request,$id){
        try{
            $validated = $request->validate([
            'ktg_id' => 'required',
            'prtn_isi' => 'required'
        ]);
        $pertanyaan = Pertanyaan::findOrFail($id);
        $pertanyaan->update($validated);

         return response()->json([
                'status' => true,
                'message' => 'berhasil update data',
                'data' => $pertanyaan
            ]);
        }catch(Exception $err){
             return response()->json([
                'status' => false,
                'messgae' => 'gagal update data',
                'error' => $err->getMessage() 
            ]);
        }
    }

    public function destroy($id){
        $pertanyaan = Pertanyaan::findOrFail($id);
        $pertanyaan->delete();

        return response()->json([
            'status' => true,
            'message' => 'Berhasil hapus data',
            'data' => $pertanyaan
        ]);
    }
}
