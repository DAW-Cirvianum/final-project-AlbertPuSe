<?php

namespace Database\Seeders;

use App\Models\Artwork;
use App\Models\Tag;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ArtworkSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Artwork::factory(50)->create()->each(function ($artwork){
            $artwork->tags()->attach(
                Tag::InRandomOrder()->take(rand(1,3))->pluck('id')
            );
        });
    }
}
