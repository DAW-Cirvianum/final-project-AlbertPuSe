<?php

use App\Http\Controllers\Api\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/me', [AuthController::class, 'me'])->middleware('auth:sanctum');

Route::post('register',[AuthController::class,'store'])->name('register.user');

Route::post('login',[AuthController::class,'login']);

Route::patch('users/{user}/role',[AuthController::class,'modifyRole']);