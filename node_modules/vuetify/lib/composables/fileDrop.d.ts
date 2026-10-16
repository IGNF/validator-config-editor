export declare function useFileDrop(): {
    handleDrop: (e: DragEvent | ClipboardEvent) => Promise<File[]>;
    hasFilesOrFolders: (e: DragEvent | ClipboardEvent) => boolean;
    isDraggingFiles: (e: DragEvent) => boolean;
};
