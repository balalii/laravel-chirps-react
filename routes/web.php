<?php


use App\Http\Controllers\ChirpController;
use App\Http\Controllers\ChirpManagerController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserManagerController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::resource('chirps', ChirpController::class)
    ->only(['index', 'store', 'update', 'destroy'])
    ->middleware(['auth', 'verified']);

Route::resource('dashboard', DashboardController::class)
    ->only(['index'])
    ->middleware(['auth', 'verified'])
    ->name('index', 'dashboard');

Route::prefix('dashboard/admin')
    ->name("dashboard.admin.")
    ->group(function () {
        Route::resource('users', UserManagerController::class)
            ->only(['index', 'update', 'destroy']);
        Route::resource('chirps', ChirpManagerController::class)
            ->only(['index', 'destroy']);
    });

require __DIR__ . '/auth.php';
