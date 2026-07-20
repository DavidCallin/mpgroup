<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Avis;
use App\Models\Setting;
use Illuminate\Http\Request;

class AvisController extends Controller
{
    // POST /api/avis (public)
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom_complet'    => 'required|string|max:255',
            'email'          => 'nullable|email',
            'nom_evenement'  => 'required|string|max:255',
            'note'           => 'required|integer|min:1|max:5',
            'commentaire'    => 'required|string|max:1000',
        ]);

        $autoPublish = Setting::get('avis_auto_publish', 'false') === 'true';
        $validated['statut'] = $autoPublish ? 'publie' : 'en_attente';

        $avis = Avis::create($validated);

        return response()->json([
            'message' => $autoPublish
                ? 'Merci pour votre avis, il est maintenant visible.'
                : 'Merci pour votre avis, il sera publié après validation.',
            'avis' => $avis,
        ], 201);
    }

    // GET /api/avis (public, avis publiés uniquement)
    public function index()
    {
        return Avis::where('statut', 'publie')
            ->orderBy('created_at', 'desc')
            ->get();
    }

    // --- Admin ---

    // GET /api/admin/avis
    public function adminIndex(Request $request)
    {
        $query = Avis::orderBy('created_at', 'desc');
        if ($request->has('statut')) {
            $query->where('statut', $request->statut);
        }
        return $query->get();
    }

    // PATCH /api/admin/avis/{id}/approve
    public function approve(Avis $avi)
    {
        $avi->update(['statut' => 'publie']);
        return response()->json(['message' => 'Avis publié.', 'avis' => $avi]);
    }

    // PATCH /api/admin/avis/{id}/reject
    public function reject(Avis $avi)
    {
        $avi->update(['statut' => 'rejete']);
        return response()->json(['message' => 'Avis rejeté.', 'avis' => $avi]);
    }

    // DELETE /api/admin/avis/{id}
    public function destroy(Avis $avi)
    {
        $avi->delete();
        return response()->json(['message' => 'Avis supprimé.']);
    }

    // GET /api/admin/settings/avis-auto-publish
    public function getAutoPublish()
    {
        return response()->json(['auto_publish' => Setting::get('avis_auto_publish', 'false') === 'true']);
    }

    // PUT /api/admin/settings/avis-auto-publish
    public function setAutoPublish(Request $request)
    {
        $request->validate(['auto_publish' => 'required|boolean']);
        Setting::set('avis_auto_publish', $request->auto_publish ? 'true' : 'false');
        return response()->json(['message' => 'Paramètre mis à jour.', 'auto_publish' => $request->auto_publish]);
    }
}
