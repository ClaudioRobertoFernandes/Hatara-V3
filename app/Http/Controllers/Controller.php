<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;

    public static function getListRoute(): array
    {
        return [
            ['name' => 'Dashboard', 'route' => 'dashboard','label'=> 'Dashboard','group'=>'anual'],
            ['name' => 'Loteamentos', 'route' => 'dashboard-lot','label'=> 'Dashboard','group'=>'loteamento'],
            ['name' => 'Temporadas', 'route' => 'dashboard-temp','label'=> 'Dashboard','group'=>'temporada'],
            ['name' => 'Resultados', 'route' => 'result','label'=> 'Result','group'=>'anual'],
        ];
    }
}
