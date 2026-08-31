import React, { createContext, useContext, useState, ReactNode } from 'react'

type Language = 'fr' | 'en'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.group': 'Le Groupe',
    'nav.services': 'Nos expertises',
    'nav.portfolio': 'Nos expériences',
    'nav.founder': 'La Fondatrice',
    'nav.news': 'Actualités',
    'nav.contact': 'Contact',

    // Common
    'common.readMore': 'En savoir plus',
    'common.contactUs': 'Nous contacter',
    'common.year': 'Année',
    'common.category': 'Catégorie',
    'common.learnMore': 'En savoir plus',
    'common.tagline': 'La coordination d\'événements stratégiques au service des institutions et des leaders.',

    // Hero Section
    'hero.title': 'Coordonner des événements stratégiques qui créent de l\'impact.',
    'hero.description': "MP Group est un groupe spécialisé dans la conception, la coordination et le pilotage d\'événements à forte portée institutionnelle.",
    'hero.description2': "Nous accompagnons les institutions, entreprises et dirigeants dans la création d\'événements structurés, stratégiques et crédibles.",
    'hero.cta.organize': 'Organiser votre événement',
    'hero.cta.discover': 'Découvrir le groupe',
    'hero.cta.devis': 'Demander un devis',

    // Positioning Section
    'positioning.tagline': 'Positionnement',
    'positioning.title': 'Un événement peut changer une trajectoire.',
    'positioning.description': 'Un événement bien conçu peut transformer une image, mobiliser un écosystème et créer des opportunités durables. Chez MP Group, nous pensons chaque événement comme un levier stratégique, capable de connecter les bons acteurs et d\'amplifier l\'impact des initiatives.',

    // Services Section (Expertises)
    'services.tagline': 'Nos expertises',
    'services.home.title': 'Nos expertises au service de vos événements stratégiques',
    'services.item1': 'Coordination d\'événements à forts enjeux',
    'services.item2': 'Structuration et pilotage d\'initiatives complexes',
    'services.item3': 'Mise en relation d\'acteurs stratégiques',
    'services.item4': 'Accompagnement de dirigeants et personnalités',
    'services.item5': 'Développement d\'initiatives à fort potentiel',

    // Status Section (Chiffres / Crédibilité)
    'stats.title': 'Une expertise fondée sur le terrain',
    'stats.item1': 'Coordination d\'événements multi-acteurs',
    'stats.item2': 'Gestion de projets à forts enjeux d\'image',
    'stats.item3': 'Interaction avec institutions et partenaires privés',
    'stats.item4': 'Supervision stratégique d\'initiatives sensibles',

    // Vision Section
    'vision.tagline': 'Vision',
    'vision.title': 'Construire les événements qui structurent l\'avenir.',
    'vision.description': 'MP Group ambitionne de devenir un acteur de référence en Afrique de l\'Ouest dans la conception et la coordination d\'événements stratégiques.',
    'vision.goal': 'Notre objectif : structurer des initiatives capables de renforcer les organisations, les leaders et les écosystèmes.',

    // Home CTA
    'home.cta.title': 'Vous préparez un événement stratégique ?',
    'home.cta.description': 'MP Group vous accompagne dans la conception et la coordination de votre événement.',
    'home.cta.button': 'Demander un devis',

    // Group Page
    'group.title': 'MP Group',
    'group.subtitle': 'Un groupe dédié à la coordination d\'événements stratégiques',
    'group.who.title': 'Qui sommes-nous ?',
    'group.who.description': 'MP Group est une structure spécialisée dans la coordination stratégique et la conception d\'événements à forts enjeux. Nous accompagnons les organisations et les décideurs dans la structuration et la mise en œuvre d\'initiatives à fort impact. Notre approche repose sur une compréhension fine des environnements institutionnels, économiques et stratégiques.',
    'group.mission.title': 'Notre mission',
    'group.mission.main': 'Concevoir, coordonner et piloter des événements et projets stratégiques.',
    'group.mission.list.title': 'Nous intervenons pour :',
    'group.mission.item1': 'Structurer des projets complexes',
    'group.mission.item2': 'Sécuriser des événements sensibles',
    'group.mission.item3': 'Renforcer le positionnement des organisations',
    'group.mission.item4': 'Créer des synergies entre acteurs clés',
    'group.values.title': 'Nos valeurs',
    'group.values.excellence.title': 'Excellence',
    'group.values.excellence.desc': 'Viser les standards les plus élevés dans chaque événement.',
    'group.values.rigor.title': 'Rigueur',
    'group.values.rigor.desc': 'Une organisation méthodique et une gestion irréprochable.',
    'group.values.discretion.title': 'Discrétion',
    'group.values.discretion.desc': 'Une approche respectueuse des environnements sensibles.',
    'group.values.innovation.title': 'Innovation',
    'group.values.innovation.desc': 'Imaginer des événements qui créent de la valeur.',
    'group.values.impact.title': 'Impact',
    'group.values.impact.desc': 'Transformer chaque initiative en levier stratégique.',
    'group.positioning.title': 'Positionnement',
    'group.positioning.subtitle': 'Un événement peut changer une trajectoire.',
    'group.expertises.title': 'Nos expertises',

    // Expertises Page (detailed)
    'expertises.title': 'Nos expertises au service des événements stratégiques',
    'expertises.coordination.title': 'Coordination d\'événements stratégiques',
    'expertises.coordination.subtitle': 'Organisation et pilotage d\'événements à forte visibilité :',
    'expertises.coordination.item1': 'Forums',
    'expertises.coordination.item2': 'Conférences',
    'expertises.coordination.item3': 'Rencontres institutionnelles',
    'expertises.coordination.item4': 'Lancements stratégiques',
    'expertises.coordination.item5': 'Événements multi-acteurs',
    'expertises.accompaniment.title': 'Accompagnement de dirigeants et personnalités',
    'expertises.accompaniment.subtitle': 'MP Group accompagne les dirigeants et personnalités dans :',
    'expertises.accompaniment.item1': 'Leur intégration dans les environnements numériques',
    'expertises.accompaniment.item2': 'La structuration de leur présence stratégique',
    'expertises.accompaniment.item3': 'La valorisation de leurs initiatives publiques',
    'expertises.networking.title': 'Mise en relation & partenariats',
    'expertises.networking.subtitle': 'Nous facilitons la connexion entre :',
    'expertises.networking.item1': 'institutions',
    'expertises.networking.item2': 'entreprises',
    'expertises.networking.item3': 'décideurs',
    'expertises.networking.item4': 'porteurs de projets',
    'expertises.networking.conclusion': 'Pour créer des synergies stratégiques durables.',
    'expertises.pastry.title': 'Pâtisserie nutritionnelle',
    'expertises.pastry.description': 'Un pôle dédié au développement d\'initiatives dans le domaine de la nutrition et de la gastronomie responsable, notamment à travers la pâtisserie nutritionnelle.',

    // Experience Section (Nos expériences)
    'experience.intro': 'Ces expériences ont été réalisées par Marveen Promise AÏNADOU, fondatrice de MP Group, aujourd\'hui mises au service des activités de l\'entreprise.',
    'experience.title': 'Nos expériences',
    'portfolio.title': 'L\'Excellence en Mouvement',
    'portfolio.description': 'Découvrez le parcours et les réalisations de Marveen Promïse AÏNADOU, une visionnaire dédiée à l\'impact stratégique.',
    'portfolio.page.title': 'L\'Excellence en Mouvement',
    'portfolio.page.description': 'Découvrez le parcours et les réalisations de Marveen Promïse AÏNADOU, une visionnaire dédiée à l\'impact stratégique.',
    'portfolio.page.intro': 'Voici une sélection des événements et projets coordonnés par Marveen Promise AÏNADOU :',
    'portfolio.page.list.title': 'Événements stratégiques, coordination institutionnelle et initiatives à fort impact.',
    'portfolio.cat.all': 'Tous les projets',
    'portfolio.cat.events': 'Événements',
    'portfolio.label.date': 'Date',
    'portfolio.label.location': 'Lieu',
    'portfolio.label.expertise': 'Expertise',
    'portfolio.label.impact': 'Impact',
    'portfolio.label.distinction': 'Distinction',

    // Founder Page
    'founder.title': 'La fondatrice de MP Group',
    'founder.bio.description': 'Marveen Promise Edmaine AÏNADOU.',
    'founder.bio.intro': 'Née le 10 avril 2006, elle est passionnée de mode et d’informatique, elle a  remporté la première place d’un challenge Impact à Epitech Bénin. En 2021, elle fut ambassadrice RFI en art oratoire . Étudiante en troisième année des sciences de l\'éducation et la formation à l\'université d\'Abomey Calavi, elle a été activiste et rédactrice SEO chez Mondoblog RFI Cotonou 2021.',
    'founder.bio.achievements': 'Formée en Bureautique internet et robotique à Epitech Bénin l\'école d\'expertise informatique en 2023, elle maîtrise le codage HTML 5 et dispose de compétences en marketing digital et en gestion de projet. ',
    'founder.bio.business': 'Elle est CEO de MP Brioche, une pâtisserie qui propose des crêpes et pancakes adaptés à tout type de personnes.',
    'founder.bio.experience': 'Après avoir organisé des événements pendant 5 ans bénévolement dans une communauté sous la Mairie des jeunes, elle a décidé de se lancer dans la coordination d\'événements d\'envergure depuis 3 ans. \n\n Elle est la fondatrice de Promise Services, une structure qui développe plusieurs activités, notamment dans les domaines des services, de l’entrepreneuriat et de l’événementiel.\nDans le cadre de ses activités, elle développe le volet événementiel sous le nom de MP Group, une initiative dédiée à la conception, la coordination et la gestion d’événements à caractère stratégique.',
    'founder.bio.approach.title': 'La fondatrice du groupe développe une approche fondée sur :',
    'founder.bio.approach.item1': 'la compréhension des environnements institutionnels',
    'founder.bio.approach.item2': 'la capacité à connecter les bons acteurs',
    'founder.bio.approach.item3': 'la structuration d\'initiatives à forte valeur stratégique',
    'founder.bio.ambition': 'À travers MP Group, elle ambitionne de contribuer à la professionnalisation et à la structuration des événements stratégiques en Afrique de l\'Ouest.',

    // News Page
    'news.title': 'Actualités et événements',
    'news.popular.title': 'Les plus lus',
    'news.popular.description': 'Découvrez les articles qui passionnent le plus nos lecteurs',
    'news.all.title': 'Toutes nos actualités',
    'news.readMore': 'Lire la suite',
    'news.description.intro': 'Cette section présente :',
    'news.description.item1': 'Les événements coordonnés par MP Group',
    'news.description.item2': 'Les initiatives du groupe',
    'news.description.item3': 'Les interventions institutionnelles',
    'news.description.item4': 'Les annonces stratégiques',
    'news.goal': 'Objectif : renforcer la crédibilité et le référencement du groupe.',

    // Contact Page
    'contact.page.title': 'Coordonnons votre prochain événement',
    'contact.page.subtitle': 'Échangeons sur vos projets stratégiques',
    'contact.page.description': 'MP Group vous accompagne dans la conception et/ou la coordination de votre projet.',
    'contact.form.title': 'Contactez-nous',
    'contact.form.lastName': 'Nom',
    'contact.form.firstName': 'Prénom',
    'contact.form.name': 'Nom complet',
    'contact.form.organization': 'Entreprise',
    'contact.form.organizationPlaceholder': 'Nom de votre entreprise',
    'contact.form.email': 'Email',
    'contact.form.phone': 'Téléphone',
    'contact.form.subject': 'Sujet',
    'contact.form.subjectPlaceholder': 'Objet de votre demande',
    'contact.form.message': 'Message',
    'contact.form.messagePlaceholder': 'Décrivez votre besoin...',
    'contact.form.submit': 'Envoyer votre demande',
    'contact.form.success': 'Merci. Votre demande a été envoyée. Nous vous contacterons sous peu.',
    'contact.location.title': 'Localisation',
    'contact.location.address': 'Cotonou, Bénin',
    'contact.phone.title': 'Téléphone',
    'contact.phone.number': '+229 XX XX XX XX',
    'contact.email.title': 'Email',
    'contact.email.address': 'contact@mpgroup.africa',

    // Quote Page
    'quote.page.title': 'Demande de devis personnalisé',
    'quote.page.subtitle': 'Remplissez ce formulaire, nous vous revenons sous 24 heures avec une proposition adaptée.',
    'quote.page.description': 'MP Group vous accompagne dans la conception et la coordination de votre événement stratégique.',
    'quote.section.coordinates': '1- VOS COORDONNÉES',
    'quote.section.event': '2- VOTRE ÉVÉNEMENT',
    'quote.section.needs': '3- CE DONT VOUS AVEZ BESOIN',
    'quote.section.budget': '4- Budget prévu pour la prestation de MP GROUP',
    'quote.section.additional': '5- INFORMATIONS COMPLÉMENTAIRES',
    'quote.form.fullname': 'Nom et prénom',
    'quote.form.structure': 'Structure / Organisation',
    'quote.form.structure.placeholder': 'si applicable',
    'quote.form.position': 'Fonction / Poste',
    'quote.form.email': 'Email professionnel',
    'quote.form.phone': 'Numéro WhatsApp / Téléphone',
    'quote.form.city': 'Ville',
    'quote.form.event.title': 'Intitulé ou nature de l\'événement',
    'quote.form.event.title.placeholder': 'Ex : gala de fin d\'année, lancement de produit, séminaire, inauguration...',
    'quote.form.event.date': 'Date souhaitée',
    'quote.form.event.date.placeholder': '',
    'quote.form.event.date.alternative': 'Date alternative',
    'quote.form.event.date.alternative.placeholder': '',
    'quote.form.event.duration': 'Durée de l\'événement',
    'quote.form.event.duration.placeholder': 'Ex : 2 heures, demi-journée, journée complète...',
    'quote.form.event.location': 'Lieu envisagé',
    'quote.form.event.location.placeholder': 'Ville et espace si déjà identifié sinon, indiquer \'à définir\'',
    'quote.form.event.participants': 'Nombre de participants estimé',
    'quote.form.description': 'Décrivez brièvement votre événement et vos attentes',
    'quote.form.description.placeholder': 'Objectif, ambiance souhaitée, éléments importants à prendre en compte...',
    'quote.form.services': 'Services souhaités',
    'quote.form.services.placeholder': 'Ex : coordination complète, gestion des prestataires, protocole, communication, décoration...',
    'quote.form.providers': 'Des prestataires sont-ils déjà retenus ?',
    'quote.form.providers.placeholder': 'Ex : lieu réservé, traiteur choisi, photographe confirmé...',
    'quote.form.budget': 'Budget prévu pour la prestation de MP GROUP',
    'quote.form.budget.placeholder': 'Cette information nous permet de vous faire une proposition réaliste et adaptée',
    'quote.form.discovery': 'Comment avez-vous connu MP GROUP ?',
    'quote.form.discovery.placeholder': 'Réseaux sociaux, recommandation, site web...',
    'quote.form.discovery.social': 'Réseaux sociaux',
    'quote.form.discovery.recommendation': 'Recommandation',
    'quote.form.discovery.website': 'Site web',
    'quote.form.discovery.search': 'Moteur de recherche',
    'quote.form.discovery.press': 'Presse / Médias',
    'quote.form.discovery.event': 'Événement',
    'quote.form.discovery.partner': 'Partenaire',
    'quote.form.discovery.other': 'Autre',
    'quote.form.additional': 'Autres informations utiles',
    'quote.form.additional.placeholder': 'Tout ce que vous jugez important de nous communiquer à ce stade',
    'quote.form.submit': 'Envoyer ma demande de devis',
    'quote.form.success': 'Merci ! Votre demande de devis a été envoyée. Nous vous revenons avec une proposition personnalisée sous 24 heures.',
    'quote.form.required': 'Champs obligatoires marqués d\'un *',
    'quote.form.clear': 'Vider le formulaire',
    'quote.form.image': 'Image souhaitée pour l\'événement',
    'quote.form.image.basique': 'Basique',
    'quote.form.image.premium': 'Premium',
    'quote.form.image.prestige': 'Prestige',
    'quote.form.access': 'Événement sur invitation ou à billetterie',
    'quote.form.access.invitation': 'Sur invitation',
    'quote.form.access.billetterie': 'À billetterie',
    'quote.form.ticket.price': 'Prix du ticket (FCFA)',
    'quote.form.ticket.price.placeholder': '15000',

    // Footer
    'footer.description': 'Coordination d\'événements stratégiques et initiatives à fort impact.',
    'footer.sitemap': 'Menu rapide',
    'footer.expertise': 'Nos expertises',
    'footer.rights': 'Tous droits réservés.',
    'footer.privacy': 'Politique de confidentialité',
    'footer.terms': 'Mentions légales',
    'footer.contact': 'Contact',
    'footer.expertise.events': 'Événements Stratégiques',
    'footer.expertise.consulting': 'Conseil Stratégique',
    'footer.expertise.partnerships': 'Facilitation & Partenariats',

    // Portfolio Categories, Labels, etc.

    // Specific Portfolio Events
    'portfolio.event.montreux.title': 'Mon Premier Montreux Afrique',
    'portfolio.event.montreux.desc': 'Grand concours de talents humoristiques en Afrique francophone destiné à découvrir et promouvoir les jeunes humoristes du continent.',
    'portfolio.event.montreux.role': 'Coordination générale',
    'portfolio.event.montreux.location': 'Afrique francophone',
    'portfolio.event.partouche.title': 'Inauguration Casino Partouche',
    'portfolio.event.partouche.desc': 'Coordination de l\'événement d\'inauguration du Casino Partouche.',
    'portfolio.event.partouche.role': 'Coordination événementielle',
    'portfolio.event.partouche.location': 'Cotonou, Bénin',
    'portfolio.event.reine.title': 'La Nouvelle Reine (Canal+ Pop)',
    'portfolio.event.reine.desc': 'Émission de télé-réalité sur Canal+ Pop.',
    'portfolio.event.reine.role': 'Production exécutive',
    'portfolio.event.reine.location': 'Bénin',
    'portfolio.event.comedy.title': 'Cotonou Comedy Festival',
    'portfolio.event.comedy.desc': 'Festival international de comédie organisé par JokeNation, Montreux et le gouvernement du bénin',
    'portfolio.event.comedy.role': 'Direction artistique',
    'portfolio.event.comedy.result': 'Succès international',
    'portfolio.event.asworld.title': 'Keynote AS World Tech',
    'portfolio.event.asworld.desc': 'Conférence de découvertes des produits de AS World Tech',
    'portfolio.event.asworld.role': 'Coordination stratégique',
    'portfolio.event.asworld.result': 'Impact régional',
    'portfolio.event.workshop.title': 'Winner Business Workshop',
    'portfolio.event.workshop.desc': 'Atelier de formation entrepreneuriale.',
    'portfolio.event.workshop.role': 'Coordination pédagogique',
    'portfolio.event.workshop.result': 'Formation réussie',
    'portfolio.event.meetjuice.title': 'Meet & Juice',
    'portfolio.event.meetjuice.desc': 'Événement de networking professionnel.',
    'portfolio.event.meetjuice.role': 'Organisation générale',
    'portfolio.event.dictionnaire.title': 'Le Dictionnaire des Langues Béninoises',
    'portfolio.event.dictionnaire.desc': 'Projet culturel de valorisation des langues locales propulsé par I am your clounon.',
    'portfolio.event.dictionnaire.role': 'Coordination culturelle',
    'portfolio.event.dictionnaire.location': 'Bénin',
    'portfolio.event.chariow.title': 'Chariow Meetup Creator',
    'portfolio.event.chariow.desc': 'Rencontre des créateurs de contenu et des utilisateurs de la plateforme chariow.',
    'portfolio.event.chariow.role': 'Facilitation communautaire',
    'portfolio.event.chariow.result': 'Communauté renforcée',
    'portfolio.event.wbs.title': 'Wilson BOTOYIYE Summit',
    'portfolio.event.wbs.desc': 'La plus grande conférence des produits digitaux en afrique francophone',
    'portfolio.event.wbs.role': 'Coordination culturelle',
    'portfolio.event.wbs.location': 'Bénin',

    // Writing Section
    'portfolio.write.rfi.title': 'Mondoblog RFI - Environnement',
    'portfolio.write.choiseul.title': 'Choiseul Africa Summit',
    'portfolio.write.cadre.title': 'Ministère du Cadre de Vie',

    // MP Brioche
    'portfolio.eco.brioche.title': 'MP Brioche',
    'portfolio.eco.brioche.desc': 'Pâtisserie éco-responsable qui valorise le bien-être et la protection de la planète.',

    // Cookie & Legal
    'cookie.title': 'Nous utilisons des cookies',
    'cookie.description': 'Nous utilisons des cookies pour améliorer votre expérience sur notre site.',
    'cookie.accept': 'Accepter',
    'cookie.decline': 'Refuser',
    'privacy.title': 'Politique de Confidentialité',
    'terms.title': 'Conditions d\'utilisation',
    'terms.contact.title': '9. Contact',
    'terms.contact.desc': 'Pour toute question concernant ces conditions d\'utilisation, veuillez nous contacter à :',

    // Avis Page
    'avis.title': 'Vos avis sur nos événements',
    'avis.subtitle': 'Partagez votre expérience avec MP GROUP',
    'avis.form.nom': 'Votre nom complet',
    'avis.form.email': 'Email (optionnel)',
    'avis.form.evenement': "Nom de l'événement organisé par MP GROUP",
    'avis.form.note': "Qualité de l'organisation",
    'avis.form.commentaire': 'Votre appréciation',
    'avis.form.submit': 'Envoyer mon avis',
    'avis.form.submitting': 'Envoi en cours...',
    'avis.form.note.required': 'Veuillez sélectionner une note.',
    'avis.list.empty': "Aucun avis pour le moment. Soyez le premier à partager votre expérience !",
    'avis.list.loading': 'Chargement des avis...',
    'avis.widget.title': 'Ce que nos clients disent',
    'avis.widget.subtitle': 'La satisfaction de nos partenaires, notre meilleure référence',
    'avis.widget.cta': 'Voir tous les avis',
    'avis.success.pending': 'Merci pour votre avis, il sera publié après validation.',
    'avis.success.published': 'Merci pour votre avis, il est maintenant visible.',
    'nav.avis': 'Avis',
    'admin.avis.title': 'Gestion des avis clients',
    'admin.avis.autopublish': 'Publication automatique',
    'admin.avis.autopublish.on': 'Les nouveaux avis sont publiés immédiatement, sans validation.',
    'admin.avis.autopublish.off': "Les nouveaux avis restent en attente jusqu'à votre validation.",
    'admin.avis.filter.tous': 'Tous',
    'admin.avis.filter.en_attente': 'En attente',
    'admin.avis.filter.publie': 'Publié',
    'admin.avis.filter.rejete': 'Rejeté',
    'admin.avis.approve': 'Publier',
    'admin.avis.reject': 'Rejeter',
    'admin.avis.delete': 'Supprimer',
    'admin.avis.delete.confirm': 'Supprimer définitivement cet avis ?',
    'admin.avis.error.approve': 'Erreur lors de la publication.',
    'admin.avis.error.reject': 'Erreur lors du rejet.',
    'admin.avis.error.delete': 'Erreur lors de la suppression.',
    'admin.avis.error.update': 'Erreur lors de la mise à jour.',

    // D'ICI LÀ — Séance Entrepreneuriale
    'seanceEntrepreneuriale.seo.title': 'Séance Entrepreneuriale | MP GROUP',
    'seanceEntrepreneuriale.seo.description': 'Une séance entrepreneuriale intensive de 3 heures pour transformer ton idée en projet concret et repartir avec un plan d’action de 30 jours.',

    // Hero
    'seanceEntrepreneuriale.hero.badge': 'Séance Entrepreneuriale',
    'seanceEntrepreneuriale.hero.title1': 'D\'ici',
    'seanceEntrepreneuriale.hero.title2': 'LÀ',
    'seanceEntrepreneuriale.hero.subtitle': 'Du début au projet.',
    'seanceEntrepreneuriale.hero.description': 'Il y a l’idée que tu portes depuis des mois. Il y a le projet qu’elle peut devenir. D’ici là, il ne manque qu’une chose : COMMENCER.',
    'seanceEntrepreneuriale.hero.hours': 'heures',
    'seanceEntrepreneuriale.hero.visual': 'Pour passer de l’idée à une première version solide de ton projet.',

    // Informations rapides
    'seanceEntrepreneuriale.info.date': '9 SEPTEMBRE 2026',
    'seanceEntrepreneuriale.info.duration': '3 HEURES',
    'seanceEntrepreneuriale.info.places': '20 PLACES',
    'seanceEntrepreneuriale.info.price.label': 'Reserver ma place',
    'seanceEntrepreneuriale.info.price.value': 'Reserver ma place 5 500 FCFA',

    // CTA
    'seanceEntrepreneuriale.cta.reserve': 'Réserver ma place',
    'seanceEntrepreneuriale.cta.reservePrice': 'Reserver ma place 5 500 FCFA',
    'seanceEntrepreneuriale.cta.payment': 'Paiement sécurisé via MP Group',

    // Ce que c'est
    'seanceEntrepreneuriale.about.eyebrow': 'Ce que c’est',
    'seanceEntrepreneuriale.about.title': 'Tu ne viens pas seulement écouter.',
    'seanceEntrepreneuriale.about.subtitle': 'Tu viens construire.',
    'seanceEntrepreneuriale.about.description1': 'Un atelier intensif de 3 heures, en petit groupe de 20 personnes maximum, pour structurer ton idée et repartir avec un plan d’action concret.',
    'seanceEntrepreneuriale.about.description2': 'Nous t’aidons à surpasser tes peurs, à clarifier ta pensée, et à mieux comprendre ce que ton idée peut vraiment devenir.',
    'seanceEntrepreneuriale.about.highlight.title': 'Ce n’est pas une conférence où tu écoutes passivement.',
    'seanceEntrepreneuriale.about.highlight.text': 'C’est un espace de travail où tu construis, avec un accompagnement direct et personnalisé, la première version solide de ton projet.',

    // Pourquoi ce format fonctionne
    'seanceEntrepreneuriale.why.eyebrow': 'Pourquoi ce format fonctionne',
    'seanceEntrepreneuriale.why.title': 'Petit groupe. Peu de théorie. Beaucoup d’action.',
    'seanceEntrepreneuriale.why.description': 'Tout est pensé pour que tu avances réellement pendant ces trois heures.',

    'seanceEntrepreneuriale.why.group.title': 'Un groupe volontairement restreint',
    'seanceEntrepreneuriale.why.group.text': 'À 20 personnes maximum, tu n’es pas un visage anonyme dans une salle bondée. Tu es écoutée, guidée et challengée individuellement pendant les 3 heures.',

    'seanceEntrepreneuriale.why.duration.title': 'Un format court et efficace',
    'seanceEntrepreneuriale.why.duration.text': 'Pas besoin de bloquer ton emploi du temps pendant des semaines. Un après-midi suffit pour poser les fondations solides de ton projet et sortir avec une direction claire.',

    'seanceEntrepreneuriale.why.result.title': 'Un résultat concret',
    'seanceEntrepreneuriale.why.result.text': 'Chaque participant repart avec un document de travail rempli, une idée reformulée avec précision et un plan d’action pour les 30 jours suivants.',

    'seanceEntrepreneuriale.why.experience.title': 'Un accompagnement expérimenté',
    'seanceEntrepreneuriale.why.experience.text': 'La séance est animée par Marveen Promise, fondatrice de MP GROUP, qui accompagne aujourd’hui les jeunes porteurs de projets à passer concrètement à l’action.',

    // Pour qui
    'seanceEntrepreneuriale.audience.eyebrow': 'Pour qui',
    'seanceEntrepreneuriale.audience.title': 'Tu as une idée. Mais tu ne sais pas encore par où commencer ?',

    'seanceEntrepreneuriale.audience.entrepreneurs': 'Entrepreneurs en devenir',
    'seanceEntrepreneuriale.audience.active': 'Jeunes actifs',
    'seanceEntrepreneuriale.audience.project': 'Porteurs de projets',
    'seanceEntrepreneuriale.audience.idea': 'Toute personne qui veut transformer une intuition en démarche structurée',

    // Ce que tu repars avec
    'seanceEntrepreneuriale.results.eyebrow': 'À la fin des 3 heures',
    'seanceEntrepreneuriale.results.title': 'Tu ne repars pas avec seulement des notes.',
    'seanceEntrepreneuriale.results.description': 'Tu repars avec les premiers éléments concrets de ton projet.',

    'seanceEntrepreneuriale.results.idea.title': 'Ton idée clairement formulée',
    'seanceEntrepreneuriale.results.idea.text': 'Ton idée formulée clairement et sans ambiguïté.',

    'seanceEntrepreneuriale.results.market.title': 'Ton premier marché identifié',
    'seanceEntrepreneuriale.results.market.text': 'Ton client ou marché cible identifié avec davantage de précision.',

    'seanceEntrepreneuriale.results.plan.title': 'Ton plan d’action de 30 jours',
    'seanceEntrepreneuriale.results.plan.text': 'Une feuille de route concrète pour savoir quoi faire après la séance.',

    // Pourquoi maintenant
    'seanceEntrepreneuriale.whyNow.eyebrow': 'Pourquoi maintenant ?',
    'seanceEntrepreneuriale.whyNow.title': 'Ton idée ne deviendra pas un projet simplement parce que tu y penses encore.',
    'seanceEntrepreneuriale.whyNow.description': 'Elle deviendra un projet lorsque tu commenceras à lui donner une forme, une direction et des premières actions.',
    'seanceEntrepreneuriale.whyNow.highlight': 'D’ici là, il ne manque qu’une chose : commencer.',

    // Informations pratiques
    'seanceEntrepreneuriale.practical.eyebrow': 'Informations pratiques',
    'seanceEntrepreneuriale.practical.title': 'Tout ce qu’il faut savoir.',
    'seanceEntrepreneuriale.practical.duration': 'Durée',
    'seanceEntrepreneuriale.practical.places': 'Places',
    'seanceEntrepreneuriale.practical.price': 'Tarif',
    'seanceEntrepreneuriale.practical.nextSession': 'Prochaine session',
    'seanceEntrepreneuriale.practical.hostedBy': 'Animé par',

    'seanceEntrepreneuriale.practical.hostDescription': 'Fondatrice de MP GROUP, Marveen Promise a coordonné des événements pour des dirigeants africains et des institutions internationales. Elle accompagne aujourd’hui les jeunes porteurs de projets à passer concrètement à l’action.',

    // CTA final
    'seanceEntrepreneuriale.final.places': '20 places maximum',
    'seanceEntrepreneuriale.final.title': 'Ton projet commence maintenant.',
    'seanceEntrepreneuriale.final.description': 'Les places sont limitées à 20 participants pour garantir un accompagnement de qualité. Réserve la tienne dès maintenant.',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.group': 'The Group',
    'nav.services': 'Our Expertise',
    'nav.portfolio': 'Our Experiences',
    'nav.founder': 'The Founder',
    'nav.news': 'News',
    'nav.contact': 'Contact',

    // Common
    'common.readMore': 'Read more',
    'common.contactUs': 'Contact us',
    'common.year': 'Year',
    'common.category': 'Category',
    'common.learnMore': 'Learn more',
    'common.tagline': 'Strategic event coordination for institutions and leaders.',

    // Hero Section
    'hero.title': 'Coordinate strategic events that create impact.',
    'hero.description': "MP Group is a group specialized in the design, coordination and management of events with strong institutional reach.",
    'hero.description2': "We support institutions, companies and leaders in the creation of structuring, credible and strategic events.",
    'hero.cta.organize': 'Organize your event',
    'hero.cta.discover': 'Discover the group',
    'hero.cta.devis': 'Request a quote',

    // Positioning Section
    'positioning.tagline': 'Positioning',
    'positioning.title': 'An event can change a trajectory.',
    'positioning.description': 'A well-designed event can transform an image, mobilize an ecosystem and create sustainable opportunities. At MP Group, we think of each event as a strategic lever, capable of connecting the right actors and amplifying the impact of initiatives.',

    // Services Section (Expertises)
    'services.tagline': 'Our expertise',
    'services.home.title': 'Our expertise at the service of your strategic events',
    'services.item1': 'Coordination of high-stakes events',
    'services.item2': 'Structuring and management of complex initiatives',
    'services.item3': 'Connecting strategic actors',
    'services.item4': 'Support for leaders and public figures',
    'services.item5': 'Development of high-potential initiatives',

    // Status Section (Chiffres / Crédibilité)
    'stats.title': 'Field-based expertise',
    'stats.item1': 'Multi-actor event coordination',
    'stats.item2': 'Management of high-image projects',
    'stats.item3': 'Interaction with institutions and private partners',
    'stats.item4': 'Strategic supervision of sensitive initiatives',

    // Vision Section
    'vision.tagline': 'Vision',
    'vision.title': 'Building the events that structure the future.',
    'vision.description': 'MP Group aims to become a reference player in West Africa in the design and coordination of strategic events.',
    'vision.goal': 'Our goal: structure initiatives capable of strengthening organizations, leaders and ecosystems.',

    // Home CTA
    'home.cta.title': 'Are you preparing a strategic event?',
    'home.cta.description': "MP Group supports you in the design and coordination of your event.",
    'home.cta.button': 'Request a quote',

    // Group Page
    'group.title': 'MP Group',
    'group.subtitle': 'A group dedicated to strategic event coordination',
    'group.who.title': 'Who are we?',
    'group.who.description': 'MP Group is a structure specialized in strategic coordination and the design of high-stakes events. We support organizations and decision-makers in the structuring and implementation of high-impact initiatives. Our approach is based on a fine understanding of institutional, economic and strategic environments.',
    'group.mission.title': 'Our mission',
    'group.mission.main': 'Design, coordinate and manage strategic events and projects.',
    'group.mission.list.title': 'We intervene for:',
    'group.mission.item1': 'Structure complex projects',
    'group.mission.item2': 'Secure sensitive events',
    'group.mission.item3': 'Strengthen organizational positioning',
    'group.mission.item4': 'Create synergies between key actors',
    'group.values.title': 'Our values',
    'group.values.excellence.title': 'Excellence',
    'group.values.excellence.desc': 'Aiming for the highest standards in each event.',
    'group.values.rigor.title': 'Rigor',
    'group.values.rigor.desc': 'A methodical organization and irreproachable management.',
    'group.values.discretion.title': 'Discretion',
    'group.values.discretion.desc': 'A respectful approach to sensitive environments.',
    'group.values.innovation.title': 'Innovation',
    'group.values.innovation.desc': 'Imagining events that create value.',
    'group.values.impact.title': 'Impact',
    'group.values.impact.desc': 'Transforming each initiative into a strategic lever.',
    'group.positioning.title': 'Positioning',
    'group.positioning.subtitle': 'An event can change a trajectory.',
    'group.expertises.title': 'Our Expertise',

    // Expertises Page
    'expertises.title': 'Our expertise at the service of strategic events',
    'expertises.coordination.title': 'Strategic Event Coordination',
    'expertises.coordination.subtitle': 'Organization and management of high-visibility events:',
    'expertises.coordination.item1': 'Forums',
    'expertises.coordination.item2': 'Conferences',
    'expertises.coordination.item3': 'Institutional meetings',
    'expertises.coordination.item4': 'Strategic launches',
    'expertises.coordination.item5': 'Multi-actor events',
    'expertises.accompaniment.title': 'Executive and personality support',
    'expertises.accompaniment.subtitle': 'MP Group supports leaders and personalities in:',
    'expertises.accompaniment.item1': 'Their integration into digital environments',
    'expertises.accompaniment.item2': 'The structuring of their strategic presence',
    'expertises.accompaniment.item3': 'The valorization of their public initiatives',
    'expertises.networking.title': 'Networking & partnerships',
    'expertises.networking.subtitle': 'We facilitate the connection between:',
    'expertises.networking.item1': 'institutions',
    'expertises.networking.item2': 'companies',
    'expertises.networking.item3': 'decision-makers',
    'expertises.networking.item4': 'project owners',
    'expertises.networking.conclusion': 'To create sustainable strategic synergies.',
    'expertises.pastry.title': 'Nutritional pastry',
    'expertises.pastry.description': 'A hub dedicated to developing initiatives in nutrition and responsible gastronomy, including nutritional pastry.',

    // Experience Section (Nos expériences)
    'experience.intro': 'These experiences were carried out by Marveen Promise AÏNADOU, founder of MP Group, now placed at the service of the company\'s activities.',
    'experience.title': 'Our Experiences',
    'portfolio.title': 'Excellence in Motion',
    'portfolio.description': 'Discover the journey and achievements of Marveen Promïse AÏNADOU, a visionary dedicated to strategic impact.',
    'portfolio.page.title': 'Excellence in Motion',
    'portfolio.page.description': 'Discover the journey and achievements of Marveen Promïse AÏNADOU, a visionary dedicated to strategic impact.',
    'portfolio.page.intro': 'Here is a selection of events and projects coordinated by Marveen Promise AÏNADOU:',
    'portfolio.page.list.title': 'Strategic events, institutional coordination and high-impact initiatives.',
    'portfolio.cat.all': 'All projects',
    'portfolio.cat.events': 'Events',
    'portfolio.label.date': 'Date',
    'portfolio.label.location': 'Location',
    'portfolio.label.expertise': 'Expertise',
    'portfolio.label.impact': 'Impact',
    'portfolio.label.distinction': 'Distinction',

    // Founder Page
    'founder.title': 'The founder of MP Group',
    'founder.bio.description': 'Marveen Promise Edmaine AÏNADOU.',
    'founder.bio.intro': 'Born on April 10, 2006, she is passionate about fashion and IT, she won first place in an Impact Challenge at Epitech Benin. In 2021, she was an RFI ambassador in public speaking. A third-year student of education and training sciences at the University of Abomey-Calavi, she was an activist and SEO writer for Mondoblog RFI Cotonou in 2021.',
    'founder.bio.achievements': 'Trained in Office Automation, Internet and Robotics at Epitech Benin, the computer expertise school in 2023, she masters HTML 5 coding and has skills in digital marketing and project management.',
    'founder.bio.business': 'She is CEO of MP Brioche, a pastry shop that offers crepes and pancakes suitable for all types of people.',
    'founder.bio.experience': 'After organizing events for 5 years on a voluntary basis in a community under the Youth Council, she decided to embark on coordinating large-scale events 3 years ago. \n\n She is the founder of Promise Services, a company that develops several activities, particularly in the areas of services, entrepreneurship, and event management. \nAs part of her activities, she develops the event management side under the name MP Group, an initiative dedicated to the design, coordination, and management of strategic events. She is the founder of Promise Services, a company that develops several activities, particularly in the areas of services, entrepreneurship, and event management. As part of her activities, she develops the event management side under the name MP Group, an initiative dedicated to the design, coordination, and management of strategic events.',
    'founder.bio.approach.title': 'The founder develops an approach based on:',
    'founder.bio.approach.item1': 'understanding of institutional environments',
    'founder.bio.approach.item2': 'the ability to connect the right actors',
    'founder.bio.approach.item3': 'the structuring of initiatives with high strategic value',
    'founder.bio.ambition': 'Through MP Group, she aims to contribute to the professionalization and structuring of strategic events in West Africa.',

    // News Page
    'news.title': 'News and events',
    'news.popular.title': 'Most read',
    'news.popular.description': 'Discover the articles that most captivate our readers',
    'news.all.title': 'All our news',
    'news.readMore': 'Read more',
    'news.description.intro': 'This section presents:',
    'news.description.item1': 'Events coordinated by MP Group',
    'news.description.item2': 'The group\'s initiatives',
    'news.description.item3': 'Institutional interventions',
    'news.description.item4': 'Strategic announcements',
    'news.goal': 'Goal: strengthen the group\'s credibility and SEO.',

    // Contact Page
    'contact.page.title': 'Coordinate your next event',
    'contact.page.subtitle': 'Let\'s discuss your strategic projects',
    'contact.page.description': 'MP Group supports you in the design and/or coordination of your project.',
    'contact.form.title': 'Contact us',
    'contact.form.lastName': 'Last Name',
    'contact.form.firstName': 'First Name',
    'contact.form.name': 'Full Name',
    'contact.form.organization': 'Company',
    'contact.form.organizationPlaceholder': 'Your company name',
    'contact.form.email': 'Email',
    'contact.form.phone': 'Phone',
    'contact.form.subject': 'Subject',
    'contact.form.subjectPlaceholder': 'Subject of your request',
    'contact.form.message': 'Message',
    'contact.form.messagePlaceholder': 'Describe your need...',
    'contact.form.submit': 'Send your request',
    'contact.form.success': 'Thank you. Your request has been sent. We will contact you shortly.',
    'contact.location.title': 'Location',
    'contact.location.address': 'Cotonou, Benin',
    'contact.phone.title': 'Phone',
    'contact.phone.number': '+229 XX XX XX XX',
    'contact.email.title': 'Email',
    'contact.email.address': 'contact@mpgroup.africa',

    // Quote Page
    'quote.page.title': 'Request a personalized quote',
    'quote.page.subtitle': 'Fill out this form, we will get back to you within 24 hours with a tailored proposal.',
    'quote.page.description': 'MP Group supports you in the design and coordination of your strategic event.',
    'quote.section.coordinates': '1- YOUR CONTACT INFORMATION',
    'quote.section.event': '2- YOUR EVENT',
    'quote.section.needs': '3- WHAT YOU NEED',
    'quote.section.budget': '4- BUDGET ALLOCATED FOR MP GROUP\'S SERVICES',
    'quote.section.additional': '5- ADDITIONAL INFORMATION',
    'quote.form.fullname': 'Full name',
    'quote.form.structure': 'Structure / Organization',
    'quote.form.structure.placeholder': 'if applicable',
    'quote.form.position': 'Position / Role',
    'quote.form.email': 'Professional email',
    'quote.form.phone': 'WhatsApp / Phone number',
    'quote.form.city': 'City',
    'quote.form.event.title': 'Event title or nature',
    'quote.form.event.title.placeholder': 'Ex: year-end gala, product launch, seminar, inauguration...',
    'quote.form.event.date': 'Desired date',
    'quote.form.event.date.placeholder': '',
    'quote.form.event.date.alternative': 'Alternative date',
    'quote.form.event.date.alternative.placeholder': '',
    'quote.form.event.duration': 'Event duration',
    'quote.form.event.duration.placeholder': 'Ex: 2 hours, half-day, full day...',
    'quote.form.event.location': 'Planned venue',
    'quote.form.event.location.placeholder': 'City and space if already identified otherwise, indicate \'to be defined\'',
    'quote.form.event.participants': 'Estimated number of participants',
    'quote.form.description': 'Briefly describe your event and expectations',
    'quote.form.description.placeholder': 'Objective, desired atmosphere, important elements to consider...',
    'quote.form.services': 'Desired services',
    'quote.form.services.placeholder': 'Ex: complete coordination, vendor management, protocol, communication, decoration...',
    'quote.form.providers': 'Are service providers already selected?',
    'quote.form.providers.placeholder': 'Ex: venue booked, caterer chosen, photographer confirmed...',
    'quote.form.budget': 'Budget allocated for MP GROUP\'S SERVICES',
    'quote.form.budget.placeholder': 'This information allows us to make a realistic and tailored proposal',
    'quote.form.discovery': 'How did you hear about MP GROUP?',
    'quote.form.discovery.placeholder': 'Social media, recommendation, website...',
    'quote.form.discovery.social': 'Social media',
    'quote.form.discovery.recommendation': 'Recommendation',
    'quote.form.discovery.website': 'Website',
    'quote.form.discovery.search': 'Search engine',
    'quote.form.discovery.press': 'Press / Media',
    'quote.form.discovery.event': 'Event',
    'quote.form.discovery.partner': 'Partner',
    'quote.form.discovery.other': 'Other',
    'quote.form.additional': 'Other useful information',
    'quote.form.additional.placeholder': 'Anything you think is important to communicate to us at this stage',
    'quote.form.submit': 'Send my quote request',
    'quote.form.success': 'Thank you! Your quote request has been sent. We will get back to you with a personalized proposal within 24 hours.',
    'quote.form.required': 'Required fields marked with *',
    'quote.form.clear': 'Clear form',
    'quote.form.image': 'Desired image for the event',
    'quote.form.image.basique': 'Basic',
    'quote.form.image.premium': 'Premium',
    'quote.form.image.prestige': 'Prestige',
    'quote.form.access': 'Invitation-only or ticketed event',
    'quote.form.access.invitation': 'Invitation-only',
    'quote.form.access.billetterie': 'Ticketed',
    'quote.form.ticket.price': 'Ticket price (FCFA)',
    'quote.form.ticket.price.placeholder': '15000',

    // Footer
    'footer.description': 'Strategic event coordination and high-impact initiatives.',
    'footer.sitemap': 'Quick Menu',
    'footer.expertise': 'Our Expertise',
    'footer.rights': 'All rights reserved.',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Legal Notice',
    'footer.contact': 'Contact',
    'footer.expertise.events': 'Strategic Events',
    'footer.expertise.consulting': 'Strategic Consulting',
    'footer.expertise.partnerships': 'Facilitation & Partnerships',

    // Portfolio Categories, Labels, etc.

    // Specific Portfolio Events
    'portfolio.event.montreux.title': 'Mon Premier Montreux Afrique',
    'portfolio.event.montreux.desc': 'Major comedy talent competition in Francophone Africa organized by JokeNation, Montreux and Benin gorvenment',
    'portfolio.event.montreux.role': 'General coordination',
    'portfolio.event.montreux.location': 'Francophone Africa',
    'portfolio.event.partouche.title': 'Casino Partouche Inauguration',
    'portfolio.event.partouche.desc': 'Coordination of the Casino Partouche inauguration event.',
    'portfolio.event.partouche.role': 'Event coordination',
    'portfolio.event.partouche.location': 'Cotonou, Benin',
    'portfolio.event.reine.title': 'La Nouvelle Reine (Canal+ Pop)',
    'portfolio.event.reine.desc': 'Reality TV show on Canal+ Pop.',
    'portfolio.event.reine.role': 'Executive production',
    'portfolio.event.reine.location': 'Benin',
    'portfolio.event.comedy.title': 'Cotonou Comedy Festival',
    'portfolio.event.comedy.desc': 'International comedy festival in Cotonou.',
    'portfolio.event.comedy.role': 'Artistic direction',
    'portfolio.event.comedy.result': 'International success',
    'portfolio.event.asworld.title': 'Keynote AS World Tech',
    'portfolio.event.asworld.desc': 'AS World Tech Product Discovery Conference.',
    'portfolio.event.asworld.role': 'Strategic coordination',
    'portfolio.event.asworld.result': 'Regional impact',
    'portfolio.event.workshop.title': 'Winner Business Workshop',
    'portfolio.event.workshop.desc': 'Entrepreneurial training workshop.',
    'portfolio.event.workshop.role': 'Educational coordination',
    'portfolio.event.workshop.result': 'Successful training',
    'portfolio.event.meetjuice.title': 'Meet & Juice',
    'portfolio.event.meetjuice.desc': 'Professional networking event.',
    'portfolio.event.meetjuice.role': 'General organization',
    'portfolio.event.dictionnaire.title': 'Dictionary of Beninese Languages',
    'portfolio.event.dictionnaire.desc': 'Cultural project to promote local languages powered by I am your Clunon.',
    'portfolio.event.dictionnaire.role': 'Cultural coordination',
    'portfolio.event.dictionnaire.location': 'Benin',
    'portfolio.event.chariow.title': 'Chariow Meetup Creator',
    'portfolio.event.chariow.desc': 'Content creators and chariow users meetup.',
    'portfolio.event.chariow.role': 'Community facilitation',
    'portfolio.event.chariow.result': 'Strengthened community',

    // Writing Section
    'portfolio.write.rfi.title': 'Mondoblog RFI - Environment',
    'portfolio.write.choiseul.title': 'Choiseul Africa Summit',
    'portfolio.write.cadre.title': 'Ministry of Living Environment',

    // MP Brioche
    'portfolio.eco.brioche.title': 'MP Brioche',
    'portfolio.eco.brioche.desc': 'Eco-responsible pastry that values well-being and planet protection.',

    // Cookie & Legal
    'cookie.title': 'We use cookies',
    'cookie.description': 'We use cookies to improve your experience on our site.',
    'cookie.accept': 'Accept',
    'cookie.decline': 'Decline',
    'privacy.title': 'Privacy Policy',
    'terms.title': 'Terms of Service',

    // Avis Page
    'avis.title': 'Reviews on our events',
    'avis.subtitle': 'Share your experience with MP GROUP',
    'avis.form.nom': 'Your full name',
    'avis.form.email': 'Email (optional)',
    'avis.form.evenement': 'Name of the event organized by MP GROUP',
    'avis.form.note': 'Quality of organization',
    'avis.form.commentaire': 'Your review',
    'avis.form.submit': 'Submit my review',
    'avis.form.submitting': 'Submitting...',
    'avis.form.note.required': 'Please select a rating.',
    'avis.list.empty': 'No reviews yet. Be the first to share your experience!',
    'avis.list.loading': 'Loading reviews...',
    'avis.widget.title': 'What our clients say',
    'avis.widget.subtitle': "Our partners' satisfaction, our best reference",
    'avis.widget.cta': 'See all reviews',
    'avis.success.pending': 'Thank you for your review, it will be published after approval.',
    'avis.success.published': 'Thank you for your review, it is now visible.',
    'nav.avis': 'Reviews',
    'admin.avis.title': 'Customer reviews management',
    'admin.avis.autopublish': 'Auto-publish',
    'admin.avis.autopublish.on': 'New reviews are published immediately, without approval.',
    'admin.avis.autopublish.off': 'New reviews remain pending until you approve them.',
    'admin.avis.filter.tous': 'All',
    'admin.avis.filter.en_attente': 'Pending',
    'admin.avis.filter.publie': 'Published',
    'admin.avis.filter.rejete': 'Rejected',
    'admin.avis.approve': 'Publish',
    'admin.avis.reject': 'Reject',
    'admin.avis.delete': 'Delete',
    'admin.avis.delete.confirm': 'Permanently delete this review?',
    'admin.avis.error.approve': 'Error publishing the review.',
    'admin.avis.error.reject': 'Error rejecting the review.',
    'admin.avis.error.delete': 'Error deleting the review.',
    'admin.avis.error.update': 'Error updating the setting.',

    // D'ICI LÀ — Entrepreneurial Session
    'seanceEntrepreneuriale.seo.title': 'Entrepreneurial Session | MP GROUP',
    'seanceEntrepreneuriale.seo.description': 'An intensive 3-hour entrepreneurial session designed to turn your idea into a concrete project and leave with a 30 days action plan.',

    // Hero
    'seanceEntrepreneuriale.hero.badge': 'Entrepreneurial Session',
    'seanceEntrepreneuriale.hero.title1': 'UNTIL',
    'seanceEntrepreneuriale.hero.title2': 'THEN',
    'seanceEntrepreneuriale.hero.subtitle': 'From the beginning to the project.',
    'seanceEntrepreneuriale.hero.description': 'There is the idea you have been carrying for months. There is the project it could become. From here to there, only one thing is missing: START.',
    'seanceEntrepreneuriale.hero.hours': 'hours',
    'seanceEntrepreneuriale.hero.visual': 'Move from an idea to the first solid version of your project.',

    // Quick information
    'seanceEntrepreneuriale.info.date': 'SEPTEMBER 9, 2026',
    'seanceEntrepreneuriale.info.duration': '3 HOURS',
    'seanceEntrepreneuriale.info.places': '20 PLACES',
    'seanceEntrepreneuriale.info.price.label': ' ',
    'seanceEntrepreneuriale.info.price.value': '5,500 FCFA',

    // CTA
    'seanceEntrepreneuriale.cta.reserve': 'Reserve my place',
    'seanceEntrepreneuriale.cta.reservePrice': 'Reserve my place 5,500 FCFA',
    'seanceEntrepreneuriale.cta.payment': 'Secure payment via MP Group',

    // What it is
    'seanceEntrepreneuriale.about.eyebrow': 'What it is',
    'seanceEntrepreneuriale.about.title': 'You are not just coming to listen.',
    'seanceEntrepreneuriale.about.subtitle': 'You are coming to build.',
    'seanceEntrepreneuriale.about.description1': 'An intensive 3 hours workshop, in a small group of no more than 20 people, designed to structure your idea and leave with a concrete action plan.',
    'seanceEntrepreneuriale.about.description2': 'We help you overcome your fears, clarify your thinking, and better understand what your idea could truly become.',
    'seanceEntrepreneuriale.about.highlight.title': 'This is not a conference where you passively listen.',
    'seanceEntrepreneuriale.about.highlight.text': 'It is a working space where you build, with direct and personalized guidance, the first solid version of your project.',

    // Why this format works
    'seanceEntrepreneuriale.why.eyebrow': 'Why this format works',
    'seanceEntrepreneuriale.why.title': 'Small group. Less theory. More action.',
    'seanceEntrepreneuriale.why.description': 'Everything is designed to help you make real progress during these three hours.',

    'seanceEntrepreneuriale.why.group.title': 'A deliberately small group',
    'seanceEntrepreneuriale.why.group.text': 'With a maximum of 20 participants, you are not just another face in a crowded room. You are heard, guided and personally challenged throughout the 3 hours.',

    'seanceEntrepreneuriale.why.duration.title': 'A short and efficient format',
    'seanceEntrepreneuriale.why.duration.text': 'No need to block your schedule for weeks. One afternoon is enough to lay solid foundations for your project and leave with a clear direction.',

    'seanceEntrepreneuriale.why.result.title': 'A concrete outcome',
    'seanceEntrepreneuriale.why.result.text': 'Every participant leaves with a completed working document, a clearly rephrased idea and a 30-day action plan.',

    'seanceEntrepreneuriale.why.experience.title': 'Experienced guidance',
    'seanceEntrepreneuriale.why.experience.text': 'The session is led by Marveen Promise, founder of MP GROUP, who currently helps young project owners move from ideas to concrete action.',

    // Who it is for
    'seanceEntrepreneuriale.audience.eyebrow': 'Who it’s for',
    'seanceEntrepreneuriale.audience.title': 'You have an idea. But you don’t know where to start?',

    'seanceEntrepreneuriale.audience.entrepreneurs': 'Aspiring entrepreneurs',
    'seanceEntrepreneuriale.audience.active': 'Young professionals',
    'seanceEntrepreneuriale.audience.project': 'Project owners',
    'seanceEntrepreneuriale.audience.idea': 'Anyone who wants to turn an intuition into a structured approach',

    // What you leave with
    'seanceEntrepreneuriale.results.eyebrow': 'After the 3 hours',
    'seanceEntrepreneuriale.results.title': 'You won’t leave with just notes.',
    'seanceEntrepreneuriale.results.description': 'You’ll leave with the first concrete building blocks of your project.',

    'seanceEntrepreneuriale.results.idea.title': 'A clearly defined idea',
    'seanceEntrepreneuriale.results.idea.text': 'Your idea clearly formulated without ambiguity.',

    'seanceEntrepreneuriale.results.market.title': 'Your first target market',
    'seanceEntrepreneuriale.results.market.text': 'A clearer understanding of your target customer or market.',

    'seanceEntrepreneuriale.results.plan.title': 'Your 30 days action plan',
    'seanceEntrepreneuriale.results.plan.text': 'A concrete roadmap showing you what to do after the session.',

    // Why now
    'seanceEntrepreneuriale.whyNow.eyebrow': 'Why now?',
    'seanceEntrepreneuriale.whyNow.title': 'Your idea won’t become a project simply because you keep thinking about it.',
    'seanceEntrepreneuriale.whyNow.description': 'It becomes a project when you start giving it shape, direction and concrete first actions.',
    'seanceEntrepreneuriale.whyNow.highlight': 'From here to there, only one thing is missing: start.',

    // Practical information
    'seanceEntrepreneuriale.practical.eyebrow': 'Practical information',
    'seanceEntrepreneuriale.practical.title': 'Everything you need to know.',
    'seanceEntrepreneuriale.practical.duration': 'Duration',
    'seanceEntrepreneuriale.practical.places': 'Places',
    'seanceEntrepreneuriale.practical.price': 'Price',
    'seanceEntrepreneuriale.practical.nextSession': 'Next session',
    'seanceEntrepreneuriale.practical.hostedBy': 'Led by',

    'seanceEntrepreneuriale.practical.hostDescription': 'Founder of MP GROUP, Marveen Promise has coordinated events for African leaders and international institutions. Today, she helps young project owners move from ideas to concrete action.',

    // Final CTA
    'seanceEntrepreneuriale.final.places': '20 places maximum',
    'seanceEntrepreneuriale.final.title': 'Your project starts now.',
    'seanceEntrepreneuriale.final.description': 'Places are limited to 20 participants to guarantee quality guidance. Reserve yours now.',
  }
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('fr')

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['fr']] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}