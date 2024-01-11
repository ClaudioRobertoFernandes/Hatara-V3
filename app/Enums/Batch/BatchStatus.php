<?php

use Filament\Support\Contracts\HasLabel;


enum BatchStatus: string implements HasLabel
{

    case ATIVO = 'ATIVO';
    case INATIVO = 'INATIVO';

    public function getName(): string
    {
        return match ($this) {
            self::ATIVO => 'ATIVO',
            self::INATIVO => 'INATIVO',
        };
    }

    public function getStyles(): string
    {
        return match ($this) {
            self::ATIVO => 'bg-green-400 text-gray-800',
            self::INATIVO => 'bg-red-400 text-yellow-800',
        };
    }

    public function getLabel(): ?string
    {
        return match ($this) {
            self::ATIVO => 'ATIVO',
            self::INATIVO => 'INATIVO',
        };
    }
}
