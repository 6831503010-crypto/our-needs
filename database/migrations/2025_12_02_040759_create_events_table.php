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
        Schema::create('events', function (Blueprint $table) {
            $table->id();

            $table->foreignId('created_by')
                ->constrained('users')
                ->cascadeOnDelete(); // teacher/admin

            $table->string('title');
            $table->text('description')->nullable();
            $table->string('location')->nullable();

            $table->timestamp('starts_at')->nullable();
            $table->timestamp('ends_at')->nullable();

            $table->unsignedInteger('capacity')->nullable(); // null = no limit

            $table->string('google_form_url');
            $table->string('google_form_id')->nullable();
            $table->string('google_sheet_id')->nullable();

            $table->boolean('is_published')->default(false)->index();

            $table->json('meta')->nullable(); // e.g., type, tags etc.

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
