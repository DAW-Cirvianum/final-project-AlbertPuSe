<?php

namespace Database\Seeders;

use App\Models\Article;
use App\Models\ArticleImage;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ArticleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Article::factory(20)->create()->each(function($article){
            ArticleImage::factory(rand(1,4))->create([
                'article_id'=>$article->id
            ]);
        });
    }
}
