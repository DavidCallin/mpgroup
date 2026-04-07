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
        Schema::create('actualites', function (Blueprint $table) {
            $table->id()->autoIncrement()->startingValue(1)->unique();
            $table->string('title');
            $table->text('content');
            $table->string('image_url')->nullable();
            $table->json('tags')->nullable()->comment('JSON array of tags');
            $table->enum('actualiteStatus', ['published', 'draft'])->default('draft');
            $table->timestamp('actualiteCreatedAt')->useCurrent();
            $table->integer('nbrViews')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
