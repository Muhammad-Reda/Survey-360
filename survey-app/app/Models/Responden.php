<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Responden extends Model
{
    protected $table = 'responden';

    protected $fillable = [
        'periode_id',
        'svy_nama',
        'svy_jabatan',
        'svy_nomor_whatsapp'
    ];

    public function penilaian(){
        return $this->hasMany(Penilaian::class, 'responden_id');
    }

    public function periode(){
        return $this->belongsTo(Periode::class, 'periode_id');
    }
}
