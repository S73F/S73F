<?php

namespace App\Filament\Resources\InProgressOrderResource\Pages;

use App\Filament\Resources\InProgressOrderResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;

class CreateInProgressOrder extends CreateRecord
{
    protected static string $resource = InProgressOrderResource::class;
}
