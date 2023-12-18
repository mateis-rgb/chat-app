<?php

use App\Http\Controllers\FriendshipController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SearchController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    // Profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Api
    Route::get('/friends/{id}/send', [FriendshipController::class, 'send']);
    Route::get('/friends/{id}/remove', [FriendshipController::class, 'remove']);
    Route::get('/friends/{id}/accept', [FriendshipController::class, 'accept']);
    Route::get('/friends/{id}/deny', [FriendshipController::class, 'deny']);
});

Route::get('/friends/get', [FriendshipController::class, 'index']);
Route::get('/friends/get/pending', [FriendshipController::class, 'getPendings']);

Route::get("/search/profile", [SearchController::class, 'profile']);

require __DIR__.'/auth.php';
