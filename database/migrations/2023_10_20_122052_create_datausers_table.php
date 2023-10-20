<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('data-users', static function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained();
            $table->foreignId('address_id')->constrained();
            $table->string('cpfcnpj');
            $table->string('rg')->nullable();
            $table->string('cellphone')->nullable();
            $table->string('phone')->nullable();
            $table->timestamp('birth_date');
            $table->string('sex')->nullable();
            $table->string('marital_status');
            $table->string('children');
            $table->integer('quantity_children')->default(0);
            $table->string('job')->nullable();
            $table->string('vehicle')->default('NO');
            $table->string('status')->default('ACTIVE');
            $table->string('attachments')->default('NO');
            $table->string('observation')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('data-users');
    }
};
