<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ArtType extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'name'
    ];

    public function artType(){
        return $this->belongsTo(ArtType::class);
    }
}
