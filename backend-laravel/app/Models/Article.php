<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Article extends Model
{
    use SoftDeletes, HasFactory;

    protected $fillable=[
        'title',
        'content',
        'user_id'
    ];

    public function images(){
        return $this->hasMany(ArticleImage::class);
    }

    public function user(){
        return $this->belongsTo((User::class));
    }
}
