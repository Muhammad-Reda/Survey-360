<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Responden;
use Exception;
use Illuminate\Http\Request;

class RespondenController extends Controller
{
    public function index()
    {
        $responden = Responden::latest()->paginate(15);
        return response()->json([
            'status' => true,
            'data' => $responden
        ]);
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'periode_id' => 'required',
                'svy_nama' => 'required',
                'svy_jabatan' => 'required',
                'svy_nomor_whatsapp' => 'required'
            ]);
            $responden = Responden::create($validated);
            return response()->json([
                'status' => true,
                'message' => 'berhasil input data',
                'data' => $responden
            ]);
        }catch(Exception $err){
            return response()->json([
                'status' => false,
                'message' => 'gagal input data',
                'error' => $err->getMessage()
            ]);
        }
    }

    public function update(Request $request, $id){
        try{
             $validated = $request->validate([
                'periode_id' => 'required',
                'svy_nama' => 'required',
                'svy_jabatan' => 'required',
                'svy_nomor_whatsapp' => 'required'
            ]);
            $responden = Responden::findOrFail($id);
            $responden->update($validated);
            return response()->json([
                'status' => true,
                'message' => 'berhasil update data',
                'data' => $responden
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
        $responden = Responden::findOrFail($id);
        $responden->delete();
        return response()->json([
            'status' => true,
                'message' => 'berhasil hapus data',
                'data' => $responden
        ]);
    }
}
