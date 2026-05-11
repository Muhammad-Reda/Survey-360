<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Periode;
use Exception;
use Illuminate\Http\Request;

class PeriodeController extends Controller
{
   public function index(Request $request)
{
    $query = Periode::with('kategori');
    
    if($request->has('kategori_id') && $request->kategori_id != ''){
        $query->where('ktg_id', $request->kategori_id);
    }
    
    if($request->has('search') && $request->search != ''){
        $searchTerm = $request->search;
        $query->where('prd_tgl_mulai', 'like', '%' . $searchTerm . '%');
        $query->orderByRaw("
            CASE 
                WHEN prd_tgl_mulai = ? THEN 1
                WHEN prd_tgl_mulai LIKE ? THEN 2
                ELSE 3
            END ASC, created_at ASC
        ", [$searchTerm, $searchTerm . '%']);
    } else {
        $query->orderBy('created_at', 'ASC'); // Ganti latest() dengan orderBy ASC
    }
    
    $periode = $query->paginate(15);
    
    return response()->json([
        'status' => true,
        'data' => $periode
    ]);
}
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'ktg_id' => 'required',
                'prd_tgl_mulai' => 'required',
                'prd_tgl_selesai' => 'required',
                'prd_status' => 'required'
            ]);
            $periode = Periode::create($validated);
            return response()->json([
                'status' => true,
                'message' => 'berhasil input data',
                'data' => $periode
            ]);
        }catch(Exception $err){
            return response()->json([
                'status' => false,
                'messgae' => 'gagal input data',
                'error' => $err->getMessage() 
            ]);
        }
    }

    public function update(Request $request, $id){
        try{
            $validated = $request->validate([
                'prd_tgl_mulai' => 'required',
                'prd_tgl_selesai' => 'required',
                'prd_status' => 'required'
            ]);
            $periode = Periode::findOrFail($id);
            $periode->update($validated);
             return response()->json([
                'status' => true,
                'message' => 'berhasil input data',
                'data' => $periode
            ]);
        }catch(Exception $err){
            return response()->json([
                'status' => false,
                'messgae' => 'gagal input data',
                'error' => $err->getMessage() 
            ]);
        }
    }

    public function destroy($id){
        $periode = Periode::findOrFail($id);
        $periode->delete();
         return response()->json([
                'status' => true,
                'message' => 'berhasil hapus data',
                'data' => $periode
            ]);
    }
}
