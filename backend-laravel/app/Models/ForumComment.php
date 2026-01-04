<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ForumComment extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'forum_topic_id',
        'user_id',
        'content'
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function topic(){
        return $this->belongsTo(FOrumTopic::class);
    }
}
