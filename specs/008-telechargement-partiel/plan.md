# Plan : télécharger un fichier ou un modèle

**Feature** : `008-telechargement-partiel` | **Spec** : [spec.md](spec.md) | **Date** : 2026-10-26

## Résumé

Le téléchargement ZIP de toute la configuration (feature 002) est généralisé à une **portée** :
toute la configuration, un modèle, ou un fichier. Le cœur calcule les fichiers d'une portée et
les références qui en sortent. Le store produit les octets (origine si non modifié, sinon texte
courant) et propose le fichier ou l'archive au navigateur. L'interface ajoute deux boutons.

## Vérification des principes

| Principe | Respect |
|---|---|
| I. Format validator | Oui. Les fichiers téléchargés sont ceux de la configuration, sans transformation. |
| II. Aucune perte silencieuse | Oui. Octets d'origine pour un fichier non modifié ; règles d'écriture de la feature 002 sinon. |
| III. Cœur pur | Oui. `src/core/export.ts` (portée, références sortantes) est pur et testé. |
| IV. Tests d'abord, données réelles | Oui. Tests unitaires sur les fixtures, e2e qui comparent les octets téléchargés aux fichiers d'origine. |
| V. Local | Oui. Aucun accès réseau : le navigateur enregistre un `Blob`. |
| VI. Dépendances minimales | Oui. Réutilise `src/core/zip.ts` et `src/ui/io/download.ts`. |
| VII. Français | Oui. |

## Décisions

- **R1 – Portée** (`src/core/export.ts`) :

  ```ts
  type ExportScope = { kind: 'all' } | { kind: 'model'; model: string } | { kind: 'file'; path: string }
  function scopeFiles(session: Session, scope: ExportScope): string[]       // chemins, triés
  function outgoingRefs(session: Session, model: string): string[]          // références hors de <modèle>/
  ```

  - `model` : tous les fichiers de `allFiles(session)` sous `<modèle>/`, y compris les fichiers
    créés dans la session.
  - `outgoingRefs` : `tableModel` et `codes[].data` de `files.json` qui se résolvent hors du
    dossier du modèle (`resolvePath`), URL exclues (US2, scénario 4).

- **R2 – Octets** : une seule fonction du store, `download(scope)`, remplace `downloadZip` :
  - octets d'origine (`source.raw`) pour un fichier non modifié, sinon texte courant encodé en
    UTF-8, exactement comme le ZIP actuel ;
  - `all` : `<nom>.zip` avec le préfixe `<nom>/` (comportement actuel inchangé) ;
  - `model` : `<modèle>.zip`, entrées `<modèle>/<chemin>` ;
  - `file` : le fichier seul, nommé par son dernier segment, type `application/json` ou
    `text/csv`.

  Le résultat (`name`, `errors`, `reformatted`, `outgoing`) alimente le message. Les erreurs
  viennent de `countsByFile` (fichier) ou de `countsByModel` (modèle).

- **R3 – État « modifié »** (FR-005) : seul le téléchargement de **toute** la configuration met
  à jour `exported` (plus d'avertissement avant de quitter). Les téléchargements partiels ne le
  changent pas.

- **R4 – Message** : le message de téléchargement passe d'`App.vue` au store (`notice`), pour
  être émis depuis `FileFrame`, `ModelView` et `ModelNode`. Formulations :
  - « Fichier téléchargé : ZONE_URBA.json (1 erreur restante) » ;
  - « Modèle téléchargé : cnig_PLU_2017.zip. Références vers d'autres modèles : … ».

- **R5 – Interface** :
  - `FileFrame` : bouton icône « Télécharger ce fichier » à côté du titre, quand la vue a un
    fichier source (`data-testid="download-file"`) ;
  - `ModelView` (modèle et dossier sans `files.json`) : bouton « Télécharger le modèle »
    (`download-model`) ;
  - `ModelNode` : entrée « Télécharger le modèle (ZIP) » dans le groupe du modèle
    (`download-model-<nom>`). Un bouton dans la ligne du modèle, elle-même un bouton, serait un
    élément interactif imbriqué (règle axe `nested-interactive`).

- **R6 – Tests** :
  - unitaires : `scopeFiles` (fichiers créés compris, rien hors du modèle), `outgoingRefs`
    (`../` vers un autre modèle, URL ignorées) ;
  - e2e éditeur en ligne : fichier non modifié identique octet pour octet, fichier modifié,
    ZIP d'un modèle décompressé par `zipfile` de Python (même lecteur que `002-us4-zip`), puis
    `vce check` sur l'extrait ;
  - e2e `vce serve` : le téléchargement d'un fichier ne retire pas l'état « modifié ».

## Structure du code (ajouts et modifications)

```
src/core/export.ts                      scopeFiles, outgoingRefs
src/ui/stores/project.ts                download(scope), notice (remplace downloadZip)
src/ui/App.vue                          utilise store.download({ kind: 'all' }) et store.notice
src/ui/components/FileFrame.vue         bouton « Télécharger ce fichier »
src/ui/components/ModelView.vue         bouton « Télécharger le modèle »
src/ui/components/ModelNode.vue         bouton icône par modèle
tests/unit/export.test.ts
tests/e2e/pages/008-us1-file.spec.ts, tests/e2e/pages/008-us2-model.spec.ts, tests/e2e/008-serve.spec.ts
```

## Dérogations

Aucune.
