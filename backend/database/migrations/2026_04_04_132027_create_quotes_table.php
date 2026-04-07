<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('quotes', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->string('prenom');
            $table->string('email');
            $table->string('telephone');
            $table->string('entreprise')->nullable();
            $table->string('type_evenement');
            $table->date('date_evenement');
            $table->string('lieu_evenement');
            $table->integer('nombre_participants');
            $table->text('description');
            $table->json('services_souhaites')->nullable();
            $table->decimal('budget_estime', 10, 2)->nullable();
            $table->enum('statut', ['nouveau', 'en_cours', 'traite', 'refuse'])->default('nouveau');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('quotes');
    }
};
