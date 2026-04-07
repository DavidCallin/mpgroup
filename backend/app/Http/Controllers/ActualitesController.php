<?php

namespace App\Http\Controllers;

use App\Models\Actualites;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;

class ActualitesController extends Controller
{
    /**
     * Display a listing of actualites (public, paginated, filter by status).
     */
    public function index(Request $request): JsonResponse
    {
        $query = Actualites::query();

        if ($request->filled('status')) {
            $query->where('actualiteStatus', $request->status);
        }

        $actualites = $query->latest()->paginate(15);
        
        // Transformer les URLs relatives en URLs absolues
        $actualites->getCollection()->transform(function ($actualite) {
            if ($actualite->image_url && !filter_var($actualite->image_url, FILTER_VALIDATE_URL)) {
                $actualite->image_url = url($actualite->image_url);
            }
            return $actualite;
        });

        return response()->json($actualites);
    }

    /**
     * Get popular articles (most viewed).
     */
    public function popular(Request $request): JsonResponse
    {
        $limit = $request->get('limit', 5);
        
        $popularArticles = Actualites::where('actualiteStatus', 'published')
            ->where('nbrViews', '>', 0)
            ->orderBy('nbrViews', 'desc')
            ->limit($limit)
            ->get();
        
        // Transformer les URLs relatives en URLs absolues
        $popularArticles->transform(function ($actualite) {
            if ($actualite->image_url && !filter_var($actualite->image_url, FILTER_VALIDATE_URL)) {
                $actualite->image_url = url($actualite->image_url);
            }
            return $actualite;
        });

        return response()->json($popularArticles);
    }

    /**
     * Store a newly created actualite (admin).
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'image_url' => 'nullable|string|max:500',
            'tags' => 'nullable|array|max:10',
            'tags.*' => 'string|max:50',
            'actualiteStatus' => 'required|in:draft,published',
        ]);

        $actualite = Actualites::create($validated);
        
        // Transformer l'URL relative en URL absolue si nécessaire
        if ($actualite->image_url && !filter_var($actualite->image_url, FILTER_VALIDATE_URL)) {
            $actualite->image_url = url($actualite->image_url);
        }

        return response()->json($actualite, 201);
    }

    /**
     * Display the specified actualite.
     */
    public function show($id): JsonResponse
    {
        $actualite = Actualites::findOrFail($id);
        $actualite->increment('nbrViews');
        
        // Transformer l'URL relative en URL absolue si nécessaire
        if ($actualite->image_url && !filter_var($actualite->image_url, FILTER_VALIDATE_URL)) {
            $actualite->image_url = url($actualite->image_url);
        }

        return response()->json($actualite);
    }

    /**
     * Update the specified actualite.
     */
    public function update(Request $request, $id): JsonResponse
    {
        $actualite = Actualites::findOrFail($id);
        
        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'content' => 'sometimes|required|string',
            'image_url' => 'nullable|string|max:500',
            'tags' => 'nullable|array|max:10',
            'tags.*' => 'string|max:50',
            'actualiteStatus' => 'sometimes|required|in:draft,published',
        ]);

        $actualite->update($validated);
        
        // Transformer l'URL relative en URL absolue si nécessaire
        if ($actualite->image_url && !filter_var($actualite->image_url, FILTER_VALIDATE_URL)) {
            $actualite->image_url = url($actualite->image_url);
        }

        return response()->json($actualite);
    }

    /**
     * Remove the specified actualite.
     */
    public function destroy($id): JsonResponse
    {
        $actualite = Actualites::findOrFail($id);
        $actualite->delete();

        return response()->json(null, 204);
    }

    /**
     * Upload image for actualite cover.
     */
    public function upload(Request $request): JsonResponse
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $path = $request->file('image')->store('news', 'public');
        $fullUrl = url(Storage::url($path));

        return response()->json([
            'image_url' => $fullUrl
        ], 201);
    }
}
