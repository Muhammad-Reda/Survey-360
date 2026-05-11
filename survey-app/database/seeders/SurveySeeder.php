<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;
use Illuminate\Support\Str;

class SurveySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create('id_ID');
        $userIds = DB::table('users')->pluck('id');
        $periodeIds = DB::table('periode')->pluck('id');
        $kategoriIds = DB::table('kategori')->pluck('id');

        for ($i = 0; $i < 10; $i++) {
            $title = $faker->sentence(3);
            DB::table('surveys')->insert([
                'title' => $title,
                'description' => $faker->paragraph,
                'user_id' => $faker->randomElement($userIds),
                'period_id' => $faker->randomElement($periodeIds),
                'category_id' => $faker->randomElement($kategoriIds),
                'slug' => Str::slug($title) . '-' . Str::random(5),
                'status' => $faker->boolean,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
