<?php

namespace App\Jobs;

use App\Mail\ContactMessage;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;

class SendContactEmail
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $contactData;

    /**
     * Create a new job instance.
     */
    public function __construct($contactData)
    {
        $this->contactData = $contactData;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        try {
            Mail::to('mpgroupcompany1@gmail.com')->send(new ContactMessage($this->contactData));
            Log::info('Email de contact envoyé avec succès');
        } catch (\Exception $e) {
            Log::error('Erreur envoi email contact via job: ' . $e->getMessage());
            throw $e; // Relancer l'exception pour que le job soit marqué comme échoué
        }
    }

    /**
     * Handle a job failure.
     */
    public function failed(\Throwable $exception): void
    {
        Log::error('Job d\'envoi d\'email de contact échoué: ' . $exception->getMessage());
    }
}