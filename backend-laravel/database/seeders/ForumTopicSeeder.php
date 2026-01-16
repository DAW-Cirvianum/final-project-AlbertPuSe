<?php

namespace Database\Seeders;

use App\Models\ForumComment;
use App\Models\ForumTopic;
use App\Models\ForumTopicImage;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ForumTopicSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ForumTopic::factory(15)->create()->each(function($topic){

            ForumComment::factory(rand(2,6))->create([
                'forum_topic_id'=>$topic->id
            ]);
        });
    }
}
