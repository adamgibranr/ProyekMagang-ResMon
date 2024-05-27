<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\DeviceInfoResource;


class ComputerResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // return parent::toArray($request);
        return [
            'id' => $this->id,
            'device_name' => $this->device_name,
            'ip_address' => $this->ip_address,
            'mac_address' => $this->mac_address,
            'device_resources' => DeviceInfoResource::collection($this->resources),
        ];
    }
}
