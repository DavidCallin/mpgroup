<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Evenement;
use Illuminate\Http\Request;

class EvenementController extends Controller
{
    // GET /api/evenements (public, pour le dropdown du formulaire d'avis)
    public function index()
    {
        return Evenement::where('actif', true)
            ->orderBy('date_evenement', 'desc')
            ->get(['id', 'nom', 'date_evenement']);
    }

    // GET /api/admin/evenements
    public function adminIndex()
    {
        return Evenement::withCount('avis')
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($e) {
                return [
                    'id' => $e->id,
                    'nom' => $e->nom,
                    'date_evenement' => $e->date_evenement,
                    'actif' => $e->actif,
                    'nombre_avis' => $e->avis_count,
                    'note_moyenne' => $e->noteMoyenne(),
                ];
            });
    }

    // POST /api/admin/evenements
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'date_evenement' => 'nullable|date',
        ]);

        $evenement = Evenement::create($validated);
        return response()->json(['message' => 'Événement créé.', 'evenement' => $evenement], 201);
    }

    // PUT /api/admin/evenements/{id}
    public function update(Request $request, Evenement $evenement)
    {
        $validated = $request->validate([
            'nom' => 'sometimes|required|string|max:255',
            'date_evenement' => 'nullable|date',
            'actif' => 'sometimes|boolean',
        ]);

        $evenement->update($validated);
        return response()->json(['message' => 'Événement mis à jour.', 'evenement' => $evenement]);
    }

    // DELETE /api/admin/evenements/{id}
    public function destroy(Evenement $evenement)
    {
        $evenement->delete(); // cascade supprime aussi les avis liés (cascadeOnDelete)
        return response()->json(['message' => 'Événement supprimé.']);
    }

    // GET /api/evenements/top-notes (public)
    public function topNotes()
    {
        $evenements = Evenement::where('actif', true)
            ->whereHas('avis', fn($q) => $q->where('statut', 'publie'))
            ->get()
            ->map(function ($e) {
                return [
                    'id' => $e->id,
                    'nom' => $e->nom,
                    'note_moyenne' => $e->noteMoyenne(),
                    'nombre_avis' => $e->nombreAvis(),
                ];
            })
            ->sortByDesc('note_moyenne')
            ->take(3)
            ->values();

        return response()->json($evenements);
    }
}