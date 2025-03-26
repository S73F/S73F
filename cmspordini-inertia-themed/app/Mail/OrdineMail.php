<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class OrdineMail extends Mailable
{
    use Queueable, SerializesModels;

    public $tipo;
    public $subject;
    public $ragioneSociale;

    /**
     * Create a new message instance.
     */
    public function __construct(
        $tipo,
        $subject,
        $ragioneSociale = null,
    ) {
        $this->tipo = $tipo;
        $this->subject = $subject;
        $this->ragioneSociale = $ragioneSociale;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: $this->subject,
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        switch ($this->tipo) {
            case "creazioneOrdine":
                return new Content(
                    view: 'confermaCreazioneOrdine',
                );
            case "ricezioneOrdine":
                return new Content(
                    view: 'confermaRicezioneOrdine',
                    with: ['ragioneSociale' => $this->ragioneSociale],
                );

            // Default content if no condition is met
            default:
                return new Content(
                    view: 'defaultView',
                );
        }
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
