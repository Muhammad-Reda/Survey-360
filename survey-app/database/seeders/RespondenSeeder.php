<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class RespondenSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create('id_ID');
        $periodeIds = DB::table('periode')->pluck('id');

        for ($i = 0; $i < 15; $i++) { // Create more respondents
            DB::table('responden')->insert([
                'periode_id' => $faker->randomElement($periodeIds),
                'svy_nama' => $faker->name,
                'svy_jabatan' => $faker->jobTitle,
                'svy_nomor_whatsapp' => $faker->phoneNumber,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
