<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Penilaian extends Model
{
    protected $table = 'penilaian';

    protected $fillable = [
        'responden_id',
        'prd_id'
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = ['skor_total'];

    public function periode(){
        return $this->belongsTo(Periode::class, 'prd_id');
    }

    public function responden(){
        return $this->belongsTo(Responden::class, 'responden_id');
    }

    public function details(){
        return $this->hasMany(PenilaianDetail::class, 'penilaian_id');
    }

    /**
     * Accessor untuk menghitung total skor dari detail penilaian.
     * Nama atributnya akan menjadi 'skor_total'.
     *
     * @return int
     */
    public function getSkorTotalAttribute()
    {
        // Menjumlahkan nilai dari kolom 'jawaban' pada relasi 'details'
        return $this->details()->sum('jawaban');
    }
}