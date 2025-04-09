<?php

namespace App\Filament\Resources\InProgressOrderResource\Pages;

use App\Filament\Resources\InProgressOrderResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListInProgressOrders extends ListRecords
{
    protected static string $resource = InProgressOrderResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
