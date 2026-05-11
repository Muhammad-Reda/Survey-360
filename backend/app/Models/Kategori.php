<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Kategori extends Model
{
    protected $table = 'kategori';

    protected $fillable = [
        'ktg_nama'
    ];

    public function pertanyaan(){
        return $this->hasMany(Pertanyaan::class, 'ktg_id');
    }

    public function periode(){
        return $this->hasMany(Periode::class, 'ktg_id');
    }

    public function survey(){
        return $this->hasMany(Survey::class, 'category_id');
    }
   
}
