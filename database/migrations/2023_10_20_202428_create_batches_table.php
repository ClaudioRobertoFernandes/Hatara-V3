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
        Schema::create('batches', static function (Blueprint $table) {
            $table->id();
            $table->string('batch');
            $table->string('block');
            $table->string('sold')->default('NÃO');
            $table->string('settled')->default('NÃO');
            $table->string('written_down')->default('NÃO');
            $table->string('judicial_process')->default('NÃO');
            $table->string('authorization')->default('NÃO');
            $table->string('scan_contract')->default('NÃO');
            $table->string('structure')->default('NÃO');
            $table->string('registrationNotary')->default('NÃO');
            $table->string('previousStatus')->nullable();
            $table->string('status')->default('ATIVO');
            $table->string('description')->nullable();
            $table->unique(['batch', 'block']);
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('batchs');
    }
};
