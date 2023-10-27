<?php

namespace App\Livewire\Clients;

use App\Enums\Gender\Gender;
use App\Enums\MaritalStatus\MaritalStatus;
use App\Models\Users\User;
use Exception;
use Filament\Forms\Components\Actions\Action as suffixAction;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\Fieldset;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Wizard\Step;
use Filament\Forms\Concerns\InteractsWithForms;
use Filament\Forms\Contracts\HasForms;
use Filament\Forms\Get;
use Filament\Notifications\Notification;
use Filament\Tables\Actions\CreateAction;
use Filament\Tables\Actions\DeleteAction;
use Filament\Tables\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Concerns\InteractsWithTable;
use Filament\Tables\Contracts\HasTable;
use Filament\Tables\Enums\FiltersLayout;
use Filament\Tables\Filters\Filter;
use Filament\Tables\Table;
use Http;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;
use Illuminate\Database\Eloquent\Builder;
use Livewire\Component;

class ClientsComponent extends Component implements HasForms, HasTable
{
    use InteractsWithTable;
    use InteractsWithForms;

    /**
     * @throws Exception
     */
    public function table(Table $table): Table
    {
        return $table
            ->query(User::query())
            ->inverseRelationship(User::class)
            ->headerActions([
                CreateAction::make('create')
                    ->label('Novo cliente')
                    ->color('success')
                    ->modalHeading('Novo cliente')
                    ->steps([
                        Step::make('Client Details')
                            ->label('Cliente')
                            ->schema([
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
                                    ->label('Tipo de cliente')
                                    ->options([
                                        '5' => 'Cliente',
                                    ])
                                    ->default('5')
                                    ->selectablePlaceholder(false)
                                    ->live(),
                            ])
                            ->columns(3),
                        Step::make('Address')
                            ->label('Endereço')
                            ->description('Endereço do cliente')
                            ->schema([
                                TextInput::make('zip_code')
                                    ->label('CEP')
                                    ->mask('99999-999')
                                    ->required()
                                    ->live()
                                    ->maxLength(9)
                                    ->suffixAction(function ($state, $livewire, $set) {
                                        return suffixAction::make('search-action')
                                            ->icon('heroicon-m-magnifying-glass')
                                            ->action(function () use ($livewire, $state, $set) {
                                                $livewire->validateOnly('zip_code');

                                                $zip_code = str_replace(array('-', '.'), array('', ''), $state);

                                                $request = Http::get("https://viacep.com.br/ws/$zip_code/json/")->json();
                                                try {
                                                    $set('state', $request['uf']);
                                                    $set('city', $request['localidade']);
                                                    $set('neighborhood', $request['bairro']);
                                                    $set('street', $request['logradouro']);
                                                    $set('code_ibge', $request['ibge']);
                                                    $set('ddd', $request['ddd']);
                                                } catch (Exception) {
                                                    $set('state', '');
                                                    $set('city', '');
                                                    $set('neighborhood', '');
                                                    $set('street', '');
                                                    $set('code_ibge', '');
                                                    $set('ddd', '');

                                                    Notification::make()
                                                        ->title('Erro! CEP não encontrado')
                                                        ->icon('heroicon-o-x-circle')
                                                        ->iconColor('danger')
                                                        ->send();
                                                }
                                            });
                                    })
                                ,
                                TextInput::make('state')
                                    ->label('Estado')
                                    ->required()
                                    ->live(),
                                TextInput::make('city')
                                    ->label('Cidade')
                                    ->required()
                                    ->live(),
                                TextInput::make('neighborhood')
                                    ->label('Bairro')
                                    ->required()
                                    ->live(),
                                TextInput::make('street')
                                    ->label('Rua')
                                    ->required()
                                    ->live(),
                                TextInput::make('number')
                                    ->label('Número')
                                    ->live(),
                                TextInput::make('complement')
                                    ->label('Complemento')
                                    ->live(),
                                TextInput::make('code_ibge')
                                    ->label('Código IBGE')
                                    ->live(),
                                TextInput::make('ddd')
                                    ->label('DDD')
                                    ->live(),
                            ])
                            ->columns(3),
                        Step::make('dataUser')
                            ->label('Dados do cliente')
                            ->description('Dados pessoais')
                            ->schema([
                                TextInput::make('cpfcnpj')
                                    ->label('CPF/CNPJ')
                                    ->rules('required|min:14|max:18')
                                    ->placeholder('Cpf ou Cnpj do cliente')
                                    ->required()
                                    ->live(),
                                TextInput::make('rg')
                                    ->label('Rg')
                                    ->placeholder('Rg do cliente'),
                                TextInput::make('cellphone')
                                    ->label('Celular')
                                    ->string()
                                    ->mask('(99) 99999-9999')
                                    ->minLength(10)
                                    ->required()
                                    ->placeholder('Telefone do cliente')
                                    ->live(),
                                TextInput::make('phone')
                                    ->label('Telefone')
                                    ->string()
                                    ->mask('(99) 9999-9999')
                                    ->minLength(10)
                                    ->placeholder('Telefone do cliente')
                                    ->live(),
                                DatePicker::make('birth_date')
                                    ->label('Data de nascimento')
                                    ->required()
                                    ->live(),
                                Select::make('sex')
                                    ->label('Genero')
                                    ->placeholder('Selecione uma opção')
                                    ->options(Gender::class)
                                    ->live(),
                                Fieldset::make()
                                    ->schema([
                                        Select::make('marital_status')
                                            ->label('Status civil')
                                            ->placeholder('Selecione uma opção')
                                            ->options(MaritalStatus::class)
                                            ->live(),
                                        Select::make('children')
                                            ->label('Tem filhos?')
                                            ->placeholder('Selecione uma opção')
                                            ->options([
                                                'YES' => 'Sim',
                                                'NO' => 'Não',
                                            ])
                                            ->live(),
                                        Select::make('quantity_children')
                                            ->label('Quantos filhos?')
                                            ->placeholder('Selecione uma opção')
                                            ->options(fn(Get $get): array => match ($get('children')) {
                                                'yes' => [
                                                    1 => 1,
                                                    2 => 2,
                                                    3 => 3,
                                                    4 => 4,
                                                    5 => 5,
                                                    6 => 6,
                                                    7 => 7,
                                                    8 => 8,
                                                    9 => 9,
                                                ],
                                                default => [0 => 0],
                                            })
                                    ])
                                    ->columns(3),
                                TextInput::make('job')
                                    ->label('Profissão')
                                    ->placeholder('Profissão do cliente')
                                    ->live(),
                                Select::make('vehicle')
                                    ->label('Possui veículo?')
                                    ->placeholder('Selecione uma opção')
                                    ->options([
                                        'yes' => 'Sim',
                                        'no' => 'Não',
                                    ])
                                    ->live(),
                                Select::make('status')
                                    ->label('Status')
                                    ->required()
                                    ->placeholder('Selecione uma opção')
                                    ->options([
                                        'ACTIVE' => 'Ativo',
                                        'INACTIVE' => 'Inativo',
                                    ])
                                    ->live(),
                                Select::make('attachments')
                                    ->label('Possui anexos?')
                                    ->placeholder('Selecione uma opção')
                                    ->options([
                                        'YES' => 'Sim',
                                        'NO' => 'Não',
                                    ])
                                    ->live(),
                                RichEditor::make('observation')
                                    ->label('Observação')
                                    ->toolbarButtons([
                                        'attachFiles',
                                        'blockquote',
                                        'bold',
                                        'bulletList',
                                        'codeBlock',
                                        'h2',
                                        'h3',
                                        'italic',
                                        'link',
                                        'orderedList',
                                        'redo',
                                        'strike',
                                        'underline',
                                        'undo',
                                    ])
                                    ->placeholder('Descreva uma observação...')
                                    ->columnSpanFull()
                                    ->live(),
                            ]),
                    ])
            ])
            ->columns([
                TextColumn::make('name')
                    ->label('Nome')
                    ->sortable(),
                TextColumn::make('email')
                    ->label('E-mail')
                    ->sortable(),
                TextColumn::make('cpfcnpj')
                    ->label('cpf/cnpj')
                    ->sortable(),
                TextColumn::make('zip_code')
                    ->label('CEP')
                    ->sortable(),
                TextColumn::make('city')
                    ->label('Cidade')
                    ->sortable(),
                TextColumn::make('state')
                    ->label('Estado')
                    ->sortable(),
                // add filed to date
                TextColumn::make('created_at')
                    ->label('Criado em')
                    ->sortable()
                    ->date('d/m/Y'),
            ])
            ->filters([
                Filter::make('name')
                    ->form([
                        TextInput::make('name')
                            ->label('Nome')
                            ->placeholder('Nome do cliente')
                            ->live(),
                    ])
                    ->query(function (Builder $query, array $data): Builder {
                        return $query
                            ->when(
                                $data['name'],
                                fn(Builder $query, $name): Builder => $query->where('name', 'like', "%$name%"),
                            );
                    }),
                Filter::make('email')
                    ->form([
                        TextInput::make('email')
                            ->label('E-mail')
                            ->placeholder('E-mail do cliente')
                            ->live(),
                    ])
                    ->query(function (Builder $query, array $data): Builder {
                        return $query
                            ->when(
                                $data['email'],
                                fn(Builder $query, $email): Builder => $query->where('email', 'like', "%$email%"),
                            );
                    }),
                Filter::make('cpfcnpj')
                    ->form([
                        TextInput::make('cpfcnpj')
                            ->label('CPF/CNPJ')
                            ->placeholder('CPF/CNPJ do cliente')
                            ->live(),
                    ])
                    ->query(function (Builder $query, array $data): Builder {
                        return $query
                            ->when(
                                $data['cpfcnpj'],
                                fn(Builder $query, $cpfcnpj): Builder => $query->where('cpfcnpj', 'like', "%$cpfcnpj%"),
                            );
                    }),
                Filter::make('zip_code')
                    ->form([
                        TextInput::make('zip_code')
                            ->label('CEP')
                            ->placeholder('CEP do cliente')
                            ->live(),
                    ])
                    ->query(function (Builder $query, array $data): Builder {
                        return $query
                            ->when(
                                $data['zip_code'],
                                fn(Builder $query, $zip_code): Builder => $query->where('zip_code', 'like', "%$zip_code%"),
                            );
                    }),
                Filter::make('city')
                    ->form([
                        TextInput::make('city')
                            ->label('Cidade')
                            ->placeholder('Cidade do cliente')
                            ->live(),
                    ])
                    ->query(function (Builder $query, array $data): Builder {
                        return $query
                            ->when(
                                $data['city'],
                                fn(Builder $query, $city): Builder => $query->where('city', 'like', "%$city%"),
                            );
                    }),
                Filter::make('state')
                    ->form([
                        TextInput::make('state')
                            ->label('Estado')
                            ->placeholder('Estado do cliente')
                            ->live(),
                    ])
                    ->query(function (Builder $query, array $data): Builder {
                        return $query
                            ->when(
                                $data['state'],
                                fn(Builder $query, $state): Builder => $query->where('state', 'like', "%$state%"),
                            );
                    }),
                Filter::make('created_at')
                    ->form([
                        DatePicker::make('created_from')
                            ->label('Inicio'),
                    ])
                    ->query(function (Builder $query, array $data): Builder {
                        return $query
                            ->when(
                                $data['created_from'],
                                fn(Builder $query, $date): Builder => $query->whereDate('created_at', '>=', $date),
                            );
                    }),
                Filter::make('created_until')
                    ->form([
                        DatePicker::make('created_until')
                            ->label('Final'),
                    ])
                    ->query(function (Builder $query, array $data): Builder {
                        return $query
                            ->when(
                                $data['created_until'],
                                fn(Builder $query, $date): Builder => $query->whereDate('created_at', '<=', $date),
                            );
                    }),
            ], layout: FiltersLayout::AboveContentCollapsible)
            ->striped()
            ->actions([
                    EditAction::make('edit')
                        ->color('success')
                        ->model(User::class)
                        ->label('Editar')
                        ->modalHeading('Editar cliente')
                        ->steps([
                            Step::make('Client Details')
                                ->label('Cliente')
                                ->schema([
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
                                        ->unique(ignoreRecord: true)
                                        ->required()
                                        ->placeholder('E-mail do cliente')
                                        ->live(),
                                    Select::make('user_type_id')
                                        ->label('Tipo de cliente')
                                        ->options([
                                            '5' => 'Cliente',
                                        ])
                                        ->default('5')
                                        ->selectablePlaceholder(false)
                                        ->live(),
                                ])
                                ->columns(3),
                            Step::make('Address')
                                ->label('Endereço')
                                ->description('Endereço do cliente')
                                ->schema([
                                    TextInput::make('zip_code')
                                        ->label('CEP')
                                        ->mask('99999-999')
                                        ->required()
                                        ->live()
                                        ->maxLength(9)
                                        ->suffixAction(function ($state, $livewire, $set) {
                                            return suffixAction::make('search-action')
                                                ->icon('heroicon-m-magnifying-glass')
                                                ->action(function () use ($livewire, $state, $set) {
                                                    $livewire->validateOnly('zip_code');

                                                    $zip_code = str_replace(array('-', '.'), array('', ''), $state);

                                                    $request = Http::get("https://viacep.com.br/ws/$zip_code/json/")->json();
                                                    try {
                                                        $set('state', $request['uf']);
                                                        $set('city', $request['localidade']);
                                                        $set('neighborhood', $request['bairro']);
                                                        $set('street', $request['logradouro']);
                                                        $set('code_ibge', $request['ibge']);
                                                        $set('ddd', $request['ddd']);
                                                    } catch (Exception) {
                                                        $set('state', '');
                                                        $set('city', '');
                                                        $set('neighborhood', '');
                                                        $set('street', '');
                                                        $set('code_ibge', '');
                                                        $set('ddd', '');

                                                        Notification::make()
                                                            ->title('Erro! CEP não encontrado')
                                                            ->icon('heroicon-o-x-circle')
                                                            ->iconColor('danger')
                                                            ->send();
                                                    }
                                                });
                                        })
                                    ,
                                    TextInput::make('state')
                                        ->label('Estado')
                                        ->required()
                                        ->live(),
                                    TextInput::make('city')
                                        ->label('Cidade')
                                        ->required()
                                        ->live(),
                                    TextInput::make('neighborhood')
                                        ->label('Bairro')
                                        ->required()
                                        ->live(),
                                    TextInput::make('street')
                                        ->label('Rua')
                                        ->required()
                                        ->live(),
                                    TextInput::make('number')
                                        ->label('Número')
                                        ->live(),
                                    TextInput::make('complement')
                                        ->label('Complemento')
                                        ->live(),
                                    TextInput::make('code_ibge')
                                        ->label('Código IBGE')
                                        ->live(),
                                    TextInput::make('ddd')
                                        ->label('DDD')
                                        ->live(),
                                ])
                                ->columns(3),
                            Step::make('dataUser')
                                ->label('Dados do cliente')
                                ->description('Dados pessoais')
                                ->schema([
                                    TextInput::make('cpfcnpj')
                                        ->label('CPF/CNPJ')
                                        ->rules('required|min:14|max:18')
                                        ->placeholder('Cpf ou Cnpj do cliente')
                                        ->required()
                                        ->live(),
                                    TextInput::make('rg')
                                        ->label('Rg')
                                        ->placeholder('Rg do cliente'),
                                    TextInput::make('cellphone')
                                        ->label('Celular')
                                        ->string()
                                        ->mask('(99) 99999-9999')
                                        ->minLength(10)
                                        ->required()
                                        ->placeholder('Telefone do cliente')
                                        ->live(),
                                    TextInput::make('phone')
                                        ->label('Telefone')
                                        ->string()
                                        ->mask('(99) 9999-9999')
                                        ->minLength(10)
                                        ->placeholder('Telefone do cliente')
                                        ->live(),
                                    DatePicker::make('birth_date')
                                        ->label('Data de nascimento')
                                        ->required()
                                        ->live(),
                                    Select::make('sex')
                                        ->label('Genero')
                                        ->options(Gender::class)
                                        ->live(),
                                    Fieldset::make()
                                        ->schema([
                                            Select::make('marital_status')
                                                ->label('Status civil')
                                                ->placeholder('Selecione uma opção')
                                                ->options(MaritalStatus::class)
                                                ->live(),
                                            Select::make('children')
                                                ->label('Tem filhos?')
                                                ->placeholder('Selecione uma opção')
                                                ->options([
                                                    'YES' => 'Sim',
                                                    'NO' => 'Não',
                                                ])
                                                ->live(),
                                            Select::make('quantity_children')
                                                ->label('Quantos filhos?')
                                                ->placeholder('Selecione uma opção')
                                                ->options(fn(Get $get): array => match ($get('children')) {
                                                    'yes' => [
                                                        1 => 1,
                                                        2 => 2,
                                                        3 => 3,
                                                        4 => 4,
                                                        5 => 5,
                                                        6 => 6,
                                                        7 => 7,
                                                        8 => 8,
                                                        9 => 9,
                                                    ],
                                                    default => [0 => 0],
                                                })
                                        ])
                                        ->columns(3),
                                    TextInput::make('job')
                                        ->label('Profissão')
                                        ->placeholder('Profissão do cliente')
                                        ->live(),
                                    Select::make('vehicle')
                                        ->label('Possui veículo?')
                                        ->placeholder('Selecione uma opção')
                                        ->options([
                                            'yes' => 'Sim',
                                            'no' => 'Não',
                                        ])
                                        ->live(),
                                    Select::make('status')
                                        ->label('Status')
                                        ->placeholder('Selecione uma opção')
                                        ->options([
                                            'ACTIVE' => 'Ativo',
                                            'INACTIVE' => 'Inativo',
                                        ])
                                        ->live(),
                                    Select::make('attachments')
                                        ->label('Possui anexos?')
                                        ->placeholder('Selecione uma opção')
                                        ->options([
                                            'YES' => 'Sim',
                                            'NO' => 'Não',
                                        ])
                                        ->live(),
                                    RichEditor::make('observation')
                                        ->label('Observação')
                                        ->toolbarButtons([
                                            'attachFiles',
                                            'blockquote',
                                            'bold',
                                            'bulletList',
                                            'codeBlock',
                                            'h2',
                                            'h3',
                                            'italic',
                                            'link',
                                            'orderedList',
                                            'redo',
                                            'strike',
                                            'underline',
                                            'undo',
                                        ])
                                        ->placeholder('Descreva uma observação...')
                                        ->columnSpanFull()
                                        ->live(),
                                ]),
                        ]),
                DeleteAction::make('delete')
                    ->successNotification(null)
                    ->label('Deletar')
                    ->modalHeading('Deletar cliente')
                    ->after(function () {
                        Notification::make()
                            ->title('Cliente deletado')
                            ->success()
                            ->color('success')
                            ->duration(5000)
                            ->send();
                    })
            ]);

    }

    public function render(): View|Factory|Application
    {

        return view('livewire.clients.clients-component');
    }
}
