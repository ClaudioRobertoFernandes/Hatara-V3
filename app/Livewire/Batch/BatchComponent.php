<?php

namespace App\Livewire\Batch;

use App\Models\Batch\Batch;
use Filament\Notifications\Notification;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;
use Illuminate\Support\Collection;
use Livewire\Component;

class BatchComponent extends Component
{

    public Collection $batches;
    public int $countBatches = 0;
    public string $batch = '';
    public string $block = '';
    public string $sold = '';
    public string $settled = '';
    public string $written_down = '';
    public string $judicial_process = '';
    public string $authorization = '';
    public string $scan_contract = '';
    public string $structure = '';
    public string $registrationNotary = '';
    public string $status = '';
    public string $description = '';


    public function mount(): void
    {
        $this->batches = Batch::all();

        $this->countBatches = $this->batches->count();
    }

    public function save()
    {
        $this->validate([
            'batch' => 'required|string|max:10',
            'block' => 'required|string|max:10',
        ], [
            'batch.required' => 'O campo lote é obrigatório',
            'batch.string' => 'O campo lote deve ser uma string',
            'batch.max' => 'O campo lote deve ter no máximo 10 caracteres',
            'block.required' => 'O campo quadra é obrigatório',
            'block.string' => 'O campo quadra deve ser uma string',
            'block.max' => 'O campo quadra deve ter no máximo 10 caracteres',
        ]);

        $batch = new Batch();
        $batch->batch = $this->batch;
        $batch->block = $this->block;
        $batch->sold = $this->sold;
        $batch->settled = $this->settled;
        $batch->written_down = $this->written_down;
        $batch->judicial_process = $this->judicial_process;
        $batch->authorization = $this->authorization;
        $batch->scan_contract = $this->scan_contract;
        $batch->structure = $this->structure;
        $batch->registrationNotary = $this->registrationNotary;
        $batch->description = $this->description;
        $batch->status = __('ATIVO');
        $batch->save();

        Notification::make()
            ->title(__('Lote cadastrado com sucesso!'))
            ->success()
            ->send();

        $this->reset();

        return redirect()->route('batches');
    }

    public function render(): View|Factory|Application
    {
        return view('livewire.batch.batch-component');
    }
}
