<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\TestController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\Api\QuoteController;
use App\Http\Controllers\Api\AvisController;



// Route de test API
Route::get('/test', [TestController::class, 'test']);

// Route de contact API (publique)
Route::post('/contact', [ContactController::class, 'apiStore'])->name('api.contact');

// Route de devis API (publique)
Route::post('/quotes', [QuoteController::class, 'store'])->name('api.quotes.store');

/*
|--------------------------------------------------------------------------
| API Routes - Contact Management (Admin only)
|--------------------------------------------------------------------------
*/
Route::middleware(['auth:sanctum', 'admin'])->prefix('admin')->group(function () {
    Route::get('/contacts', [ContactController::class, 'index']);
    Route::get('/contacts/{contact}', [ContactController::class, 'show']);
    Route::put('/contacts/{contact}', [ContactController::class, 'update']);
    Route::delete('/contacts/{contact}', [ContactController::class, 'destroy']);
});

/*
|--------------------------------------------------------------------------
| API Routes - Quote Management (Admin only)
|--------------------------------------------------------------------------
*/
Route::middleware(['auth:sanctum', 'admin'])->prefix('admin')->group(function () {
    Route::get('/quotes', [QuoteController::class, 'index']);
    Route::get('/quotes/{quote}', [QuoteController::class, 'show']);
    Route::put('/quotes/{quote}', [QuoteController::class, 'update']);
    Route::delete('/quotes/{quote}', [QuoteController::class, 'destroy']);
    Route::patch('/quotes/{quote}/status', [QuoteController::class, 'updateStatus']);
});

/*
|--------------------------------------------------------------------------
| API Routes - Auth
|--------------------------------------------------------------------------
*/

Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/auth/forgot-password', [AuthController::class, 'forgotPassword']);
Route::post('/auth/reset-password', [AuthController::class, 'resetPassword']);

// Routes protégées par Sanctum
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::get('/auth/user', function (Request $request) {
        return $request->user();
    });
});

/*
|--------------------------------------------------------------------------
| API Routes - Admin Dashboard (protected)
|--------------------------------------------------------------------------
*/

Route::middleware(['auth:sanctum', 'admin'])->prefix('admin')->group(function () {
    Route::get('/stats', [\App\Http\Controllers\Api\AdminController::class, 'stats']);
    Route::get('/recent-messages', [\App\Http\Controllers\Api\AdminController::class, 'recentMessages']);
    Route::get('/recent-news', [\App\Http\Controllers\Api\AdminController::class, 'recentNews']);
});

/*
|--------------------------------------------------------------------------
| API Routes - News / Actualites
|--------------------------------------------------------------------------
*/
// Route publique pour lire les actualités
Route::get('/news', [App\Http\Controllers\ActualitesController::class, 'index']);
Route::get('/news/popular', [App\Http\Controllers\ActualitesController::class, 'popular']);
Route::get('/news/{id}', [App\Http\Controllers\ActualitesController::class,'show']);

// Routes protégées pour la gestion des actualités (admin seulement)
Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::post('/news', [App\Http\Controllers\ActualitesController::class, 'store']);
    Route::put('/news/{id}', [App\Http\Controllers\ActualitesController::class,'update']);
    Route::delete('/news/{id}', [App\Http\Controllers\ActualitesController::class,'destroy']);
    Route::post('/news/upload', [App\Http\Controllers\ActualitesController::class, 'upload']);
});


// Public
Route::post('/avis', [AvisController::class, 'store']);
Route::get('/avis', [AvisController::class, 'index']);
Route::get('/avis/stats', [AvisController::class, 'stats']);

// Admin (protégé par le middleware existant, ex: auth:sanctum + AdminMiddleware)
Route::middleware(['auth:sanctum', 'admin'])->prefix('admin')->group(function () {
    Route::get('/avis', [AvisController::class, 'adminIndex']);
    Route::patch('/avis/{avi}/approve', [AvisController::class, 'approve']);
    Route::patch('/avis/{avi}/reject', [AvisController::class, 'reject']);
    Route::delete('/avis/{avi}', [AvisController::class, 'destroy']);
    Route::get('/settings/avis-auto-publish', [AvisController::class, 'getAutoPublish']);
    Route::put('/settings/avis-auto-publish', [AvisController::class, 'setAutoPublish']);
});
