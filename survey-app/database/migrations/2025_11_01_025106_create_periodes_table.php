<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('periode', function (Blueprint $table) {
            $table->id();
            $table->foreignId('ktg_id')->constrained('kategori')->onDelete('cascade');
            $table->date('prd_tgl_mulai');
            $table->date('prd_tgl_selesai');
            $table->smallInteger('prd_status')->default(0); // 0=nonaktif, 1=aktif
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('periode');
    }
};
