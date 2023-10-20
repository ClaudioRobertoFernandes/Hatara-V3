<?php

namespace App\Livewire\Dashboard;

use Filament\Notifications\Notification;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;
use Illuminate\Foundation\Application;
use Livewire\Component;

class AllotmentDashboardComponent extends Component
{

    public function render(): View|Application|Factory
    {
        Notification::make()
            ->title('Saved successfully')
            ->success()
            ->send();

        return view('livewire.dashboard.allotment-dashboard-component');
    }
}
