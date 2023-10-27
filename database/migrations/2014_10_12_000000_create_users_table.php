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
        Schema::create('users', static function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_type_id')->constrained();
            $table->string('name');
            $table->string('email')->unique();
            $table->string('cpfcnpj')->unique();
            $table->string('zip_code');
            $table->string('state');
            $table->string('city');
            $table->string('neighborhood');
            $table->string('street');
            $table->string('rg')->nullable();
            $table->string('cellphone')->nullable();
            $table->string('phone')->nullable();
            $table->timestamp('birth_date')->nullable();
            $table->string('sex')->nullable();
            $table->string('marital_status')->nullable();
            $table->string('children')->nullable();
            $table->integer('quantity_children')->nullable();
            $table->string('job')->nullable();
            $table->string('vehicle')->nullable();
            $table->string('status')->default('ACTIVE');
            $table->string('attachments')->nullable();
            $table->string('observation')->nullable();
            $table->string('number')->nullable();
            $table->string('complement')->nullable();
            $table->string('code_ibge')->nullable();
            $table->string('ddd')->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password')->nullable();
            $table->rememberToken()->nullable();
            $table->foreignId('current_team_id')->nullable();
            $table->string('profile_photo_path', 2048)->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
