<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Survey;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class GenerateSurveyController extends Controller
{
    public function index(Request $request){
        $query = Survey::query();

        if($request->has('search') && $request->search != ''){
            $searchTerm = $request->search;
            $query->where('title', 'like', '%' . $searchTerm . '%');
            $query->orderByRaw("
            CASE 
            WHEN title = ? THEN 3
            WHEN title LIKE ? THEN 2
            ELSE 1
            END DESC, created_at DESC
            ", [$searchTerm, $searchTerm. '%']);
        }else{
            $query->latest();
        }
        $survey = $query->paginate(15);
        return response()->json([
            'status' => true,
            'survey' => $survey
        ]);
    }
    public function generateLink(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required',
            'description' => 'required',
            'period_id' => 'required|exists:periode,id',
            'category_id' => 'required|exists:kategori,id',
            'status' => 'required'
        ]);

        DB::beginTransaction();
        try {

            $survey = Survey::create([
                'title' => $validated['title'],
                'description' => $validated['description'],
                'period_id' => $validated['period_id'],
                'category_id' => $validated['category_id'],
                'user_id' => auth()->id(),
                'slug' => Str::slug($validated['title']) . '-' . Str::lower(Str::random(6)),
                'status' => $validated['status']
            ]);

            DB::commit();

            return response()->json([
                'status' => true,
                'message' => 'berhasil membuat draf survei. Silahkan tambahakan pertanyaan.',
                'url_link' => url("/api/surveys/{$survey->slug}/pertanyaan"),
                'data' => $survey
            ], 201);
        } catch (Exception $err) {
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => 'gagal membuat survey',
                'error' => $err->getMessage()
            ], 500);
        }
    }

    /**
     * Memperbarui data survei, terutama untuk mengubah status.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        // Validasi input, 'sometimes' berarti field tidak wajib ada,
        // tapi jika ada, harus memenuhi aturan.
        $validated = $request->validate([
            'title'       => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'status'      => 'sometimes|required|boolean',
        ]);

        try {
            $survey = Survey::findOrFail($id);
            $survey->update($validated);

            return response()->json([
                'status'  => true,
                'message' => 'Survei berhasil diperbarui.',
                'data'    => $survey,
            ]);
        } catch (Exception $err) {
            return response()->json([
                'status'  => false,
                'message' => 'Gagal memperbarui survei.',
                'error'   => $err->getMessage(),
            ], 500);
        }
    }

    public function getSurvey($slug)
    {
        // Eager load relasi 'category' dan 'category.questions'
        // Asumsi: Model Survey punya relasi 'category()' dan Model Kategori punya relasi 'pertanyaan()'
        $survey = Survey::with(['category.pertanyaan'])
                        ->where('slug', $slug)->first();

        if (!$survey) {
            return response()->json([
                'status' => false,
                'message' => 'survey tidak ditemukan'
            ], 404);
        }

        if ($survey->status == false){
            return response()->json([
                'status' => false,
                'message' => 'Survey belum dipublikasikan'
            ], 403);
        }

        return response()->json([
            'status' => true,
            'message' => 'survei ditemukan',
            'survey' => $survey
        ]);
    }

    public function destroy($id){
        $survey = Survey::findOrFail($id);
        $survey->delete();
        return response()->json([
            'status' => true,
            'message' => "berhasil hapus survei",
            'data' => $survey
        ]);
    }
}
