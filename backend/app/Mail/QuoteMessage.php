<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class QuoteMessage extends Mailable
{
    use Queueable, SerializesModels;

    public $quoteData;

    public function __construct($quoteData)
    {
        $this->quoteData = $quoteData;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Nouvelle demande de devis - MP GROUP',
            replyTo: $this->quoteData['email']
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.quote-message',
        );
    }

    public function attachments(): array
    {
        return [];
    }
}
