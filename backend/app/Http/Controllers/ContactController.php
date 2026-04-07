<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use App\Mail\ContactMessage;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    /**
     * Display a listing of contacts (Admin only)
     */
    public function index(): JsonResponse
    {
        $contacts = Contact::latest()->paginate(15);
        return response()->json($contacts);
    }

    public function create(): Response
    {
        // Implementation for creating a new contact
        
        return Inertia::render('Contact/Create');
    }

    
    public function show(Contact $contact): JsonResponse
    {
        // Mark as read when admin views it
        $contact->update(['contactStatus' => 'lu']);
        
        return response()->json($contact);
    }

    /**
     * Update contact status (Admin only)
     */
    public function update(Request $request, Contact $contact): JsonResponse
    {
        $validated = $request->validate([
            'contactStatus' => 'required|in:nouveau,lu',
        ]);

        $contact->update($validated);

        return response()->json([
            'message' => 'Contact mis à jour avec succès',
            'contact' => $contact
        ]);
    }

    /**
     * Delete contact (Admin only)
     */
    public function destroy(Contact $contact): JsonResponse
    {
        $contact->delete();

        return response()->json([
            'message' => 'Contact supprimé avec succès'
        ]);
    }

    /**
     * Store new contact via API - public endpoint
     */
    public function apiStore(): JsonResponse
    {
        $validated = request()->validate([
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'telephone' => 'required|string|max:20',
            'entreprise' => 'nullable|string|max:255',
            'sujet' => 'required|string|max:255',
            'message' => 'required|string',
        ], [
            'nom.required' => 'Le nom est obligatoire.',
            'prenom.required' => 'Le prénom est obligatoire.',
            'email.required' => 'L\'email est obligatoire.',
            'email.email' => 'L\'email doit être valide.',
            'telephone.required' => 'Le téléphone est obligatoire.',
            'sujet.required' => 'Le sujet est obligatoire.',
            'message.required' => 'Le message est obligatoire.',
        ]);

        // Créer le contact dans la base de données
        $contact = Contact::create([
            'fullname' => $validated['nom'] . ' ' . $validated['prenom'],
            'organization' => $validated['entreprise'],
            'email' => $validated['email'],
            'phone' => $validated['telephone'],
            'message' => "Sujet: {$validated['sujet']}\n\n{$validated['message']}",
        ]);

        // Envoyer l'email directement avec la nouvelle classe Mailable
        try {
            Mail::to('mpgroupcompany1@gmail.com')->send(new \App\Mail\ContactMessage($validated));
        } catch (\Exception $e) {
            \Log::error('Erreur envoi email contact: ' . $e->getMessage());
        }

        return response()->json([
            'message' => 'Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.',
            'contact' => $contact
        ], 201);
    }
}
