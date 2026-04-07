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
        Schema::create('contact', function (Blueprint $table) {
            $table->id()->autoIncrement()->startingValue(1)->unique();
            $table->string('fullname');
            $table->string('organization');
            $table->string('email');
            $table->string('phone', 20);
            $table->text('message');
            $table->date('contactCreatedAt')->useCurrent();
            $table->enum('contactStatus', ['nouveau', 'lu'])->default('nouveau');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contact');
    }
};
