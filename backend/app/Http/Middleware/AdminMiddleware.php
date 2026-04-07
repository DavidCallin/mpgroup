<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Vérifier si l'utilisateur est authentifié
        if (!auth()->check()) {
            if ($request->expectsJson()) {
                return response()->json([
                    'message' => 'Non authentifié. Accès refusé.',
                    'error' => 'Unauthorized'
                ], 401);
            }
            
            return redirect()->route('login');
        }

        // Optionnel : Ajouter des vérifications supplémentaires pour les rôles admin
        // if (!auth()->user()->isAdmin()) {
        //     return response()->json(['message' => 'Accès refusé. Droits administrateur requis.'], 403);
        // }

        return $next($request);
    }
}