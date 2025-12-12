export const checkImageExists = (url: string): Promise<boolean> => {
    return new Promise((resolve) => {
        const img = new Image();

        // Event when image loads (it exists)
        img.onload = () => resolve(true);

        // Event when images fail to load, e.g. can't be found
        img.onerror = () => resolve(false);

        // Trigger image loading
        img.src = url;
    });
};
