<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Periode extends Model
{
    protected $table = 'periode';

    protected $fillable = [
        'ktg_id',
        'prd_tgl_mulai',
        'prd_tgl_selesai',
        'prd_status'
    ];

    public function penilaian(){
        return $this->hasMany(Penilaian::class, 'prd_id');
    }

    public function responden(){
        return $this->hasMany(Responden::class, 'periode_id');
    }

    public function kategori(){
        return $this->belongsTo(Kategori::class, 'ktg_id');
    }

    public function survey(){
        return $this->hasMany(Survey::class, 'period_id');
    }
}
