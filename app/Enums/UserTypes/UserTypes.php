<?php

namespace App\Enums\UserTypes;

enum UserTypes: int
{

    case OWNER = 1;
    case RENTER = 2;
    case REALESTATE = 3;
    case ACCOUNTING = 4;
    case CLIENT = 5;

    public function getName(): string
    {
        return match ($this) {
            self::OWNER => 'Proprietário',
            self::RENTER => 'Inquilino',
            self::REALESTATE => 'Imobiliária',
            self::ACCOUNTING => 'Contabilidade',
            self::CLIENT => 'Cliente',
        };
    }

    public function getStyles(): string
    {
        return match ($this) {
            self::OWNER => 'bg-green-100 text-gray-800',
            self::RENTER => 'bg-yellow-100 text-yellow-800',
            self::ACCOUNTING => 'bg-gray-100 text-green-800',
            self::REALESTATE => 'bg-red-100 text-red-800',
            self::CLIENT => 'bg-indigo-100 text-gray-800',
        };
    }
}
