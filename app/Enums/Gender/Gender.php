<?php

namespace App\Enums\Gender;

use Filament\Support\Contracts\HasLabel;

enum Gender: string implements HasLabel
{

    case MALE = 'M';
    case FEMALE = 'F';
    case OTHER = 'I';

    public function getName(): string
    {
        return match ($this) {
            self::MALE => 'Masculino',
            self::FEMALE => 'Feminino',
            self::OTHER => 'Outro',
        };
    }

    public function getStyles(): string
    {
        return match ($this) {
            self::MALE => 'bg-green-400 text-gray-800',
            self::FEMALE => 'bg-pink-400 text-yellow-800',
            self::OTHER => 'bg-gray-400 text-gray-800',
        };
    }

    public function getLabel(): ?string
    {
        return match ($this) {
            self::MALE => 'Masculino',
            self::FEMALE => 'Feminino',
            self::OTHER => 'Outro',
        };
    }
}
