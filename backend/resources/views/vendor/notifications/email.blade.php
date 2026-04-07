<x-mail::message>
# Réinitialisation du mot de passe

Bonjour,

Vous recevez cet e-mail car nous avons reçu une demande de réinitialisation du mot de passe pour votre compte.

<x-mail::button :url="$actionUrl">
Réinitialiser le mot de passe
</x-mail::button>

Ce lien de réinitialisation expirera dans **60 minutes**.

Si vous n'avez pas demandé de réinitialisation, aucune action n'est requise.

Cordialement,<br>
MP GROUP

<x-slot:subcopy>
Si vous avez du mal à cliquer sur le bouton "Réinitialiser le mot de passe", copiez et collez l'URL ci-dessous dans votre navigateur : <span class="break-all">[{{ $displayableActionUrl }}]({{ $actionUrl }})</span>
</x-slot:subcopy>
</x-mail::message>
