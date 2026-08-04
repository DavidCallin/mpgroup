<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nouvelle demande de devis - MP GROUP</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #374151;
            background-color: #f9fafb;
            padding: 20px;
        }
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1);
        }
        .header {
            background: linear-gradient(135deg, #001A4D 0%, #003875 100%);
            padding: 40px 30px;
            text-align: center;
        }
        .header h1 { color: #EAB12D; font-size: 28px; font-weight: 700; margin-bottom: 8px; }
        .header p { color: rgba(255,255,255,0.9); font-size: 16px; font-weight: 300; }
        .badge {
            display: inline-block;
            background: #EAB12D;
            color: #001A4D;
            font-size: 12px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            padding: 6px 16px;
            border-radius: 20px;
            margin-top: 16px;
        }
        .quote-number {
            display: inline-block;
            background: rgba(255,255,255,0.15);
            color: #ffffff;
            font-size: 13px;
            font-weight: 600;
            letter-spacing: 0.05em;
            padding: 6px 16px;
            border-radius: 20px;
            margin-top: 10px;
            border: 1px solid rgba(255,255,255,0.3);
        }
        .content { padding: 40px 30px; }
        .greeting { font-size: 18px; color: #001A4D; margin-bottom: 24px; font-weight: 600; }
        .intro { font-size: 16px; color: #6B7280; margin-bottom: 32px; line-height: 1.7; }
        .section-title {
            font-size: 12px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.15em;
            color: #EAB12D;
            margin-bottom: 16px;
            padding-bottom: 8px;
            border-bottom: 2px solid #EAB12D;
        }
        .details-block {
            background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
            border-radius: 12px;
            padding: 24px;
            margin-bottom: 24px;
            border-left: 4px solid #EAB12D;
        }
        .detail-row {
            display: flex;
            margin-bottom: 12px;
            align-items: flex-start;
        }
        .detail-row:last-child { margin-bottom: 0; }
        .detail-label {
            font-weight: 600;
            color: #001A4D;
            min-width: 160px;
            font-size: 13px;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }
        .detail-value { color: #374151; font-size: 14px; flex: 1; word-break: break-word; }
        .badge-inline {
            display: inline-block;
            background: #EAB12D;
            color: #001A4D;
            font-size: 12px;
            font-weight: 700;
            text-transform: capitalize;
            padding: 3px 12px;
            border-radius: 12px;
        }
        .badge-access {
            display: inline-block;
            background: #001A4D;
            color: #ffffff;
            font-size: 12px;
            font-weight: 600;
            padding: 3px 12px;
            border-radius: 12px;
        }
        .message-section {
            background: #ffffff;
            border: 1px solid #e5e7eb;
            border-radius: 12px;
            padding: 24px;
            margin-bottom: 24px;
        }
        .message-label {
            font-weight: 600;
            color: #001A4D;
            font-size: 13px;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            margin-bottom: 12px;
        }
        .message-content { color: #374151; font-size: 14px; line-height: 1.7; white-space: pre-wrap; word-wrap: break-word; }
        .divider {
            height: 1px;
            background: linear-gradient(90deg, transparent 0%, #EAB12D 50%, transparent 100%);
            margin: 24px 0;
        }
        .timestamp {
            background: #001A4D;
            color: white;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 500;
            display: inline-block;
            margin-top: 16px;
        }
        .footer {
            background: #f8fafc;
            padding: 32px 30px;
            text-align: center;
            border-top: 1px solid #e5e7eb;
        }
        .footer-text { color: #6B7280; font-size: 14px; margin-bottom: 16px; line-height: 1.6; }
        .contact-info {
            color: #001A4D;
            text-decoration: none;
            font-weight: 500;
            font-size: 14px;
            margin: 0 12px;
        }
        @media (max-width: 600px) {
            body { padding: 10px; }
            .header, .content, .footer { padding: 24px 20px; }
            .detail-row { flex-direction: column; gap: 4px; }
            .detail-label { min-width: auto; }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>MP GROUP</h1>
            <p>Coordination d'événements stratégiques</p>
            <div class="badge">Nouvelle demande de devis</div>
            <br>
            <div class="quote-number">Devis N° Devis{{ str_pad($quoteId, 4, '0', STR_PAD_LEFT) }}</div>
        </div>

        <div class="content">
            <div class="greeting">Bonjour,</div>
            <div class="intro">
                Vous avez reçu une nouvelle demande de devis depuis le site web MP GROUP. Voici le récapitulatif complet de cette demande :
            </div>

            {{-- Coordonnées --}}
            <div class="section-title">Coordonnées du demandeur</div>
            <div class="details-block">
                <div class="detail-row">
                    <div class="detail-label">Nom complet</div>
                    <div class="detail-value">{{ $quoteData['nom'] }} {{ $quoteData['prenom'] }}</div>
                </div>
                <div class="detail-row">
                    <div class="detail-label">Email</div>
                    <div class="detail-value">{{ $quoteData['email'] }}</div>
                </div>
                <div class="detail-row">
                    <div class="detail-label">Téléphone</div>
                    <div class="detail-value">{{ $quoteData['telephone'] }}</div>
                </div>
                @if(!empty($quoteData['entreprise']))
                <div class="detail-row">
                    <div class="detail-label">Structure</div>
                    <div class="detail-value">{{ $quoteData['entreprise'] }}</div>
                </div>
                @endif
                <div class="detail-row">
                    <div class="detail-label">Lieu</div>
                    <div class="detail-value">{{ $quoteData['lieu_evenement'] }}</div>
                </div>
            </div>

            {{-- Événement --}}
            <div class="section-title">Détails de l'événement</div>
            <div class="details-block">
                <div class="detail-row">
                    <div class="detail-label">Type d'événement</div>
                    <div class="detail-value">{{ $quoteData['type_evenement'] }}</div>
                </div>
                <div class="detail-row">
                    <div class="detail-label">Date souhaitée</div>
                    <div class="detail-value">{{ \Carbon\Carbon::parse($quoteData['date_evenement'])->format('d/m/Y') }}</div>
                </div>
                <div class="detail-row">
                    <div class="detail-label">Participants</div>
                    <div class="detail-value">{{ $quoteData['nombre_participants'] }} personnes</div>
                </div>
                @if(!empty($quoteData['image_souhaitee']))
                <div class="detail-row">
                    <div class="detail-label">Image souhaitée</div>
                    <div class="detail-value">
                        <span class="badge-inline">{{ $quoteData['image_souhaitee'] }}</span>
                    </div>
                </div>
                @endif
                @if(!empty($quoteData['type_acces']))
                <div class="detail-row">
                    <div class="detail-label">Type d'accès</div>
                    <div class="detail-value">
                        <span class="badge-access">
                            {{ $quoteData['type_acces'] === 'billetterie' ? 'À billetterie' : 'Sur invitation' }}
                        </span>
                    </div>
                </div>
                @endif
                @if(!empty($quoteData['type_acces']) && $quoteData['type_acces'] === 'billetterie' && !empty($quoteData['prix_ticket']))
                <div class="detail-row">
                    <div class="detail-label">Prix du ticket</div>
                    <div class="detail-value">{{ number_format($quoteData['prix_ticket'], 0, ',', ' ') }} FCFA</div>
                </div>
                @endif
                @if(!empty($quoteData['budget_estime']))
                <div class="detail-row">
                    <div class="detail-label">Budget prévu pour MP GROUP</div>
                    <div class="detail-value">{{ number_format($quoteData['budget_estime'], 0, ',', ' ') }} FCFA</div>
                </div>
                @endif
            </div>

            {{-- Description --}}
            <div class="message-section">
                <div class="message-label">Description du projet</div>
                <div class="message-content">{{ $quoteData['description'] }}</div>
            </div>

            @if(!empty($quoteData['services_souhaites']))
            <div class="message-section">
                <div class="message-label">Services souhaités</div>
                <div class="message-content">{{ is_array($quoteData['services_souhaites']) ? implode(', ', $quoteData['services_souhaites']) : $quoteData['services_souhaites'] }}</div>
            </div>
            @endif

            @if(!empty($quoteData['discovery']))
            <div class="message-section">
                <div class="message-label">Comment nous a-t-il connu ?</div>
                <div class="message-content">{{ $quoteData['discovery'] }}</div>
            </div>
            @endif

            <div class="divider"></div>

            <div style="text-align: center;">
                <div class="timestamp">
                    Reçu le {{ now()->format('d/m/Y à H:i') }}
                </div>
            </div>
        </div>

        <div class="footer">
            <div class="footer-text">
                Ce message a été envoyé depuis le formulaire de devis du site MP GROUP.<br>
                Vous pouvez répondre directement à cet email pour contacter <strong>{{ $quoteData['nom'] }} {{ $quoteData['prenom'] }}</strong>.
            </div>
            <div>
                <a href="mailto:mpgroupcompany1@gmail.com" class="contact-info">✉️ mpgroupcompany1@gmail.com</a>
                <a href="tel:+22901672706" class="contact-info">📞 +229 01 67 27 06 36</a>
            </div>
        </div>
    </div>
</body>
</html>