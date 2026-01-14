<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class ArticleController extends Controller
{
    public function myArticles(){
        $user=Auth::user();
        $articles=Article::where('user_id',$user->id)->paginate(10);

        if(is_null($articles)){
            return response()->json([
                'status'=>false,
                'notFound'=>'Articles not found',
            ],404);
        }

        return response()->json([
            'status'=>true,
            'data'=>$articles,
        ]);
    }

    public function articlesList(){
        $articles=Article::paginate(10);

        if(is_null($articles)){
            return response()->json([
                'status'=>false,
                'notFound'=>'Articles not found',
            ],404);
        }

        return response()->json([
            'status'=>true,
            'data'=>$articles,
        ],200);
    }

    public function articleById($id){
        $article=Article::with('user')->find($id);

        if(is_null($article)){
            return response()->json([
                'status'=>true,
                'notFound'=>'Article not found'
            ],404);
        }

        return response()->json([
            'status'=>false,
            'article'=>$article
        ],200);
    }

    public function createArticle(Request $request){
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
        $path = null;

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('articles', 'public');
        }

        $article= Article::create([
            'user_id'=>Auth::id(),
            'title'=>$request->title,
            'content'=>$request->content,
            'image'=>$path
        ]);

        return response()->json([
                'status'=>true,
                'message'=>'Article created correctly',
                'article'=>$article
        ],200);
    }

    public function deleteArticle($id){
        $article=Article::where('id',$id)->delete();

        return response()->json([
            'stauts'=>true,
            'message'=>'Article deleted correctly',
            'artilce'=>$article
        ],200);
    }

    public function seeDeletedArticles(){
        $deletedArticles=Article::onlyTrashed()->get();

        return response()->json([
            'status'=>true,
            'articles'=>$deletedArticles
        ],200);
    }

    public function modifyArticle(Request $request, Article $article){
        $validator= Validator::make($request->all(),[
            'title'=>['sometimes','string','max:255'],
            'content'=>['sometimes','string'],
            'image' => ['sometimes','nullable','image','mimes:jpg,jpeg,png,webp','max:2048'],
        ]);

        if($validator->fails()){
            return response()->json([
                'status'=>false,
                'message'=>$validator->errors(),
            ],422);
        }

        $article->update([
            'title'=>$request->title??$article->title,
            'content'=>$request->content??$article->content,
        ]);
        
        if ($request->hasFile('image')) {
            if ($article->image && Storage::disk('public')->exists($article->image)) {
                Storage::disk('public')->delete($article->image);
            }

            $path=$request->file('image')->store('artworks','public');

            $article->update([
                'image'=>$path
            ]);
        }

        return response()->json([
                'status'=>true,
                'message'=>'Article modified',
                'article'=>$article
        ],200);
    }
}
