<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    public function modifyRole(Request $request, User $user){

        $request->validate([
            'role' => 'required|in:user,artist,admin'
        ]);

        $user->role = $request->role;
        $user->save();

        return response()->json([
            'message' => 'Rol actualizado correctamente'
        ]);
    }

    public function profile(Request $request){
        $user=$request->user();

        return response()->json([
            'message'=>'User profile info',
            'user'=>$user
        ],200);
    }

    public function artists(){
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

}