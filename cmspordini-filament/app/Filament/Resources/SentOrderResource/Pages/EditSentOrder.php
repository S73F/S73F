<?php

namespace App\Filament\Resources\SentOrderResource\Pages;

use App\Filament\Resources\SentOrderResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditSentOrder extends EditRecord
{
    protected static string $resource = SentOrderResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
