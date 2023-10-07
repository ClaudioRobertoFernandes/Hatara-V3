<?php

namespace App\Livewire\Dashboard;

use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;
use Illuminate\Foundation\Application;
use Livewire\Component;

class DashboardComponent extends Component
{

    public int $totalUsers;

    public function render(): View|Application|Factory
    {
        $this->totalUsers = 10;
        return view('livewire.dashboard.dashboard-component', [
            'totalUsers' => $this->totalUsers
        ]);
    }
}
