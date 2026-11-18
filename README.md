# LivrExpress — Landing Page Cinématographique (React 19 + GSAP + Tailwind CSS)

> **Direction Esthétique :** Preset A — "Tech Organique" (Boutique Clinique)  
> **Identité de Marque :** LivrExpress — Livraison express de colis urbains en moins de 2 heures chrono.

---

## 🌿 Spécifications du Système de Design

### Palette Chromatique (Preset A)
- **Mousse (Primaire) :** `#2E4036` — Profond, organique, évoque la pérennité et la biologie.
- **Argile (Accent) :** `#CC5833` — Chaleur vive, pulsation, précision active.
- **Crème (Fond) :** `#F2F0E9` / `#FAF9F5` — Texture d'édition haut de gamme, repos visuel.
- **Charbon (Texte/Sombre) :** `#1A1A1A` / `#111613` — Lisibilité chirurgicale et profondeur nocturne.

### Typographie
- **Titres :** `Plus Jakarta Sans` & `Outfit` (tracking serré, géométrie moderne)
- **Dramatique :** `Cormorant Garamond` (Italique massif, contraste d'échelle 3x-5x)
- **Données & Télémétrie :** `IBM Plex Mono` (monospace précis)

### Texture & Micro-Interactions
- **Bruit Organique :** Filtre SVG `<feTurbulence>` inline global à 0.05 d'opacité éliminant la platitude numérique.
- **Rayons de courbure :** `rounded-[2rem]` à `rounded-[3rem]`, angles adoucis continus.
- **Boutons Magnétiques :** Effet `scale(1.03)` au survol avec `cubic-bezier(0.25, 0.46, 0.45, 0.94)` et nappe de couleur glissante en sous-couche `<span>`.
- **Liens :** Élévation `translateY(-1px)` au survol.

---

## ⚡ Architecture des Composants

1. **A. Navbar "L'Île Flottante" :** Pilule flottante centrée, morphing dynamique de transparent vers `bg-creme/80 backdrop-blur-xl` avec bordure fine et bouton CTA.
2. **B. Hero "Le Plan d'Ouverture" :** Hauteur 100dvh, photographie botanique sombre Unsplash avec dégradé lourd Mousse-vers-Charbon, contraste typographique géant (`LivrExpress est le` / `Rythme Vivant.`), métriques de synchronisation en direct.
3. **C. Fonctionnalités "Artefacts Interactifs" :**
   - **Artefact 01 (Vitesse) — "Mélangeur Diagnostique" :** 3 cartes superposées cyclant toutes les 3,2s avec transition élastique `cubic-bezier(0.34, 1.56, 0.64, 1)`.
   - **Artefact 02 (Précision) — "Machine à Écrire Télémétrie" :** Terminal en direct tapant caractère par caractère les flux GPS, inertiels et thermiques avec curseur clignotant Argile.
   - **Artefact 03 (Fluidité) — "Planificateur Protocole Curseur" :** Grille hebdomadaire interactive où un curseur SVG autonome sélectionne et valide les créneaux 120min.
4. **D. Philosophie "Le Manifeste" :** Écrin sombre avec texture en parallaxe, révélations GSAP ScrollTrigger et contraste entre la logistique traditionnelle et l'approche clinique LivrExpress.
5. **E. Protocole "Archive Empilée Sticky" :** 3 cartes plein écran s'empilant avec `pin: true`, effet de flou et d'échelle (`scale(0.9)` + `blur(18px)`), chacune animée d'un canvas/SVG unique (rotation géométrique, balayage laser matriciel, forme d'onde ECG pulsante).
6. **F. Tarification "Grille d'Expédition" :** 3 tiers (À la Demande, Performance Recommandé, Sur Mesure) avec cartes soignées et micro-interactions.
7. **G. Pied de page & Statut :** Fond sombre profond, statut "Système Opérationnel" avec pulsation verte et liaisons télémétriques.
8. **Modale d'accès prioritaire :** Inscription interactive à la liste d'attente avec attribution instantanée d'un jeton d'accès temporaire cryptographique.

---

## 🚀 Démarrage Rapide

### Option A — Aperçu Immédiat (Zéro installation)
Double-cliquez directement sur **`preview.html`** pour l'ouvrir dans n'importe quel navigateur web. Tous les scripts, styles, polices et animations y sont embarqués via CDN.

### Option B — Projet Vite / React 19 complet
```bash
# Lancer le serveur de développement local
npm run dev

# Compiler pour la production
npm run build
```
Le serveur local se lancera sur `http://localhost:3000`.
