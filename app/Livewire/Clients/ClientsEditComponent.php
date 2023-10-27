<?php

namespace App\Livewire\Clients;

use App\Models\Users\User;
use Filament\Forms\Concerns\InteractsWithForms;
use Filament\Forms\Contracts\HasForms;
use Livewire\Component;

class ClientsEditComponent extends Component implements HasForms
{
    use InteractsWithForms;

    public User $user;
    public string $name;
    public string $email;
    public string $type;

    public function mount(User $user)
    {
        $this->user = $user;
        $this->name = $user->name;
        $this->email = $user->email;
        $this->type = 'Cliente';
    }

    public function render()
    {
        return view('livewire.clients.clients-edit-component');
    }
}
