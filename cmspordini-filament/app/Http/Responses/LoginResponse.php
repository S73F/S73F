<?php

namespace App\Http\Responses;

use Filament\Pages\Dashboard;
use Illuminate\Http\RedirectResponse;
use Livewire\Features\SupportRedirects\Redirector;
use Filament\Http\Responses\Auth\LoginResponse as BaseLoginResponse;

class LoginResponse extends BaseLoginResponse
{
    public function toResponse($request): RedirectResponse|Redirector
    {
        if (auth()->user()->role === 1) {
            return redirect()->to(Dashboard::getUrl(panel: 'operator'));
        } else if (auth()->user()->role === 2) {
            return redirect()->to(Dashboard::getUrl(panel: 'customer'));
        }

        return parent::toResponse($request);
    }
}