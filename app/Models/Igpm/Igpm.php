<?php

namespace App\Models\Igpm;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Igpm extends Model
{
    use HasFactory;

    protected $fillable = [
        'value',
        'reference',
    ];
}
