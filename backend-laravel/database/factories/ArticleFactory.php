<?php

namespace Database\Factories;

use App\Models\Article;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Article>
 */
class ArticleFactory extends Factory
{
    protected $model=Article::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $artist=User::where('role','artist')->inRandomOrder()->first();
        
        return [
            'title'=>fake()->sentence,
            'content'=>fake()->paragraph(rand(3,5),true),
            'user_id'=>$artist->id,
            'image'=>'https://placehold.co/300x300'
        ];
    }
}
