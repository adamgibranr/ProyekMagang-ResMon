<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Computer;


class DeviceRes extends Model
{
    use HasFactory;
    protected $fillable = [
        'device_id',
        'cpu_cores',
        'cpu_thread',
        'cpu_basefreq',
        'cpu_runfreq',
        'cpu_runtime',
        'mem_total',
        'mem_available',
        'mem_used',
        'mem_percentage',
        'storage_total',
        'storage_available',
        'storage_used',
        'storage_percentage',
        'disk_read_speed',
        'disk_write_speed',
        'pkt_sent',
        'pkt_rec',
        'byte_sent',
        'byte_rec',
        'ip_private',
        'ip_public',
        'mac_address',
    ];
    public function computer()
    {
      return $this->belongsTo(Computer::class);
    }
}
