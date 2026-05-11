<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class PertanyaanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create('id_ID');
        $kategoriIds = DB::table('kategori')->pluck('id');

        for ($i = 0; $i < 20; $i++) { // Create more questions
            DB::table('pertanyaan')->insert([
                'ktg_id' => $faker->randomElement($kategoriIds),
                'prtn_isi' => $faker->sentence(5) . '?',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
