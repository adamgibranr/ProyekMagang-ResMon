<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\DeviceInfoResource;
use App\Models\DeviceInfo;
use App\Models\Computer;
use App\Http\Resources\ComputerResource;
// use App\Http\Requests\ComputerRequest;

class DeviceInfoController extends Controller
{
    //
    public function index() {

    }
    //
    //
    public function storeResource(Request $request) {
        try {
            $data = $request->all();
            $data = json_decode($data[0], true);

            $params = [
                // 'device_id' => $data['kernel_info']['device_id'],
                'device_mac_address' => $data['net_id']['mac_address'],
                'cpu_info' => json_encode($data['cpu_info']),
                'memory_info' => json_encode($data['memory_info']),
                'disk_info' => json_encode($data['disk_info']),
                'network_info' => json_encode($data['network_info']),
                'system_uptime' => json_encode($data['system_uptime']),
                'disk_io_counters' => json_encode($data['disk_io_counters']),
                'net_io_counters' => json_encode($data['net_io_counters']),
            ];

            $resource = DeviceInfo::create($params);

            // $cpu_cores = $data['cpu_info']['physical_cores'];
            // $cpu_thread = $data['cpu_info']['total_cores'];
            // $cpu_basefreq = $data['cpu_info']['processor_speed'];
            // $cpu_runfreq = '1';
            // $cpu_runtime = $data['cpu_info']['total_cpu_usage'];
            // $mem_total = $data['memory_info']['total_memory'];
            // $mem_available = $data['memory_info']['available_memory'];
            // $mem_used = $data['memory_info']['used_memory'];
            // $mem_runtime = $data['memory_info']['memory_percentage'];
            // $storage_total = $data['disk_info']['disk1']['total_space'];
            // $storage_available = $data['disk_info']['disk1']['free_space'];
            // $storage_used = $data['disk_info']['disk1']['used_space'];
            // $storage_runtime = $data['disk_info']['disk1']['usage_percentage'];
            // $disk_rspeed =$data['disk_io_counters']['read_speed'] ;
            // $disk_wspeed =$data['disk_io_counters']['write_speed'] ;
            // $disk_rtime =$data['disk_io_counters']['read_time'] ;
            // $disk_wtime =$data['disk_io_counters']['write_time'] ;
            // $pkt_sent = $data['net_io_counters']['packets_sent'];
            // $pkt_rec = $data['net_io_counters']['packets_recv'];
            // $byte_sent = $data['net_io_counters']['bytes_sent'];
            // $byte_rec = $data['net_io_counters']['bytes_recv'];
            // $ip_private = $data['net_id']['private_ip_address'];
            // $ip_public = $data['net_id']['public_ip_address'];
            // $mac_address = $data['net_id']['mac_address'];
            // $device_id = $data['kernel_info']['device_id'];
    
            // $resource = new DeviceRes;
            // $resource->device_id = $device_id;
            // $resource->cpu_cores = $cpu_cores;
            // $resource->cpu_thread = $cpu_thread;
            // $resource->cpu_basefreq = $cpu_basefreq;
            // $resource->cpu_runfreq = $cpu_runfreq;
            // $resource->cpu_runtime = $cpu_runtime;
            // $resource->mem_total = $mem_total;
            // $resource->mem_available = $mem_available;
            // $resource->mem_used = $mem_used;
            // $resource->mem_percentage = $mem_runtime;
            // $resource->storage_total = $storage_total;
            // $resource->storage_available = $storage_available;
            // $resource->storage_used = $storage_used;
            // $resource->storage_percentage = $storage_runtime;
            // $resource->disk_write_speed = $disk_wspeed;
            // $resource->disk_read_speed = $disk_rspeed;
            // $resource->pkt_sent = $pkt_sent;
            // $resource->pkt_rec = $pkt_rec;
            // $resource->byte_sent = $byte_sent;
            // $resource->byte_rec = $byte_rec;
            // $resource->ip_public = $ip_public;
            // $resource->ip_private = $ip_private;
            // $resource->mac_address = $mac_address;
            // $resource->save();
    
            echo json_encode($request->all());
        }
        catch(\Exception $e){
            echo json_encode($e->getMessage());
        }
       
    }
    // public function storeResource(Request $request) {
    //     $resource = DeviceRes::create($request->validated());
    //     return new DeviceResResource($computer);
    // }
    //
    //
    public function show($mac)
    {
        //
        $computer = new Computer;
        $computer = Computer::where('mac_address', $mac)->firstOrFail();
        return new ComputerResource($computer);
    }
    public function delete() {
        
    }
    //
}
