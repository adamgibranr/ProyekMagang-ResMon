<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Computer;
use App\Http\Requests\ComputerRequest;
use App\Http\Resources\ComputerResource;
// use Illuminate\Http\Request;

class ComputerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        return ComputerResource::collection(Computer::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ComputerRequest $request)
    {
        //
        $computer = Computer::create($request->validated());
        return new ComputerResource($computer);
    }

    /**
     * Display the specified resource.
     */
    public function show(Computer $computer)
    {
        //
        return new ComputerResource($computer);
    }

    // public function show($mac)
    // {
    //     //
    //     $computer = new Computer;
    //     $computer = Computer::where('mac_address', $mac)->firstOrFail();
    //     return new ComputerResource($computer);
    // }

    /**
     * Update the specified resource in storage.
     */
    public function update(ComputerRequest $request, Computer $computer)
    {
        //
        $computer->update($request->validated());
        return new ComputerResource($computer);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Computer $computer)
    {
        //
        $computer->delete();
        return response()->noContent();
    }
}
