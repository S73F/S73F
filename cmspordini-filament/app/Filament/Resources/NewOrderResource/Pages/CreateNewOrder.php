<?php

namespace App\Filament\Resources\NewOrderResource\Pages;

use App\Filament\Resources\NewOrderResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;

class CreateNewOrder extends CreateRecord
{
    protected static string $resource = NewOrderResource::class;
}
