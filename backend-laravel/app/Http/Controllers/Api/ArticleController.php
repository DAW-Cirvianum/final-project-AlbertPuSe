<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    public function articles(){
        $articles=Article::with('images')->paginate(10);

        if(is_null($articles)){
            return response()->json([
                'status'=>false,
                'notFound'=>'article not found',
            ],404);
        }

        return response()->json([
            'status'=>true,
            'data'=>$articles,
        ],200);
    }
}
