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
        $artworks=Artwork::where('user_id',$user->id)->paginate(10);

        return response()->json([
            'status'=>true,
            'data'=>$artworks
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

    public function artworkById($id){
        $artwork=Artwork::with('tags','artType','user')->find($id);

        if(!$artwork){
            return response()->json([
                'status'=>false,
                'notFound'=>'Artwork not found'
            ],404);
        }

        return response()->json([
            'stauts'=>true,
            'artwork'=>$artwork
        ],200);
    }

    public function artworksRelated(Artwork $artwork){

        $artworks = Artwork::where('user_id', $artwork->user_id)
        ->where('id', '!=', $artwork->id)
        ->inRandomOrder()
        ->take(4)
        ->get();

        if(!$artworks){
            return response()->json([
                'status'=>false,
                'notFound'=>'Artworks not found'
            ],404);
        }

        return response()->json([
            'status'=>true,
            'artworks'=>$artworks
        ],200);
    }

    public function createArtwork(Request $request){
        $validator=Validator::make($request->all(),[
            'title'=>['required','string'],
            'description'=>['required','string'],
            'price'=>['required','decimal:2','min:0'],
            'tag'=>['nullable','integer'],
            'type'=>['required','integer'],
            'image'=>['required','image','mimes:jpg,jpeg,png,webp','max:2048'],
        ]);

        if($validator->fails()){
            return response()->json([
                'status'=>false,
                'message'=>$validator->errors(),
            ],422);
        }

        $path = null;

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('artworks', 'public');
        }

        $artwork=Artwork::create([
            'title'=>$request->title,
            'description'=>$request->description,
            'image'=>$path,
            'price'=>$request->price,
            'user_id'=>Auth::id(),
            'art_type_id'=>$request->type
        ]);

        if($request->has('tag')){
            $artwork->tags()->attach([$request->tag]);
        }

        return response()->json([
            'status'=>true,
            'message'=>'Artwork creted correctly',
            'artwork'=>$artwork->load('tags')
        ]);
    }

    public function deleteArtwork($id){
        $artwork=Artwork::where('id',$id)->delete();

        return response()->json([
            'stauts'=>true,
            'message'=>'Article deleted correctly',
            'artwork'=>$artwork
        ],200);
    }

    public function seeDeletedArtworks(){
        $deletedArtworks=Artwork::onlyTrashed()->get();

        return response()->json([
            'status'=>true,
            'artworks'=>$deletedArtworks
        ],200);
    }
}
