<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ArticleImage extends Model
{
    use SoftDeletes, HasFactory;

    protected $fillable= [
        'article_id',
        'image_path'
    ];

    public function article(){
        return $this->belongsTo(Article::class);
    }
}
