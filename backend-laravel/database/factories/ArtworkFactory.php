<?php

namespace Database\Factories;

use App\Models\ArtType;
use App\Models\Artwork;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Artwork>
 */
class ArtworkFactory extends Factory
{
    protected $model=Artwork::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title'=>$this->faker->sentence(3),
            'description'=>$this->faker->paragraph(),
            'image'=>'https://placehold.co/300x300',
            'price'=>$this->faker->randomFloat(2,1,500),
            'user_id'=>User::where('role','artist')->inRandomOrder()->first()?->id,
            'art_type_id'=>ArtType::inRandomOrder()->first()?->id,
        ];
    }
}
