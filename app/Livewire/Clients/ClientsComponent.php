<?php

namespace App\Livewire\Clients;

use App\Models\Users\User;
use Filament\Forms\Concerns\InteractsWithForms;
use Filament\Forms\Contracts\HasForms;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Concerns\InteractsWithTable;
use Filament\Tables\Contracts\HasTable;
use Filament\Tables\Table;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;
use Livewire\Component;

class ClientsComponent extends Component implements HasForms, HasTable
{
    use InteractsWithTable;
    use InteractsWithForms;

    public function table(Table $table): Table
    {
        return $table
            ->query(User::query()->with(['address', 'dataUser']))
            ->columns([
                TextColumn::make('name')
                    ->label('Nome')
                    ->sortable()
                    ->searchable(),
                TextColumn::make('email')
                    ->label('E-mail')
                    ->sortable()
                    ->searchable(),
                TextColumn::make('dataUser.cpfcnpj')
                    ->label('cpf/cnpj')
                    ->sortable()
                    ->searchable(),
                TextColumn::make('address.zip_code')
                    ->label('CEP')
                    ->sortable()
                    ->searchable(),
                TextColumn::make('address.city.name')
                    ->label('Cidade')
                    ->sortable()
                    ->searchable(),
                TextColumn::make('address.city.state.name')
                    ->label('Estado')
                    ->sortable()
                    ->searchable(),
            ]);
    }

    public function render(): View|Factory|Application
    {

        return view('livewire.clients.clients-component');
    }
}
