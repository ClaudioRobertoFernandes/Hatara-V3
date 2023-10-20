<?php

use App\Livewire\Dashboard\AllotmentDashboardComponent;
use App\Livewire\Dashboard\DashboardComponent;
use App\Livewire\Result;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', static function () {
    return view('welcome');
});
Route::group([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
], static function(){
    Route::get('/home', static function () {
        return view('home');
    })->name('home');
    Route::prefix('anual')->group(function () {
        Route::get('/dashboard', DashboardComponent::class)->name('dashboard');
        Route::get('/result', Result::class)->name('result');
    });
    Route::prefix('loteamento')->group(function () {
        Route::get('/dashboard', AllotmentDashboardComponent::class)->name('dashboard-lot');
    });

    Route::prefix('temporada')->group(function () {
        Route::get('/dashboard', static function () {
            return view('temporada.dashboard');
        })->name('dashboard-temp');
    });
});

