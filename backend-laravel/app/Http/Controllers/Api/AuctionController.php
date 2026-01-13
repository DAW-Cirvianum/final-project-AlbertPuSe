<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Auction;
use Illuminate\Http\Request;

class AuctionController extends Controller
{
    public function auctionList(){
        $auctions= Auction::with('artwork','highestBid')->paginate(12);
        
        if(is_null($auctions)){
            return response()->json([
                'stauts'=>false,
                'notFound'=>'Auctions not found'
            ],404);
        }

        return response()->json([
            'status'=>true,
            'data'=>$auctions
        ],200);
    }

    public function auctionById($id){
        $auction= Auction::where('id',$id)->with('artwork','highestBid','bids','result')->get();

        return response()->json([
            'status'=>true,
            'auction'=>$auction
        ],200);

    }
}
