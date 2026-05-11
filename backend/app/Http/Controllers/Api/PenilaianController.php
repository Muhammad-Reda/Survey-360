<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Penilaian;
use App\Models\Responden;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PenilaianController extends Controller
{
    /**
     * Menampilkan daftar penilaian yang sudah masuk.
     */
    public function index(Request $request)
    {
        $query = Penilaian::with(['responden', 'details'])
            ->select('penilaian.*') // Tentukan kolom dari tabel utama
            ->join('responden', 'penilaian.responden_id', '=', 'responden.id'); // Join dengan tabel responden

        // Tambahkan fungsionalitas pencarian berdasarkan nama responden
        if ($request->has('search') && $request->search != '') {
            $searchTerm = $request->search;
            $query->where('responden.svy_nama', 'like', '%' . $searchTerm . '%');
        }

        // Hitung total skor untuk setiap penilaian
        $query->withSum('details as skor_total', 'jawaban');

        $penilaian = $query->latest('penilaian.created_at')->paginate(15);

        return response()->json([
            'status' => true,
            'data' => $penilaian,
        ]);
    }

    /**
     * Menyimpan data penilaian baru dari survei publik.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'prd_id' => 'required|exists:periode,id',
            'svy_nama' => 'required|string|max:255',
            'svy_jabatan' => 'required|string|max:255',
            'svy_nomor_whatsapp' => 'required|string|max:20',
            'details' => 'required|array',
            'details.*.prtn_id' => 'required|exists:pertanyaan,id',
            'details.*.jawaban' => 'required|integer|min:1|max:5',
        ]);

        // Gunakan transaksi database untuk memastikan semua data tersimpan atau tidak sama sekali
        DB::beginTransaction();
        try {
            // 1. Buat data responden terlebih dahulu
            $responden = Responden::create([
                'periode_id' => $validated['prd_id'],
                'svy_nama' => $validated['svy_nama'],
                'svy_jabatan' => $validated['svy_jabatan'],
                'svy_nomor_whatsapp' => $validated['svy_nomor_whatsapp'],
            ]);

            // 2. Buat data header penilaian
            $penilaian = $responden->penilaian()->create([
                'prd_id' => $validated['prd_id'],
            ]);

            // 3. Simpan detail jawaban
            $penilaian->details()->createMany($validated['details']);

            DB::commit();

            return response()->json(['status' => true, 'message' => 'Penilaian berhasil disimpan.'], 201);
        } catch (Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => 'Terjadi kesalahan saat menyimpan penilaian.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}