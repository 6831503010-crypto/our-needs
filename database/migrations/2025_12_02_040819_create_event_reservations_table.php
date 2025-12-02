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
        Schema::create('event_reservations', function (Blueprint $table) {
            $table->id();

            $table->foreignId('event_id')
                ->constrained('events')
                ->cascadeOnDelete();

            $table->foreignId('student_id')
                ->nullable()
                ->constrained('users')
                ->nullOnDelete();

            $table->string('name')->nullable();   // snapshot from form
            $table->string('email')->nullable();  // snapshot from form

            $table->string('google_response_id')->nullable();

            $table->enum('status', ['pending', 'confirmed', 'cancelled', 'waitlisted'])
                ->default('pending')
                ->index();

            $table->timestamp('reserved_at')->nullable();

            $table->json('raw_payload')->nullable();

            $table->timestamps();

            $table->index(['event_id', 'status']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('event_reservations');
    }
};
