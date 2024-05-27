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
        Schema::create('device_infos', function (Blueprint $table) {
            $table->id();
            // $table->string('device_id');
            $table->string('device_mac_address');
            $table->json('cpu_info');
            $table->json('memory_info');
            $table->json('disk_info');
            $table->json('network_info');
            $table->json('system_uptime');
            $table->json('disk_io_counters');
            $table->json('net_io_counters');
            $table->timestamps();
            $table->foreign('device_mac_address')
                ->references('mac_address')
                ->on('computers');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('device_infos');
    }
};
