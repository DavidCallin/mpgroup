<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use App\Models\Actualites;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    /**
     * Get dashboard stats.
     */
    public function stats(Request $request): JsonResponse
    {
        $messages = [
            'total' => Contact::count(),
            'new' => Contact::where('contactStatus', 'nouveau')->count(),
            'processed' => Contact::where('contactStatus', 'lu')->count(),
        ];

        $news = [
            'published' => Actualites::where('actualiteStatus', 'published')->count(),
            'total' => Actualites::count(),
        ];

        return response()->json([
            'messages' => $messages,
            'news' => $news,
            'totalViews' => Actualites::sum('nbrViews'),
        ]);
    }

    /**
     * Recent messages (5 latest).
     */
    public function recentMessages(Request $request): JsonResponse
    {
        $messages = Contact::latest()->limit(5)->get(['id', 'fullname', 'email', 'contactStatus', 'created_at']);

        return response()->json($messages);
    }

    /**
     * Recent news (5 latest published).
     */
    public function recentNews(Request $request): JsonResponse
    {
        $news = Actualites::where('actualiteStatus', 'published')
                          ->latest()
                          ->limit(5)
                          ->get(['id', 'title', 'actualiteStatus', 'nbrViews', 'created_at']);

        return response()->json($news);
    }
}
