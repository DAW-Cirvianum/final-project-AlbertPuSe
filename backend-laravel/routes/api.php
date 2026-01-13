<?php

use App\Http\Controllers\Api\ArticleController;
use App\Http\Controllers\Api\ArtworkController;
use App\Http\Controllers\Api\AuctionController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ForumController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Termwind\Components\Raw;

Route::post('register',[AuthController::class,'store']);

Route::post('login',[AuthController::class,'login']);

Route::patch('users/{user}/role',[UserController::class,'modifyRole']);

Route::get('artists',[UserController::class,'artistsList']);
Route::get('artists/latest',[UserController::class,'latestArtists']);
Route::get('artists/{artist}',[UserController::class,'artistById']);

Route::get('artworks',[ArtworkController::class,'artworksList']);
Route::get('artworks/latest',[ArtworkController::class,'latestArtworks']);
Route::get('artworks/artist/{artist}/latest',[ArtworkController::class,'artworksByArtist']);
Route::get('artworks/{artwork}',[ArtworkController::class,'artworkById']);
Route::get('artworks/{artwork}/related',[ArtworkController::class,'artworksRelated']);

Route::get('articles',[ArticleController::class,'articlesList']);
Route::get('articles/{article}',[ArticleController::class,'articleById']);

Route::get('forum/topics',[ForumController::class,'forumTopics']);
Route::get('forum/topics/{topic}',[ForumController::class,'forumTopic']);

Route::get('auctions',[AuctionController::class,'auctionList']);
Route::get('auctions/{auction}',[AuctionController::class,'auctionById']);

Route::get('types',[ArtworkController::class,'artTypes']);
Route::get('tags',[ArtworkController::class,'tags']);

Route::get('admin/articles/deleted',[ArticleController::class,'seeDeletedArticles']);
Route::get('admin/artowrks/deleted',[ArtworkController::class,'seeDeletedArtworks']);
Route::middleware(['auth:sanctum'])->group(function(){
    Route::get('me', [AuthController::class, 'me']);
});

Route::middleware(['auth:sanctum','role:artist, users'])->group(function(){
});

Route::middleware(['auth:sanctum','role:artist, admin'])->group(function(){
    Route::delete('articles/{article}/delete',[ArticleController::class,'deleteArticle']);
    Route::delete('artworks/{artwork}/delete',[ArtworkController::class,'deleteArtwork']);
});

Route::middleware(['auth:sanctum','role:artist'])->group(function(){
    Route::get('artist/my-artworks',[ArtworkController::class,'myArtworks']);
    Route::get('artist/my-articles',[ArticleController::class,'myArticles']);
    Route::post('artist/artwork/create',[ArtworkController::class,'createArtwork']);
    Route::post('artist/article/create',[ArticleController::class,'createArticle']);
});

Route::middleware(['auth:sanctum','role:admin'])->group(function(){
});