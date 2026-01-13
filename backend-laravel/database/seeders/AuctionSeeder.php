<?php

namespace Database\Seeders;

use App\Models\Auction;
use App\Models\AuctionBid;
use App\Models\AuctionResult;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AuctionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        Auction::factory(10)->create()->each(function ($auction) {
            AuctionBid::factory(rand(3, 10))->create([
                'auction_id' => $auction->id
            ]);

            $highest = $auction->bids()->orderByDesc('amount')->first();

            AuctionResult::create([
                'auction_id' => $auction->id,
                'winner_id' => $highest?->user_id,
                'final_price' => $highest?->amount,
                'ended_at' => now(),
            ]);
        });
    }
}
