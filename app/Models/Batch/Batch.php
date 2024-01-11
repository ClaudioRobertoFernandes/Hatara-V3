<?php

namespace App\Models\Batch;

use App\Models\Attachment\Attachment;
use App\Models\Sale\Sale;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Batch extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'batch',
        'block',
        'sold',
        'settled',
        'written_down',
        'judicial_process',
        'authorization',
        'scan_contract',
        'structure',
        'registrationNotary',
        'previousStatus',
        'status',
        'description',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function getBatchBlockAttribute(): string
    {
        return $this->batch . ' ' . $this->block;
    }

    public function attachment(): HasMany
    {
        return $this->hasMany(Attachment::class);
    }

    public function sale(): HasMany
    {
        return $this->hasMany(Sale::class);
    }
}
