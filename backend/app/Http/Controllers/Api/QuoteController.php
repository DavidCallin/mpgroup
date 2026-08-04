<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Quote;
use App\Http\Requests\StoreQuoteRequest;
use App\Mail\QuoteMessage;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\Rule;

class QuoteController extends Controller
{
    public function index(): JsonResponse
    {
        $quotes = Quote::orderBy('created_at', 'desc')->get();
        return response()->json($quotes);
    }

    public function store(StoreQuoteRequest $request): JsonResponse
    {
        $quote = Quote::create($request->validated());

        try {
            Mail::to('mpgroupcompany1@gmail.com')->send(new QuoteMessage($quote)); // Envoi de l'email à l'adresse spécifiée pour production
            //Mail::to('bluedev73@gmail.com')->send(new QuoteMessage($quote)); // Envoi de l'email à l'adresse spécifiée pour test
        } catch (\Exception $e) {
            \Log::error('Erreur envoi email devis: ' . $e->getMessage());
        }

        return response()->json($quote, 201);
    }

    public function show(Quote $quote): JsonResponse
    {
        return response()->json($quote);
    }

    public function update(Request $request, Quote $quote): JsonResponse
    {
        $validated = $request->validate([
            'nom' => 'sometimes|string|max:255',
            'prenom' => 'nullable|string|max:255',
            'email' => 'sometimes|email|max:255',
            'telephone' => 'sometimes|string|max:20',
            'entreprise' => 'nullable|string|max:255',
            'type_evenement' => 'sometimes|string|max:255',
            'date_evenement' => 'sometimes|date',
            'lieu_evenement' => 'sometimes|string|max:255',
            'nombre_participants' => 'sometimes|integer|min:1',
            'description' => 'sometimes|string',
            'services_souhaites' => 'nullable|array',
            'budget_estime' => 'sometimes|numeric|min:0',
            'statut' => ['sometimes', Rule::in(['nouveau', 'en_cours', 'traite', 'refuse'])]
        ]);

        $quote->update($validated);
        return response()->json($quote);
    }

    public function destroy(Quote $quote): JsonResponse
    {
        $quote->delete();
        return response()->json(null, 204);
    }

    public function updateStatus(Request $request, Quote $quote): JsonResponse
    {
        $validated = $request->validate([
            'statut' => ['required', Rule::in(['nouveau', 'en_cours', 'traite', 'refuse'])]
        ]);

        $quote->update($validated);
        return response()->json($quote);
    }
}
