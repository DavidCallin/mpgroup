<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // Les colonnes nom/prenom/telephone/entreprise/sujet existent déjà
        // Il reste à supprimer les anciennes colonnes obsolètes
        Schema::table('contact', function (Blueprint $table) {
            $table->dropColumn(['fullname', 'phone', 'organization']);
        });
    }

    public function down(): void
    {
        Schema::table('contact', function (Blueprint $table) {
            $table->string('fullname')->nullable();
            $table->string('phone', 20)->nullable();
            $table->string('organization')->nullable();
            $table->dropColumn(['nom', 'prenom', 'telephone', 'entreprise', 'sujet']);
        });
    }
};
