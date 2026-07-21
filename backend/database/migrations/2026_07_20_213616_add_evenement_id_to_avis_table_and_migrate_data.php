<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // 1. Ajouter la colonne evenement_id
        Schema::table('avis', function (Blueprint $table) {
            $table->foreignId('evenement_id')->nullable()->after('id')->constrained('evenements')->cascadeOnDelete();
        });

        // 2. Créer l'événement unique qui va regrouper tous les avis existants
        $evenementId = DB::table('evenements')->insertGetId([
            'nom' => 'Wilson BOTOYIYE Summit',
            'actif' => true,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // 3. Relier TOUS les avis existants à cet événement
        DB::table('avis')->update(['evenement_id' => $evenementId]);

        // 4. Supprimer l'ancienne colonne texte, devenue inutile
        Schema::table('avis', function (Blueprint $table) {
            $table->dropColumn('nom_evenement');
        });

        // 5. Rendre evenement_id obligatoire pour les futurs avis
        Schema::table('avis', function (Blueprint $table) {
            $table->foreignId('evenement_id')->nullable(false)->change();
        });
    }

    public function down(): void
    {
        Schema::table('avis', function (Blueprint $table) {
            $table->string('nom_evenement')->nullable();
        });

        DB::table('avis')
            ->join('evenements', 'avis.evenement_id', '=', 'evenements.id')
            ->update(['avis.nom_evenement' => DB::raw('evenements.nom')]);

        Schema::table('avis', function (Blueprint $table) {
            $table->dropForeign(['evenement_id']);
            $table->dropColumn('evenement_id');
        });
    }
};