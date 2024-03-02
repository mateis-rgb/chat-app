<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i = 0; $i < 10; $i++) {
            DB::table("users")->insert([
                "name" => "John Doe $i",
                "email" => "john$i@doe.fr",
                "password" => bcrypt("0000"),
                "cgu" => true,
                "created_at" => Carbon::now()
            ]);
        }
    }
}
