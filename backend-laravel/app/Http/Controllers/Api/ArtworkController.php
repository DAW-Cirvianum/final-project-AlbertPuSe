<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ArtType;
use App\Models\Artwork;
use App\Models\Tag;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class ArtworkController extends Controller
{
    public function myArtworks(){
        $user=Auth::user();
        $artworks=Artwork::where('user_id',$user->id)->get();

        return response()->json([
            'status'=>true,
            'artworks'=>$artworks
        ],200);
    }
    public function artworksList(){
        $artworks=Artwork::paginate(10);

        return response()->json([
            'status'=>true,
            'data'=>$artworks
        ],200);
    }

    public function latestArtworks(){
        $artworks= Artwork::latest()
        ->take(6)
        ->get();
        
        return response()->json([
            'status'=>true,
            'artworks'=>$artworks
        ],200);
    }

    public function artTypes(){
        $artTypes=ArtType::get();

        return response()->json([
            'status'=>true,
            'artTypes'=>$artTypes
        ]);
    }

    public function tags(){
        $tags=Tag::get();

        return response()->json([
            'status'=>true,
            'tags'=>$tags
        ]);
    }

    // public function createArtwork(Request $request){
    //     $request->validate([
    //         'image'=>
    //         'title'=>
    //         'description'=>
    //         'price'=>
    //         'tag'=>
    //         'type'=>
    //     ]);
    // }
}
