<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ForumComment;
use App\Models\ForumTopic;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class ForumController extends Controller
{
    public function forumTopics(){
        $forumTopics=ForumTopic::paginate(10);

        return response()->json([
            'stauts'=>true,
            'data'=>$forumTopics,
        ],200);
    }

    public function forumTopic($id){
        $topic= ForumTopic::with('user','comments.user')->find($id);
        
        if(is_null($topic)){
            return response()->json([
                'status'=>false,
                'error'=>'Topic not found',
            ],404);
        }

        return response()->json([
            'status'=>true,
            'data'=>$topic,
        ],200);
    }

    public function myTopics(){
        $user=Auth::user();
        $topic=ForumTopic::where('user_id',$user->id)->with('comments')->paginate(10);

        if(is_null($topic)){
            return response()->json([
                'status'=>false,
                'notFound'=>'Articles not found',
            ],404);
        }

        return response()->json([
            'status'=>true,
            'data'=>$topic,
        ]);
    }

    public function createTopic(Request $request){
        $validator= Validator::make($request->all(),[
            'title'=>['required','string','max:255'],
            'content'=>['required','string'],
            'image' => ['nullable','image','mimes:jpg,jpeg,png,webp','max:2048'],
        ]);

        if($validator->fails()){
            return response()->json([
                'status'=>false,
                'message'=>$validator->errors(),
            ],422);
        }
        $path='';

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('topics', 'public');
        }

        $topic= ForumTopic::create([
            'user_id'=>Auth::id(),
            'title'=>$request->title,
            'content'=>$request->content,
            'image'=>$path
        ]);

        return response()->json([
                'status'=>true,
                'message'=>'Topic created correctly',
                'topic'=>$topic
        ],200);
    }

    public function createComment(Request $request,$id){
        $validator= Validator::make($request->all(),[
            'content'=>['required','string'],
        ]);

        if($validator->fails()){
            return response()->json([
                'status'=>false,
                'message'=>$validator->errors(),
            ],422);
        }

        $comment= ForumComment::create([
            'user_id'=>Auth::id(),
            'content'=>$request->content,
            'forum_topic_id'=>$id
        ]);

        return response()->json([
                'status'=>true,
                'message'=>'Topic created correctly',
                'topic'=>$comment
        ],200);
    }

    public function deleteTopic($id){
        $topic=ForumTopic::where('id',$id)->delete();

        return response()->json([
            'stauts'=>true,
            'message'=>'Topic deleted correctly',
            'artilce'=>$topic
        ],200);
    }
}
