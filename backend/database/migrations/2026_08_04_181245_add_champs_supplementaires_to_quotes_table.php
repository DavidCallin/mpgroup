<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('quotes', function (Blueprint $table) {
            $table->enum('image_souhaitee', ['basique', 'premium', 'prestige'])->nullable()->after('description');
            $table->enum('type_acces', ['invitation', 'billetterie'])->nullable()->after('image_souhaitee');
            $table->decimal('prix_ticket', 10, 2)->nullable()->after('type_acces');
        });
    }

    public function down(): void
    {
        Schema::table('quotes', function (Blueprint $table) {
            $table->dropColumn(['image_souhaitee', 'type_acces', 'prix_ticket']);
        });
    }
};
