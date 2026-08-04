<?php

namespace App\Console\Commands;

use App\Mail\QuoteMessage;
use App\Models\Quote;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;

class ResendQuoteEmails extends Command
{
    protected $signature = 'quotes:resend-emails 
                            {--dry-run : Afficher ce qui serait envoyé sans envoyer réellement}
                            {--delay=2 : Délai en secondes entre chaque envoi (évite le rate-limit du SMTP)}';

    protected $description = 'Renvoie l\'email de notification pour tous les devis existants en base';

    public function handle(): int
    {
        $isDryRun = $this->option('dry-run');
        $delay = (int) $this->option('delay');

        $quotes = Quote::orderBy('id')->get();
        $total = $quotes->count();

        if ($total === 0) {
            $this->warn('Aucun devis trouvé en base.');
            return self::SUCCESS;
        }

        $this->info("📧 {$total} devis trouvé(s) en base.");

        if ($isDryRun) {
            $this->warn('Mode dry-run activé : aucun email ne sera réellement envoyé.');
        }

        if (!$isDryRun && !$this->confirm("Confirmer l'envoi de {$total} emails vers mpgroupcompany1@gmail.com ?")) {
            $this->info('Annulé.');
            return self::SUCCESS;
        }

        $bar = $this->output->createProgressBar($total);
        $bar->start();

        $success = 0;
        $failed = 0;

        foreach ($quotes as $quote) {
            try {
                if (!$isDryRun) {
                    Mail::to('mpgroupcompany1@gmail.com')->send(new QuoteMessage($quote));
                    sleep($delay);
                }
                $success++;
            } catch (\Exception $e) {
                $failed++;
                $this->newLine();
                $this->error("Échec pour le devis #{$quote->id} ({$quote->email}) : " . $e->getMessage());
            }

            $bar->advance();
        }

        $bar->finish();
        $this->newLine(2);

        $this->info("✅ Envoyés avec succès : {$success}");
        if ($failed > 0) {
            $this->error("❌ Échecs : {$failed}");
        }

        return self::SUCCESS;
    }
}