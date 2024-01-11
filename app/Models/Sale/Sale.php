<?php

namespace App\Models\Sale;

use App\Models\Attachment\Attachment;
use App\Models\Batch\Batch;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Sale extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'batch_id',
        'value_sale',
        'input_value',
        'financed_balance',
        'installments_sale',
        'installments_total',
        'installments_paid',
        'value_installments_paid',
        'value_installment',
        'fees',
        'late_fee',
        'value_readjustment',
        'first_payment_value',
        'status_sale',
        'created_at',
        'updated_at',
    ];

    protected $casts = [
        'date_sale' => 'datetime',
        'date_readjustment' => 'datetime',
        'end_date_sale_batch' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function batch(): BelongsTo
    {
        return $this->belongsTo(Batch::class);
    }

    public function attachment(): HasMany
    {
        return $this->hasMany(Attachment::class);
    }

}
