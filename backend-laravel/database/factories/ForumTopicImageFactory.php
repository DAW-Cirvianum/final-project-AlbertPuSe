<?php

namespace Database\Factories;

use App\Models\ForumTopicImage;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ForumTopicImage>
 */
class ForumTopicImageFactory extends Factory
{
    protected $model= ForumTopicImage::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'image'=>'https://placehold.co/300x300',
        ];
    }
}
