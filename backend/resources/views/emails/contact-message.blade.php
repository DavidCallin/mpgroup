<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nouveau message de contact - MP GROUP</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
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
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        
        .header {
            background: linear-gradient(135deg, #001A4D 0%, #003875 100%);
            padding: 40px 30px;
            text-align: center;
            position: relative;
            overflow: hidden;
        }
        
        .header::before {
            content: '';
            position: absolute;
            top: -50%;
            right: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(234, 177, 45, 0.1) 0%, transparent 70%);
            animation: pulse 4s ease-in-out infinite;
        }
        
        @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 0.5; }
            50% { transform: scale(1.1); opacity: 0.8; }
        }
        
        .header h1 {
            color: #EAB12D;
            font-size: 28px;
            font-weight: 700;
            margin-bottom: 8px;
            position: relative;
            z-index: 2;
            letter-spacing: -0.025em;
        }
        
        .header p {
            color: rgba(255, 255, 255, 0.9);
            font-size: 16px;
            position: relative;
            z-index: 2;
            font-weight: 300;
        }
        
        .content {
            padding: 40px 30px;
        }
        
        .greeting {
            font-size: 18px;
            color: #001A4D;
            margin-bottom: 24px;
            font-weight: 600;
        }
        
        .intro {
            font-size: 16px;
            color: #6B7280;
            margin-bottom: 32px;
            line-height: 1.7;
        }
        
        .contact-details {
            background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
            border-radius: 12px;
            padding: 24px;
            margin-bottom: 32px;
            border-left: 4px solid #EAB12D;
        }
        
        .detail-row {
            display: flex;
            margin-bottom: 16px;
            align-items: flex-start;
        }
        
        .detail-row:last-child {
            margin-bottom: 0;
        }
        
        .detail-label {
            font-weight: 600;
            color: #001A4D;
            min-width: 120px;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }
        
        .detail-value {
            color: #374151;
            font-size: 15px;
            flex: 1;
            word-break: break-word;
        }
        
        .message-section {
            background: #ffffff;
            border: 1px solid #e5e7eb;
            border-radius: 12px;
            padding: 24px;
            margin-bottom: 32px;
        }
        
        .message-label {
            font-weight: 600;
            color: #001A4D;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            margin-bottom: 12px;
        }
        
        .message-content {
            color: #374151;
            font-size: 15px;
            line-height: 1.7;
            white-space: pre-wrap;
            word-wrap: break-word;
        }
        
        .footer {
            background: #f8fafc;
            padding: 32px 30px;
            text-align: center;
            border-top: 1px solid #e5e7eb;
        }
        
        .footer-text {
            color: #6B7280;
            font-size: 14px;
            margin-bottom: 16px;
            line-height: 1.6;
        }
        
        .contact-info {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            color: #001A4D;
            text-decoration: none;
            font-weight: 500;
            font-size: 14px;
            margin: 0 12px;
        }
        
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
        
        @media (max-width: 600px) {
            body {
                padding: 10px;
            }
            
            .email-container {
                border-radius: 12px;
            }
            
            .header, .content, .footer {
                padding: 24px 20px;
            }
            
            .header h1 {
                font-size: 24px;
            }
            
            .detail-row {
                flex-direction: column;
                gap: 4px;
            }
            
            .detail-label {
                min-width: auto;
            }
            
            .contact-info {
                display: block;
                margin: 8px 0;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>MP GROUP</h1>
            <p>Coordination d'événements stratégiques</p>
        </div>
        
        <div class="content">
            <div class="greeting">
                Bonjour,
            </div>
            
            <div class="intro">
                Vous avez reçu un nouveau message de contact depuis le site web MP GROUP. Voici les détails de cette demande :
            </div>
            
            <div class="contact-details">
                <div class="detail-row">
                    <div class="detail-label">Nom complet</div>
                    <div class="detail-value">{{ $contactData['nom'] }} {{ $contactData['prenom'] }}</div>
                </div>
                
                <div class="detail-row">
                    <div class="detail-label">Email</div>
                    <div class="detail-value">{{ $contactData['email'] }}</div>
                </div>
                
                <div class="detail-row">
                    <div class="detail-label">Téléphone</div>
                    <div class="detail-value">{{ $contactData['telephone'] }}</div>
                </div>
                
                @if(!empty($contactData['entreprise']))
                <div class="detail-row">
                    <div class="detail-label">Entreprise</div>
                    <div class="detail-value">{{ $contactData['entreprise'] }}</div>
                </div>
                @endif
                
                <div class="detail-row">
                    <div class="detail-label">Sujet</div>
                    <div class="detail-value">{{ $contactData['sujet'] }}</div>
                </div>
            </div>
            
            <div class="message-section">
                <div class="message-label">Message</div>
                <div class="message-content">{{ $contactData['message'] }}</div>
            </div>
            
            <div class="divider"></div>
            
            <div style="text-align: center;">
                <div class="timestamp">
                    Reçu le {{ now()->format('d/m/Y à H:i') }}
                </div>
            </div>
        </div>
        
        <div class="footer">
            <div class="footer-text">
                Ce message a été envoyé depuis le formulaire de contact du site MP GROUP.<br>
                Vous pouvez répondre directement à cet email pour contacter <strong>{{ $contactData['nom'] }} {{ $contactData['prenom'] }}</strong>.
            </div>
            
            <div>
                <a href="mailto:mpgroupcompany1@gmail.com" class="contact-info">
                    ✉️ mpgroupcompany1@gmail.com
                </a>
                <a href="tel:+22901672706" class="contact-info">
                    📞 +229 01 67 27 06 36
                </a>
            </div>
        </div>
    </div>
</body>
</html>