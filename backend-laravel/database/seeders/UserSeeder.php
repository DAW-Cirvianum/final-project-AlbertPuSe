<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name'=>'Admin',
            'username'=>'admin',
            'description'=>'Admin de novart',
            'email'=>'admin@novart.com',
            'role'=>'admin',
            'password'=>Hash::make('admin123'),
        ]);
        User::factory()->count(10)->artist()->create();
        User::factory()->count(20)->create();
    }
}
