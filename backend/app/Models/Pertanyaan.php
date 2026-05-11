<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pertanyaan extends Model
{
    protected $table = 'pertanyaan';

    protected $fillable = [
        'ktg_id',
        'prtn_isi'
    ];

    public function kategori(){
        return $this->belongsTo(Kategori::class, 'ktg_id');
    }

    public function penilaianDetail(){
        return $this->hasMany(PenilaianDetail::class, 'prtn_id');
    }
}
