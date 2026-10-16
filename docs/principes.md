# Principes du projet

Ces principes s'appliquent à toutes les features. Chaque `plan.md` les vérifie explicitement,
dans une section « Vérification des principes ». Toute dérogation est justifiée dans le plan.

## I. Le format du validator est la source de vérité

L'éditeur lit et écrit les fichiers de configuration IGNF/validator tels quels (`files.json`,
`types/*.json`, `codes/*.csv`, `gpu.json`). Il n'introduit aucun format intermédiaire sur
disque. Les JSON Schema embarqués décrivent le format réel des fichiers et sont testés sur des
configurations réelles.

## II. Aucune perte silencieuse

L'outil ne supprime ni ne modifie aucune donnée sans action explicite de l'utilisateur. Un
fichier ouvert puis enregistré sans modification est identique, octet pour octet, au fichier
d'origine. Toute propriété inconnue est conservée.

## III. Cœur pur, interface fine

La logique métier (`src/core`) est en TypeScript pur, sans dépendance à Vue, Vuetify, Pinia ou
aux modules `node:*`. Une règle ESLint l'impose. La CLI (`src/cli`) et l'interface (`src/ui`)
sont de fines couches d'entrée/sortie autour de ce cœur. La commande `check` et l'interface
utilisent le même code de validation.

## IV. Tests d'abord, sur des données réelles (non négociable)

Les tests sont écrits avant le code. Les fixtures sont copiées de configurations réelles
(`validator-config-gpu`). Chaque code de problème a au moins un cas de test dédié. La couverture
de lignes de `src/core` est d'au moins 90 %.

## V. Local et hors ligne

Le serveur n'écoute que sur `127.0.0.1` et ne sert que le dossier passé en argument.
L'interface ne charge aucune ressource distante (CSP stricte). Le versionnement est laissé à
git.

Seule exception : à la demande explicite de l'utilisateur (URL d'un dépôt saisie ou lien
partagé), l'interface lit une configuration publique sur GitHub, en lecture seule, uniquement
auprès de `api.github.com` et `raw.githubusercontent.com` (CSP `connect-src`). Aucun contenu
n'est envoyé, et aucun jeton n'est demandé (feature 003).

## VI. Simplicité et dépendances minimales

Le paquet publié n'a aucune dépendance d'exécution : la CLI n'utilise que la bibliothèque
standard de Node, les validateurs Ajv sont compilés à l'avance et l'interface est construite
statiquement. Toute nouvelle dépendance, même de développement, est justifiée dans le plan de
la feature. Les versions sont figées (pas de `^`).

## VII. Français

L'interface, les messages, les specs, les issues, les PR et les messages de commit sont en
français. Les identifiants de code peuvent rester en anglais.

## Stack

- Node.js ≥ 22, TypeScript strict, ESM
- Interface : Vite, Vue 3, Vuetify, Pinia
- Validation : Ajv (code autonome généré et versionné)
- Tests : Vitest (unitaires), Playwright (bout en bout, accessibilité avec axe)
