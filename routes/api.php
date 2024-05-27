<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ResourceController;
use App\Http\Controllers\DeviceInfoController;
use App\Http\Controllers\Api\ComputerController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Route::post('/get-resource-device', [ResourceController::class, 'resourceDevice']);

Route::apiResource('computers', ComputerController::class);
Route::apiResource('computers/device-resources', DeviceInfoController::class);
// Route::post('books/{book}/ratings', 'RatingController@store');
Route::post('/post-device-resources', [DeviceInfoController::class, 'storeResource']);
