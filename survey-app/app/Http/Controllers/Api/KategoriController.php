<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Kategori;
use Exception;
use Illuminate\Http\Request;

class KategoriController extends Controller
{
    public function index(Request $request){
         // Mulai query builder
        $query = Kategori::query();

        // Cek jika ada parameter 'search' dan terapkan logika pencarian & pengurutan
        if($request->has('search') && $request->search !=''){
         $searchTerm = $request->search;

         // Filter berdasarkan kata kunci pencarian
         $query->where('ktg_nama', 'like', '%' .$searchTerm . '%');

         // Urutkan berdasarkan relevansi, lalu berdasarkan yang terbaru
         $query->orderByRaw("
            CASE
                WHEN ktg_nama = ? THEN 3
                WHEN ktg_nama LIKE ? THEN 2
                ELSE 1
            END DESC, created_at DESC
         ", [$searchTerm, $searchTerm . '%']);
        }else{
            // Jika tidak ada pencarian, urutkan berdasarkan yang terbaru saja
            $query->latest();
        }

        $kategori = $query->paginate(15);
        return response()->json([
            'status' => true,
            'data' => $kategori
        ]);
    }

    public function store(Request $request){
        try{
            $validated = $request->validate([
                'ktg_nama' => 'required'
            ]);
            $kategori = Kategori::create($validated);
            return response()->json([
                'status' => true,
                'message' => 'berhasil input kategori',
                'data' => $kategori
            ]);
        }catch(Exception $err){
            return response()->json([
                'status' => false,
                'message' => 'gagal input kategori',
                'error' => $err->getMessage()
            ]);
        }
    }

    public function update(Request $request, $id){
        try{
            $validated = $request->validate([
                'ktg_nama' => 'required'
            ]);
            $kategori = Kategori::findOrFail($id);
            $kategori->update($validated);

            return response()->json([
                'status' => true,
                'message' => 'berhasil update data',
                'data' => $kategori
            ]);
        }catch(Exception $err){
            return response()->json([
                'status' => false,
                'message' => 'gagal update data',
                'error' => $err->getMessage()
            ]);
        }
    }

    public function destroy($id){
        $kategori = Kategori::findOrFail($id);
        $kategori->delete();

        return response()->json([
            'status' => true,
            'message' => 'berhasil hapus data',
            'data' => $kategori
        ]);
    }
}
