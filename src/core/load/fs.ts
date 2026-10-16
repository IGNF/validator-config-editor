// Accès en lecture à un dossier de configuration (plan R4). Les chemins sont relatifs à la
// racine de la configuration, avec '/' comme séparateur.
export interface ConfigFs {
  /** Tous les fichiers `*.json` et `*.csv` sous la racine. */
  listFiles(): Promise<string[]>
  readText(path: string): Promise<string>
}
