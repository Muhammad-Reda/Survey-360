<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class PenilaianDetailSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create('id_ID');
        $penilaianIds = DB::table('penilaian')->pluck('id');
        $pertanyaanIds = DB::table('pertanyaan')->pluck('id');

        if ($penilaianIds->isEmpty() || $pertanyaanIds->isEmpty()) {
            $this->command->info('Cannot run PenilaianDetailSeeder. No data in penilaian or pertanyaan table.');
            return;
        }

        foreach ($penilaianIds as $penilaianId) {
            // Assign 5 to 10 questions per assessment
            $selectedPertanyaanIds = $faker->randomElements($pertanyaanIds, $faker->numberBetween(5, 10));
            foreach ($selectedPertanyaanIds as $pertanyaanId) {
                DB::table('penilaian_detail')->insert([
                    'penilaian_id' => $penilaianId,
                    'prtn_id' => $pertanyaanId,
                    'jawaban' => $faker->numberBetween(1, 5),
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
    }
}
