<?php

namespace App\Livewire\Igpm;

use App\Models\Igpm\Igpm;
use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Concerns\InteractsWithForms;
use Filament\Forms\Contracts\HasForms;
use Filament\Tables\Actions\CreateAction;
use Filament\Tables\Actions\DeleteAction;
use Filament\Tables\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Concerns\InteractsWithTable;
use Filament\Tables\Contracts\HasTable;
use Filament\Tables\Table;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;
use Illuminate\Foundation\Application;
use Livewire\Component;

class IgpmComponent extends Component implements HasTable, HasForms
{
    use InteractsWithTable;
    use InteractsWithForms;

    public function table(Table $table): Table
    {
        return $table
            ->query(Igpm::query())
            ->columns([
                TextColumn::make('id')
                    ->tooltip('Id')
                    ->label('ID')
                    ->sortable(),
                TextColumn::make('value')
                    ->tooltip('Valor mês')
                    ->label('Valor')
                    ->color('blue')
                    ->sortable(),
                TextColumn::make('reference')
                    ->label('Mês de Referência')
                    ->dateTime('d/m/Y')
                    ->sortable()
            ])
            ->defaultSort('reference', 'desc')
            ->actions([
                EditAction::make()
                    ->modalHeading('Editar indice')
                    ->label('Editar')
                    ->form([
                        TextInput::make('value')
                            ->numeric()
                            ->required(),
                        DateTimePicker::make('reference')
                            ->required(),
                    ]),
                DeleteAction::make('delete')
                    ->requiresConfirmation()
                    ->action(fn(Igpm $record) => $record->delete()),
            ])
            ->headerActions([
                CreateAction::make('create')
                    ->label('Novo')
                    ->color('success')
                    ->form([
                        TextInput::make('value')
                            ->label('Valor')
                            ->numeric()
                            ->required(),
                        DateTimePicker::make('reference')
                            ->label('Mês de Referência')
                            ->required(),
                    ])
                    ->modalHeading('Novo indice')
                    ->modalSubmitActionLabel('Criar')
                    ->createAnother(false)
                    ->modalCancelActionLabel('Cancelar')
            ])
            ->striped();
    }

    public function render(): View|Application|Factory
    {
        return view('livewire.igpm.igpm-component');
    }
}
