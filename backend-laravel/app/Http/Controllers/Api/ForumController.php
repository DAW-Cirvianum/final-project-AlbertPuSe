<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ForumTopic;
use Illuminate\Http\Request;

class ForumController extends Controller
{
    public function forumTopics(){
        $forumTopics=ForumTopic::with('images')->paginate(10);

        return response()->json([
            'stauts'=>true,
            'data'=>$forumTopics,
        ],200);
    }

    public function forumTopic($id){
        $topic= ForumTopic::with('user','images','comments.user')->find($id);
        
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
}
