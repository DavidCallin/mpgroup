<?php

namespace App\Mail;

use App\Models\Quote;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class QuoteMessage extends Mailable
{
    use Queueable, SerializesModels;

    public array $quoteData;
    public int $quoteId;

    public function __construct(Quote $quote)
    {
        $this->quoteData = $quote->toArray();
        $this->quoteId = $quote->id;
    }

    public function envelope(): Envelope
    {
        $numeroDevis = 'Devis' . str_pad($this->quoteId, 4, '0', STR_PAD_LEFT);

        return new Envelope(
            subject: "Devis N° {$numeroDevis} - Nouvelle demande de devis MP GROUP",
            replyTo: $this->quoteData['email']
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.quote-message',
            with: [
                'quoteData' => $this->quoteData,
                'quoteId' => $this->quoteId,
            ],
        );
    }

    public function attachments(): array
    {
        return [];
    }
}