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
        Schema::create('responden', function (Blueprint $table) {
            $table->id();
            $table->foreignId('periode_id')->constrained('periode')->onDelete('cascade');
            $table->string('svy_nama');
            $table->string('svy_jabatan');
            $table->string('svy_nomor_whatsapp');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('responden');
    }
};
