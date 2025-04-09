<?php

namespace App\Filament\Resources;

use App\Filament\Resources\SentOrderResource\Pages;
use App\Filament\Resources\SentOrderResource\RelationManagers;
use App\Models\Order;
use App\Models\SentOrder;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class SentOrderResource extends Resource
{
    protected static ?string $model = Order::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    protected static ?string $navigationGroup = 'Ordini';

    protected static ?string $navigationLabel = 'Spediti';

    protected static ?string $pluralModelLabel = 'Ordini spediti';

    public static function getEloquentQuery(): Builder
    {
        return parent::getEloquentQuery()->where('stato', 2);
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
            'index' => Pages\ListSentOrders::route('/'),
            'create' => Pages\CreateSentOrder::route('/create'),
            'edit' => Pages\EditSentOrder::route('/{record}/edit'),
        ];
    }
}
