<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Auction extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'artwork_id',
        'start_price',
        'starts_at',
        'ends_at',
        'status'
    ];

    public function artwork(){
        return $this->belongsTo(Artwork::class);
    }

    public function bids(){
        return  $this->hasMany(AuctionBid::class);
    }

    public function highestBid(){
        return $this->hasOne(AuctionBid::class)->orderByDesc('amount');
    }

    public function result(){
        return $this->hasOne(AuctionResult::class);
    }
}
