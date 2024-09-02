<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('HomePage');
});



require __DIR__.'/auth.php';
