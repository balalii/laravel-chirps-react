<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
public function up(): void
{
    Schema::table('chirps', function (Blueprint $table) {
        $table->string('media_path')->nullable();
        $table->string('media_type')->nullable();
    });
}

    public function down(): void
    {
        Schema::table('chirps', function (Blueprint $table) {
            $table->dropColumn(['media_path', 'media_type']);
        });
    }
};