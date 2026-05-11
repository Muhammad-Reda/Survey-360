<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PenilaianDetail extends Model
{
    protected $table = 'penilaian_detail';

    protected $fillable = [
        'penilaian_id',
        'prtn_id',
        'jawaban'
    ];

    public function penilaian(){
        return $this->belongsTo(Penilaian::class, 'penilaian_id');
    }

    public function pertanyaan() {
        return $this->belongsTo(Pertanyaan::class, 'prtn_id');
    }
}
