<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Survey extends Model
{
    protected $table = 'surveys';
    protected $fillable =[
        'title',
        'description',
        'user_id',
        'period_id',
        'category_id',
        'slug',
        'status'
    ];

    public function user(){
        return $this->belongsTo(User::class, 'user_id');
    }

    public function periode(){
        return $this->belongsTo(Periode::class, 'period_id');
    }

    public function category(){
        return $this->belongsTo(Kategori::class, 'category_id');
    }
    
}
