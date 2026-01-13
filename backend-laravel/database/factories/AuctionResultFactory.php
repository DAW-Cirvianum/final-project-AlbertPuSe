<?php

namespace Database\Factories;

use App\Models\Auction;
use App\Models\AuctionResult;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\AuctionResult>
 */
class AuctionResultFactory extends Factory
{
    protected $model=AuctionResult::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'auction_id'=>Auction::inRandomOrder()->first()->id,
            'user_id'=>User::inRandomOrder()->first()->id,
            'final_price'=>fake()->randomFLoat(2,60,1000),
            'ended_at'=>now(),
        ];
    }
}
