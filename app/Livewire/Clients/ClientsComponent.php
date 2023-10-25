<?php

namespace App\Livewire\Clients;

use App\Enums\UserTypes\UserTypes;
use App\Models\Users\User;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Concerns\InteractsWithForms;
use Filament\Forms\Contracts\HasForms;
use Filament\Tables\Actions\CreateAction;
use Filament\Tables\Actions\EditAction;
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
            ->headerActions([
                CreateAction::make()
                    ->label('Novo cliente')
                    ->modalWidth('sm')
                    ->modalHeading('Novo cliente')
                    ->model(User::class)
                    ->form([
                        TextInput::make('name')
                            ->label('Nome')
                            ->string()
                            ->minLength(3)
                            ->maxLength(255)
                            ->required()
                            ->placeholder('Nome do cliente')
                            ->live(),
                        TextInput::make('email')
                            ->label('E-mail')
                            ->email()
                            ->unique(table: User::class)
                            ->required()
                            ->placeholder('E-mail do cliente')
                            ->live(),
                        Select::make('user_type_id')
                            ->label('Tipo de usuário')
                            ->options(UserTypes::class)
                            ->required()
                            ->placeholder('Selecione uma opção')
                            ->live(),
                    ])
                    ->createAnother(false)
                    ->successRedirectUrl(fn(User $record): string => route('clients-edit', ['user' => $record]))
            ])
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
            ])
            ->striped()
            ->actions([
                    EditAction::make('edit')
                        ->successRedirectUrl(fn(User $record): string => route('clients-edit', [
                            'user' => $record,
                        ]))
                        ->successNotification(null)
                ]
            );
    }

    public function render(): View|Factory|Application
    {

        return view('livewire.clients.clients-component');
    }
}
