<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class PenilaianSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create('id_ID');
        $respondenIds = DB::table('responden')->pluck('id');
        $periodeIds = DB::table('periode')->pluck('id');

        foreach ($respondenIds as $respondenId) {
            // Ensure each respondent has at least one assessment
            DB::table('penilaian')->insert([
                'responden_id' => $respondenId,
                'prd_id' => $faker->randomElement($periodeIds),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        // Create some more random assessments
        for ($i = 0; $i < 10; $i++) {
            DB::table('penilaian')->insert([
                'responden_id' => $faker->randomElement($respondenIds),
                'prd_id' => $faker->randomElement($periodeIds),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
