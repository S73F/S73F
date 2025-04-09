<?php

namespace App\Filament\Resources;

use App\Filament\Resources\NewOrderResource\Pages;
use App\Filament\Resources\NewOrderResource\RelationManagers;
use App\Models\NewOrder;
use App\Models\Order;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class NewOrderResource extends Resource
{
    protected static ?string $model = Order::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    protected static ?string $navigationGroup = 'Ordini';

    protected static ?string $navigationLabel = 'Nuovi';

    protected static ?string $pluralModelLabel = 'Ordini Nuovi';

    public static function getEloquentQuery(): Builder
    {
        return parent::getEloquentQuery()->where('stato', 0);
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
            'index' => Pages\ListNewOrders::route('/'),
            'create' => Pages\CreateNewOrder::route('/create'),
            'edit' => Pages\EditNewOrder::route('/{record}/edit'),
        ];
    }
}
