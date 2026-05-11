<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class PeriodeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create('id_ID');
        $kategoriIds = DB::table('kategori')->pluck('id');

        for ($i = 0; $i < 10; $i++) {
            $startDate = $faker->dateTimeBetween('-1 year', 'now');
            $endDate = $faker->dateTimeBetween($startDate, '+1 month');

            DB::table('periode')->insert([
                'ktg_id' => $faker->randomElement($kategoriIds),
                'prd_tgl_mulai' => $startDate,
                'prd_tgl_selesai' => $endDate,
                'prd_status' => $faker->numberBetween(0, 1),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
