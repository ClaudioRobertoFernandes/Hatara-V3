<?php

use Carbon\Carbon;
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
        Schema::create('states', static function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('abbreviation');
            $table->timestamps();
        });

        DB::table('states')->insert(
            $data = [
                ['name'=> 'Acre','abbreviation'=>'AC','updated_at' => Carbon::now(),'created_at' => Carbon::now()],
                ['name'=> 'Alagoas','abbreviation'=>'AL','updated_at' => Carbon::now(),'created_at' => Carbon::now()],
                ['name'=> 'Amapá','abbreviation'=>'AP','updated_at' => Carbon::now(),'created_at' => Carbon::now()],
                ['name'=> 'Amazonas','abbreviation'=>'AM','updated_at' => Carbon::now(),'created_at' => Carbon::now()],
                ['name'=> 'Bahia' ,'abbreviation'=>'BA','updated_at' => Carbon::now(),'created_at' => Carbon::now()],
                ['name'=> 'Ceará','abbreviation'=>'CE','updated_at' => Carbon::now(),'created_at' => Carbon::now()],
                ['name'=> 'Distrito Federal' ,'abbreviation'=>'DF','updated_at' => Carbon::now(),'created_at' => Carbon::now()],
                ['name'=> 'Espírito Santo','abbreviation'=>'ES','updated_at' => Carbon::now(),'created_at' => Carbon::now()],
                ['name'=> 'Goiás','abbreviation'=>'GO','updated_at' => Carbon::now(),'created_at' => Carbon::now()],
                ['name'=> 'Maranhão','abbreviation'=>'MA','updated_at' => Carbon::now(),'created_at' => Carbon::now()],
                ['name'=> 'Mato Grosso','abbreviation'=>'MT','updated_at' => Carbon::now(),'created_at' => Carbon::now()],
                ['name'=> 'Mato Grosso do Sul','abbreviation'=>'MS','updated_at' => Carbon::now(),'created_at' => Carbon::now()],
                ['name'=> 'Minas Gerais','abbreviation'=>'MG','updated_at' => Carbon::now(),'created_at' => Carbon::now()],
                ['name'=> 'Pará','abbreviation'=>'PA','updated_at' => Carbon::now(),'created_at' => Carbon::now()],
                ['name'=> 'Paraíba','abbreviation'=>'PB','updated_at' => Carbon::now(),'created_at' => Carbon::now()],
                ['name'=> 'Paraná','abbreviation'=>'PR','updated_at' => Carbon::now(),'created_at' => Carbon::now()],
                ['name'=> 'Pernambuco','abbreviation'=>'PE','updated_at' => Carbon::now(),'created_at' => Carbon::now()],
                ['name'=> 'Piauí','abbreviation'=>'PI','updated_at' => Carbon::now(),'created_at' => Carbon::now()],
                ['name'=> 'Rio de Janeiro','abbreviation'=>'RJ','updated_at' => Carbon::now(),'created_at' => Carbon::now()],
                ['name'=> 'Rio Grande do Norte','abbreviation'=>'RN','updated_at' => Carbon::now(),'created_at' => Carbon::now()],
                ['name'=> 'Rio Grande do Sul','abbreviation'=>'RS','updated_at' => Carbon::now(),'created_at' => Carbon::now()],
                ['name'=> 'Rondônia','abbreviation'=>'RO','updated_at' => Carbon::now(),'created_at' => Carbon::now()],
                ['name'=> 'Roraima','abbreviation'=>'RR','updated_at' => Carbon::now(),'created_at' => Carbon::now()],
                ['name'=> 'Santa Catarina','abbreviation'=>'SC','updated_at' => Carbon::now(),'created_at' => Carbon::now()],
                ['name'=> 'São Paulo','abbreviation'=>'SP','updated_at' => Carbon::now(),'created_at' => Carbon::now()],
                ['name'=> 'Sergipe','abbreviation'=>'SE','updated_at' => Carbon::now(),'created_at' => Carbon::now()],
                ['name'=> 'Tocantins','abbreviation'=>'TO','updated_at' => Carbon::now(),'created_at' => Carbon::now()]
            ]
        );
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('states');
    }
};
