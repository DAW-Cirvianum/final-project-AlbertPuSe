<?php

namespace Database\Factories;

use App\Models\ForumTopic;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ForumTopic>
 */
class ForumTopicFactory extends Factory
{
    protected $model= ForumTopic::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title'=>fake()->sentence(6),
            'content'=>fake()->paragraph(3,true),
            'user_id'=>User::where('role','artist')->inRandomOrder()->first()->id,
        ];
    }
}
