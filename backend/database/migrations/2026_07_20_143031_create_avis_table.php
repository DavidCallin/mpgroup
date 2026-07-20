<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
            Schema::create('avis', function (Blueprint $table) {
            $table->id();
            $table->string('nom_complet');
            $table->string('email')->nullable();
            $table->string('nom_evenement'); // ex: "Sommet Économique 2025"
            $table->tinyInteger('note'); // 1 à 5 étoiles
            $table->text('commentaire');
            $table->enum('statut', ['en_attente', 'publie', 'rejete'])->default('en_attente');
            $table->timestamps();
        });

        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique();
            $table->string('value');
            $table->timestamps();
        });

        // Valeur par défaut : modération activée
        DB::table('settings')->insert([
            'key' => 'avis_auto_publish',
            'value' => 'false',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('avis');
    }
};
