<?php

namespace App\Models\DataUser;

use App\Models\Address\Address;
use App\Models\Users\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DataUser extends Model
{
    use HasFactory;

    protected $table = 'data-users';

    protected $fillable = [
        'user_id',
        'cpfcnpj',
        'rg',
        'cellphone',
        'phone',
        'sex',
        'marital_status',
        'children',
        'quantity_children',
        'job',
        'vehicle',
        'status',
        'attachments',
        'observation',
    ];

    protected $casts = [
        'created_at' => 'datetime:d/m/Y H:i:s',
        'updated_at' => 'datetime:d/m/Y H:i:s',
        'birth_date' => 'datetime:d/m/Y',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function address(): BelongsTo
    {
        return $this->belongsTo(Address::class);
    }
}
