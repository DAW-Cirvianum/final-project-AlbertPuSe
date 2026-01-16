<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function modifyRole(Request $request, User $user){

        $validator= Validator::make($request->all(),[
            'content'=>['required','string'],
        ]);

        if($validator->fails()){
            return response()->json([
                'status'=>false,
                'message'=>$validator->errors(),
            ],422);
        }

        $user->role = $request->role;
        $user->save();

        return response()->json([
            'status'=>true,
            'message'=>'Updated role',
        ]);
    }

    public function profile(Request $request){
        $user=$request->user();

        return response()->json([
            'message'=>'User profile info',
            'user'=>$user
        ],200);
    }

    public function artistsList(){
        $artists= User::where('role','artist')
        ->select('id','name','username','description','email')
        ->paginate(6);
        
        return response()->json([
            'status'=>true,
            'data'=>$artists
        ],200);
    }

    public function latestArtists(){
        $artists= User::where('role','artist')
        ->whereHas('artworks')
        ->with('artworks')
        ->latest()
        ->take(6)
        ->get();
        
        return response()->json([
            'status'=>true,
            'artists'=>$artists
        ],200);
    }

    public function artistById($id){
        $artist= User::with('artworks','articles.images')->find($id);
        
        if(is_null($artist)){
            return response()->json([
                'status'=>false,
                'notFound'=>'Artist not found'
            ],404);
        }

        return response()->json([
            'status'=>true,
            'artist'=>$artist,
        ],200);
    }

    public function modifyUser(Request $request, User $user){
        $validator= Validator::make($request->all(),[
            'name'=>['sometimes','string','max:255'],
            'username'=>['sometimes','string','unique:users,username'],
            'email'=>['sometimes','string','email', 'max:255', 'unique:users,email'],

        ]);

        if($validator->fails()){
            return response()->json([
                'status'=>false,
                'message'=>$validator->errors(),
            ],422);
        }

        $user->update([
            'name'=>$request->name??$user->name,
            'username'=>$request->username??$user->username,
            'email'=>$request->email??$user->email,
        ]);

        return response()->json([
            'stauts'=>true,
            'message'=>'User modifyed correctly',
            'user'=>$user
        ],200);
    }
    
}