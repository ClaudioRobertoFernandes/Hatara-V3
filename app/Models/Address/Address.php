<?php

namespace App\Models\Address;

use App\Models\City\City;
use App\Models\Users\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Address extends Model
{
    use HasFactory,SoftDeletes;

    protected $fillable = [
        'user_id',
        'city_id',
        'zip_code',
        'neighborhood',
        'street',
        'number',
        'complement',
        'code_ibge',
        'ddd',
    ];

    public function city(): BelongsTo
    {
        return $this->BelongsTo(City::class);
    }

    public function user(): BelongsTo
    {
        return $this->BelongsTo(User::class);
    }


}
