<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('sales', static function (Blueprint $table) {
            $table->id();
            $table->foreignId('batch_id')->constrained();
            $table->integer('value_sale');
            $table->integer('input_value')->nullable();
            $table->integer('financed_balance')->nullable();
            $table->string('installments_sale', 3)->nullable();
            $table->integer('installments_total');
            $table->integer('installments_paid')->nullable();
            $table->integer('value_installments_paid')->nullable();
            $table->integer('value_installment')->nullable();
            $table->integer('fees')->nullable();
            $table->integer('late_fee')->nullable();
            $table->timestamp('date_readjustment')->nullable();
            $table->integer('value_readjustment')->nullable();
            $table->integer('first_payment_value')->nullable();
            $table->timestamp('date_sale')->nullable();
            $table->timestamp('end_date_sale_batch')->nullable();
            $table->string('status_sale')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sales');
    }
};
