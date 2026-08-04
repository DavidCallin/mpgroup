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
            'budget_estime.min' => 'Veuillez indiquez une estimation concrète.',
            'budget_estime.required' => 'Le budget estimé est obligatoire.'
        ];
    }
}
