<?php

use App\Http\Middleware\HandleAppearance;
use App\Http\Middleware\HandleInertiaRequests;
use App\Http\Middleware\AdminMiddleware;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;
use Illuminate\Http\Request;
use Throwable;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
    web: __DIR__.'/../routes/web.php',
    api: __DIR__.'/../routes/api.php', 
    commands: __DIR__.'/../routes/console.php',
    health: '/up',
)
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->encryptCookies(except: ['appearance', 'sidebar_state']);

        $middleware->web(append: [
            HandleAppearance::class,
            HandleInertiaRequests::class,
            AddLinkHeadersForPreloadedAssets::class,
        ]);
        $middleware->validateCsrfTokens(except: [
            'api/*', // Ex: 'contact' ou 'api/*'
        ]);
        
        // Enregistrer le middleware admin
        $middleware->alias([
            'admin' => AdminMiddleware::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->render(function (Throwable $e, Request $request) {
            if (!$request->is('api/*')) {
                return null; // laisse Laravel gérer normalement les routes web/Inertia
            }

            $status = match (true) {
                $e instanceof \Illuminate\Validation\ValidationException => 422,
                $e instanceof \Illuminate\Auth\AuthenticationException => 401,
                $e instanceof \Illuminate\Auth\Access\AuthorizationException => 403,
                $e instanceof \Illuminate\Database\Eloquent\ModelNotFoundException => 404,
                $e instanceof \Symfony\Component\HttpKernel\Exception\NotFoundHttpException => 404,
                $e instanceof \Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException => 405,
                default => 500,
            };

            // Erreurs de validation : on garde les messages par champ, utiles au frontend
            if ($e instanceof \Illuminate\Validation\ValidationException) {
                return response()->json([
                    'message' => 'Les données envoyées sont invalides.',
                    'errors' => $e->errors(),
                ], 422);
            }

            // En local (debug actif), on garde le message réel pour développer plus vite
            if (config('app.debug')) {
                return response()->json([
                    'message' => $e->getMessage(),
                    'exception' => get_class($e),
                    'file' => $e->getFile(),
                    'line' => $e->getLine(),
                ], $status);
            }

            // En production : message générique, aucune fuite d'information technique
            $messagesGeneriques = [
                401 => "Vous devez être connecté pour effectuer cette action.",
                403 => "Vous n'êtes pas autorisé à effectuer cette action.",
                404 => "La ressource demandée n'a pas été trouvée.",
                405 => "Méthode non autorisée.",
                500 => "Une erreur est survenue. Merci de réessayer ou de nous contacter.",
            ];

            return response()->json([
                'message' => $messagesGeneriques[$status] ?? "Une erreur est survenue.",
            ], $status);
        });
    })->create();