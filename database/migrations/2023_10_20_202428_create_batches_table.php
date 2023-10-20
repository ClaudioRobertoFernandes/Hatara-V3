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
            $table->string('sold')->default('NO');
            $table->string('settled')->default('NO');
            $table->string('written_down')->default('NO');
            $table->string('judicial_process')->default('NO');
            $table->string('authorization')->default('NO');
            $table->string('scan_contract')->default('NO');
            $table->string('structure')->default('NO');
            $table->string('registrationNotary')->default('NO');
            $table->string('previousStatus')->nullable();
            $table->string('status')->default('ACTIVE');
            $table->string('description');
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
