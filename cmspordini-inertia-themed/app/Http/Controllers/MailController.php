<?php

namespace App\Http\Controllers;

use App\Mail\OrdineMail;
use Illuminate\Support\Facades\Mail;

class MailController extends Controller
{
    function sendOrdineCreatoEmail($destinatario, $ragioneSociale, $numero, $anno, $mailOperatori)
    {
        $oggettoCliente = "Conferma creazione ordine n°{$numero}/{$anno}";
        $oggettoOperatore = "Nuovo ordine n°{$numero}/{$anno} ricevuto";

        Mail::to($destinatario)->send(new OrdineMail("creazioneOrdine", $oggettoCliente));

        foreach ($mailOperatori as $mailOperatore) {
            Mail::to($mailOperatore)->send(new OrdineMail("ricezioneOrdine", $oggettoOperatore, $ragioneSociale));
        }

        return "Emails sent";
    }
}
