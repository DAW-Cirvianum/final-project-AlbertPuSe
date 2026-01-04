<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ForumTopicImage extends Model
{
    use HasFactory;

    protected $illable=[
        'forum_topic_id',
        'image'
    ];

    public function topic(){
        return $this->belongsTo(ForumTopic::class);
    }
}
