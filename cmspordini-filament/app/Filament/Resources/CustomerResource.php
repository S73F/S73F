<?php

namespace App\Filament\Resources;

use App\Filament\Resources\CustomerResource\Pages;
use App\Filament\Resources\CustomerResource\RelationManagers;
use App\Models\Customer;
use Filament\Actions\ActionGroup;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class CustomerResource extends Resource
{
    protected static ?string $model = Customer::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    protected static ?string $navigationLabel = 'Clienti';

    protected static ?string $label = 'Cliente';

    protected static ?string $pluralLabel = 'Clienti';

    protected static ?string $slug = 'clienti';

    // public static function form(Form $form): Form
    // {
    //     return $form
    //         ->schema([
    //             Forms\Components\TextInput::make('ragioneSociale')
    //                 ->required()
    //                 ->maxLength(100),
    //             Forms\Components\TextInput::make('nome')
    //                 ->maxLength(50),
    //             Forms\Components\TextInput::make('cognome')
    //                 ->maxLength(50),
    //             Forms\Components\TextInput::make('partitaIva')
    //                 ->required()
    //                 ->maxLength(50),
    //             Forms\Components\TextInput::make('indirizzo')
    //                 ->required()
    //                 ->maxLength(50),
    //             Forms\Components\TextInput::make('citta')
    //                 ->required()
    //                 ->maxLength(50),
    //             Forms\Components\TextInput::make('cap')
    //                 ->required()
    //                 ->numeric(),
    //             Forms\Components\TextInput::make('provincia')
    //                 ->required()
    //                 ->maxLength(50),
    //             Forms\Components\TextInput::make('email')
    //                 ->required()
    //                 ->maxLength(150),
    //             Forms\Components\TextInput::make('password')
    //                 ->required()
    //                 ->maxLength(150),
    //         ]);
    // }
    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('ragioneSociale')
                    ->required()
                    ->maxLength(100),
                Forms\Components\TextInput::make('nome')
                    ->maxLength(50),
                Forms\Components\TextInput::make('cognome')
                    ->maxLength(50),
                Forms\Components\TextInput::make('partitaIva')
                    ->required()
                    ->maxLength(50),
                Forms\Components\TextInput::make('indirizzo')
                    ->required()
                    ->maxLength(50),
                Forms\Components\TextInput::make('citta')
                    ->required()
                    ->maxLength(50),
                Forms\Components\TextInput::make('cap')
                    ->required()
                    ->numeric(),
                Forms\Components\TextInput::make('provincia')
                    ->required()
                    ->maxLength(50),
                Forms\Components\TextInput::make('email')
                    ->required()
                    ->maxLength(150),
                Forms\Components\TextInput::make('password')
                    ->required()
                    ->maxLength(150),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('ragioneSociale')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('nome')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('cognome')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('partitaIva')
                    ->searchable(),
                Tables\Columns\TextColumn::make('user.email')
                    ->label('Email')
                    ->searchable(),
                Tables\Columns\TextColumn::make('indirizzo')
                    ->searchable()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('citta')
                    ->searchable()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('cap')
                    ->numeric()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('provincia')
                    ->searchable()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('created_at')
                    ->label('Data di creazione')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('updated_at')
                    ->label('Ultima modifica')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\ActionGroup::make([
                    Tables\Actions\ViewAction::make(),
                    Tables\Actions\EditAction::make(),
                    Tables\Actions\DeleteAction::make(),
                ])
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
            'index' => Pages\ListCustomers::route('/'),
            'create' => Pages\CreateCustomer::route('/create'),
            'edit' => Pages\EditCustomer::route('/{record}/edit'),
        ];
    }
}
