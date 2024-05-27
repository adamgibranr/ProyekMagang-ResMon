<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Computer;


class DeviceInfo extends Model
{
    use HasFactory;
    protected $guarded = [];
    
    public function computer()
    {
      return $this->belongsTo(Computer::class, 'device_mac_address', 'mac_address');
    }
    
   
}
