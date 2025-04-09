<?php

namespace App\Filament\Resources\InProgressOrderResource\Pages;

use App\Filament\Resources\InProgressOrderResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditInProgressOrder extends EditRecord
{
    protected static string $resource = InProgressOrderResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
