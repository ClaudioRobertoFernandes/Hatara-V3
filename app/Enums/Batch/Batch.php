<?php

namespace App\Enums\Batch;

use Filament\Support\Contracts\HasLabel;

enum Batch: string implements HasLabel
{

    case SIM = 'SIM';
    case NAO = 'NAO';

    public function getName(): string
    {
        return match ($this) {
            self::SIM => 'SIM',
            self::NAO => 'NÃO',
        };
    }

    public function getStyles(): string
    {
        return match ($this) {
            self::SIM => 'rounded-md py-1 px-2 text-xs font-medium ring-1 ring-inset text-green-700 bg-green-50 ring-green-600/20',
            self::NAO => 'rounded-md py-1 px-2 text-xs font-medium ring-1 ring-inset text-red-700 bg-red-50 ring-red-600/10',
        };
    }

    public function getLabel(): ?string
    {
        return match ($this) {
            self::SIM => 'SIM',
            self::NAO => 'NÃO',
        };
    }
}
