// Arborescence des fichiers attendus d'un modèle : chaque fichier est rangé sous le dossier
// (fichier de type directory) dont le chemin est le plus long préfixe du sien. À chaque niveau,
// les fichiers viennent d'abord, puis les dossiers, chacun dans l'ordre de files.json.
import type { FileModel } from './types'

export interface FileNode {
  file: FileModel
  /** Indice dans `files` de files.json (pointeur /files/<index>). */
  index: number
  directory: boolean
  children: FileNode[]
}

export function fileTree(files: readonly FileModel[]): FileNode[] {
  const nodes = files.map((file, index): FileNode => ({ file, index, directory: file.type === 'directory', children: [] }))
  const directories = nodes.filter((n) => n.directory)
  const roots: FileNode[] = []
  for (const node of nodes) {
    let parent: FileNode | undefined
    for (const d of directories) {
      if (d !== node && node.file.path.startsWith(`${d.file.path}/`) && d.file.path.length > (parent?.file.path.length ?? -1)) parent = d
    }
    if (parent) parent.children.push(node)
    else roots.push(node)
  }
  const order = (list: FileNode[]): FileNode[] => {
    for (const n of list) n.children = order(n.children)
    return [...list.filter((n) => !n.directory), ...list.filter((n) => n.directory)]
  }
  return order(roots)
}
