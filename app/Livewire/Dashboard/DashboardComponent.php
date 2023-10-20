<?php

namespace App\Livewire\Dashboard;

use App\Enums\UserTypes\UserTypes;
use App\Models\Users\User;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;
use Illuminate\Foundation\Application;
use Livewire\Component;

class DashboardComponent extends Component
{

    public $totalUsers;
    public $totalOwners;
    public $totalRenters;
    public $totalAccounting;
    public $totalRealEstate;


    public function render(): View|Application|Factory
    {
        $userTypes = UserTypes::class;

        $getTotalUsersType = User::selectRaw('count(*) as total_users')
            ->selectRaw("count(case when user_type_id = {$userTypes::OWNER->value} then 1 end) as '{$userTypes::OWNER->getName()}'")
            ->selectRaw("count(case when user_type_id = {$userTypes::RENTER->value} then 1 end) as '{$userTypes::RENTER->getName()}'")
            ->selectRaw("count(case when user_type_id = {$userTypes::ACCOUNTING->value} then 1 end) as '{$userTypes::ACCOUNTING->getName()}'")
            ->selectRaw("count(case when user_type_id = {$userTypes::REALESTATE->value} then 1 end) as '{$userTypes::REALESTATE->getName()}'")
            ->first();

        return view('livewire.dashboard.dashboard-component', [
            'getTotalUsersType' => $getTotalUsersType
        ]);
    }
}
