<?php

namespace App\Livewire\Batch;

use App\Models\Batch\Batch;
use Exception;
use Filament\Forms\Concerns\InteractsWithForms;
use Filament\Forms\Contracts\HasForms;
use Filament\Tables\Actions\CreateAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Concerns\InteractsWithTable;
use Filament\Tables\Contracts\HasTable;
use Filament\Tables\Table;
use Livewire\Component;

class BatchComponent extends Component implements HasForms, HasTable
{
    use InteractsWithTable;
    use InteractsWithForms;

    /**
     * @throws Exception
     */
    public function table(Table $table): Table
    {
        return $table
            ->query(Batch::query())
            ->headerActions([
                CreateAction::make()->label('Create Batch'),
            ])
            ->columns([
                TextColumn::make('id'),
                TextColumn::make('batch')
                    ->label('Lote'),
                TextColumn::make('block')
                    ->label('Quadra'),
                TextColumn::make('sold')
                    ->label('Vendido')
                    ->badge()
                    ->color(fn(string $state): string => match ($state) {
                        'SIM' => 'success',
                        'NÃO' => 'danger',
                    }),
                TextColumn::make('settled')
                    ->label('Quitado')
                    ->badge()
                    ->color(fn(string $state): string => match ($state) {
                        'SIM' => 'success',
                        'NÃO' => 'danger',
                    }),
                TextColumn::make('written_down')
                    ->label('Escriturado')
                    ->badge()
                    ->color(fn(string $state): string => match ($state) {
                        'SIM' => 'success',
                        'NÃO' => 'danger',
                    }),
                TextColumn::make('judicial_process')
                    ->label('Processo judicial')
                    ->badge()
                    ->color(fn(string $state): string => match ($state) {
                        'SIM' => 'success',
                        'NÃO' => 'danger',
                    }),
                TextColumn::make('scan_contract')
                    ->label('Contrato scaneado')
                    ->badge()
                    ->color(fn(string $state): string => match ($state) {
                        'SIM' => 'success',
                        'NÃO' => 'danger',
                    }),
                TextColumn::make('registrationNotary')
                    ->label('Registro em cartório')
                    ->badge()
                    ->color(fn(string $state): string => match ($state) {
                        'SIM' => 'success',
                        'NÃO' => 'danger',
                    }),
                TextColumn::make('status')
                    ->label('Status')
                    ->badge()
                    ->color(fn(string $state): string => match ($state) {
                        'ATIVO' => 'success',
                        'INATIVO' => 'danger',
                    }),
                TextColumn::make('description')
                    ->label('Descrição')
                    ->limit(10),

            ]);

    }

    public function render()
    {
        return view('livewire.batch.batch-component');
    }
}
