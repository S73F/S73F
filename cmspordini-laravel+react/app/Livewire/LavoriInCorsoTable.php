<?php

namespace App\Livewire;

use App\Models\Ordine;
use Livewire\Component;
use Livewire\WithPagination;

class LavoriInCorsoTable extends Component
{
    use WithPagination;

    public function render()
    {
        $lavori = Ordine::with(['cliente', 'operatore'])->where('stato', '!=', 0)->orderBy('data', 'desc')->paginate(10);

        return view('livewire.lavori-in-corso-table', compact('lavori'));
    }
}
