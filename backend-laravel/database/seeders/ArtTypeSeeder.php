<?php

namespace Database\Seeders;

use App\Models\ArtType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ArtTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
       $types=[
            'Painting',
            'Illustration',
            'Sculpture',
            'Oil painting',
            'Woodcraft',
            'Metal art',
            'Textile art',
            'Photograph'
       ];

        foreach($types as $type){
            ArtType::firstOrCreate([
                'name'=>$type
            ]);
        }
    }
}
