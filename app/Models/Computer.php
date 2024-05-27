<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\DeviceInfo;

class Computer extends Model
{
    use HasFactory;
    protected $fillable = [
        'device_name',
        'ip_address',
        'mac_address',
    ];
    public function resources()
    {
      return $this->hasMany(DeviceInfo::class, 'device_mac_address', 'mac_address');
    }
}
