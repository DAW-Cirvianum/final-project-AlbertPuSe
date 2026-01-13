<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AuctionResult extends Model
{
    use HasFactory;
    protected $fillable = [
        'auction_id',
        'winner_id',
        'final_price',
        'ended_at'
    ];

    public function auction(){
        return $this->belongsTo(Auction::class);
        return $this->belongTo(User::class, 'winner_id');
    }
}
