<?php

namespace App\Enums\MaritalStatus;

use Filament\Support\Contracts\HasLabel;

enum MaritalStatus: string implements HasLabel
{

    case MARRIED = 'C';
    case DIVORCED = 'D';
    case WIDOWED = 'V';
    case STABLEUNION = 'U';
    case SINGLE = 'S';
    case COMPANY = 'E';

    public function getName(): string
    {
        return match ($this) {
            self::MARRIED => 'Casado',
            self::DIVORCED => 'Divorciado',
            self::WIDOWED => 'Viúvo',
            self::STABLEUNION => 'União Estável',
            self::SINGLE => 'Solteiro',
            self::COMPANY => 'Empresa',

        };
    }

    public function getStyles(): string
    {
        return match ($this) {
            self::MARRIED => 'bg-red-400 text-gray-800',
            self::DIVORCED => 'bg-yellow-400 text-gray-800',
            self::WIDOWED => 'bg-dark-400 text-white-800',
            self::STABLEUNION => 'bg-pink-400 text-gray-800',
            self::SINGLE => 'bg-green-400 text-gray-800',
            self::COMPANY => 'bg-blue-400 text-gray-800',
        };
    }

    public function getLabel(): ?string
    {
        return match ($this) {
            self::MARRIED => 'Casado',
            self::DIVORCED => 'Divorciado',
            self::WIDOWED => 'Viúvo',
            self::STABLEUNION => 'União Estável',
            self::SINGLE => 'Solteiro',
            self::COMPANY => 'Empresa',
        };
    }

}
