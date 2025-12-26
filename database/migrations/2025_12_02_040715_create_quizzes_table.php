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
        Schema::create('quizzes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('teacher_id')
                ->constrained('teachers')
                ->cascadeOnDelete();

            $table->foreignId('subject_id')
                ->constrained('subjects')
                ->cascadeOnDelete();

            $table->string('title');
            $table->text('description')->nullable();

            $table->string('google_form_url');
            $table->string('google_form_id')->nullable();
            $table->string('google_sheet_id')->nullable();

            $table->unsignedInteger('max_score')->nullable();

            // $table->timestamp('open_at')->nullable();
            // $table->timestamp('close_at')->nullable();

            $table->boolean('is_published')->default(false)->index();

            $table->json('meta')->nullable(); // extra info: course, chapter, etc.

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('quizzes');
    }
};
