<?php

namespace App\Filament\Resources;

use App\Filament\Resources\InProgressOrderResource\Pages;
use App\Filament\Resources\InProgressOrderResource\RelationManagers;
use App\Models\InProgressOrder;
use App\Models\Order;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class InProgressOrderResource extends Resource
{
    protected static ?string $model = Order::class;
    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    protected static ?string $navigationGroup = 'Ordini';

    protected static ?string $navigationLabel = 'In corso';

    protected static ?string $pluralModelLabel = 'Ordini in corso';

    public static function getEloquentQuery(): Builder
    {
        return parent::getEloquentQuery()->where('stato', 1);
    }

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                //
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                //
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListInProgressOrders::route('/'),
            'create' => Pages\CreateInProgressOrder::route('/create'),
            'edit' => Pages\EditInProgressOrder::route('/{record}/edit'),
        ];
    }
}
