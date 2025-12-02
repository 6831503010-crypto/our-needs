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
        Schema::create('quizz_attempts', function (Blueprint $table) {
            $table->id();

            $table->foreignId('quiz_id')
                ->constrained('quizzes')
                ->cascadeOnDelete();

            $table->foreignId('student_id')
                ->constrained('users')
                ->cascadeOnDelete(); // must be a student

            $table->string('google_response_id')->nullable();

            $table->decimal('score', 5, 2)->nullable();
            $table->timestamp('submitted_at')->nullable();

            $table->enum('status', ['unattempted', 'submitted', 'late', 'invalid'])
                ->default('unattempted')
                ->index();

            $table->json('raw_payload')->nullable();

            $table->timestamps();

            $table->unique(['quiz_id', 'student_id']); // one attempt per quiz per student (optional)
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('quizz_attempts');
    }
};
