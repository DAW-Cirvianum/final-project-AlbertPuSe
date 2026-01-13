<?php

namespace Database\Factories;

use App\Models\Auction;
use App\Models\Artwork;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Auction>
 */
class AuctionFactory extends Factory
{

    protected $model=Auction::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $start=now()->subDays(rand(1,5));
        $end= now()->addDays(rand(1,5));
        return [
            'artwork_id'=>Artwork::inRandomOrder()->first()->id,
            'start_price'=>fake()->randomFloat(2,50,500),
            'starts_at'=>$start,
            'ends_at'=>$end,
            'status'=>'active',
        ];
    }
}
