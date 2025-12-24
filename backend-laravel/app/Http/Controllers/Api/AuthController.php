<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{

    public function store(Request $request){
        $validator= Validator::make($request->all(),[
            'name'=>['required','string','max:255'],
            'username'=>['required','string','unique:users,username'],
            'email'=>['required','string','email', 'max:255', 'unique:users,email'],
            'password'=>['required','string','min:6','confirmed']
        ]);

        if($validator->fails()){
            return response()->json([
                'status'=>false,
                'message'=>$validator->errors(),
            ],422);
        }
        $data= $validator->validated();

        $user= User::create([
            'name'=>$data['name'],
            'username'=>$data['username'],
            'role'=>'user',
            'email'=>$data['email'],
            'password'=>Hash::make($data['password']),
        ]);

        $token = $user->createToken('api-token')->plainTextToken;
        return response()->json([
            'token'=>$token,
            'user'=>[
                "name"=>$user->name,
                "username"=>$user->username,
                "role"=>$user->role,
                "email"=>$user->email
            ]
        ],200);
    }

    public function profile(Request $request){
        $user=$request->user();

        return response()->json([
            'message'=>'User profile info',
            'user'=>$user
        ],200);
    }

    public function login(Request $request){
        $validator= Validator::make($request->all(),[
            'login'=>['required', 'string'],
            'password'=>['required', 'string']
        ]);

        if(filter_var($request->login,FILTER_VALIDATE_EMAIL)){
            $loginWith='email';
        }else{
            $loginWith='username';
        }

        if($validator->fails()){
            return response()->json([
                'status'=> false,
                'message'=>'Validation error',
                'errors'=>$validator->errors(),
            ],422);
        }

        $user= User::where($loginWith,$request->login)->first();

        if(!$user|| !Hash::check($request->password, $user->password)|| $request->username==$user->username){
            return response()->json([
                'status'=>false,
                'message' =>'invalid credentials',
            ],401);
        }

        $token= $user->createToken('api-token')->plainTextToken;

        return response()->json([
            'status'=>true,
            'token'=> $token,
            'user'=>[
                'username'=>$user->username,
                'email'=>$user->email,
                'role'=>$user->role
            ],
        ],200);
    }

    public function logout(Request $request){
        $user= $request->user();
        $user->currentAccessToken()->delete();

        return response()->json([
            'message'=>'Logout successfully',
        ],200);
    }

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

    public function me(Request $request){
        $user=$request->user();
        return response()->json([
            'status'=>true,
            'user'=>[
                'name'=> $user->name,
                'username'=>$user->username,
                'email'=>$user->email,
                'role'=>$user->role
            ]
        ],200);
    }
}
