<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreQuoteRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'telephone' => 'required|string|max:20',
            'entreprise' => 'nullable|string|max:255',
            'type_evenement' => 'required|string|max:255',
            'date_evenement' => 'required|date|after:today',
            'lieu_evenement' => 'required|string|max:255',
            'nombre_participants' => 'required|integer|min:1',
            'description' => 'required|string|min:10',
            'services_souhaites' => 'nullable|array',
            'budget_estime' => 'nullable|numeric|min:0',
            'discovery' => 'nullable|string|max:255'
        ];
    }

    public function messages(): array
    {
        return [
            'nom.required' => 'Le nom est obligatoire.',
            'prenom.required' => 'Le prénom est obligatoire.',
            'email.required' => 'L\'email est obligatoire.',
            'email.email' => 'L\'email doit être valide.',
            'telephone.required' => 'Le téléphone est obligatoire.',
            'type_evenement.required' => 'Le type d\'événement est obligatoire.',
            'date_evenement.required' => 'La date de l\'événement est obligatoire.',
            'date_evenement.after' => 'La date de l\'événement doit être dans le futur.',
            'lieu_evenement.required' => 'Le lieu de l\'événement est obligatoire.',
            'nombre_participants.required' => 'Le nombre de participants est obligatoire.',
            'nombre_participants.min' => 'Le nombre de participants doit être au moins 1.',
            'description.required' => 'La description est obligatoire.',
            'description.min' => 'La description doit contenir au moins 10 caractères.',
            'budget_estime.min' => 'Le budget estimé doit être positif.'
        ];
    }
}
