export const getImageFromCategory = (category: string, index: number): string => {
    return `/categories/${category}/${index}.jpg`
};

export const getTextFromCategory = (category: string, index: number): string => {
    return "Kto był pierwszym królem Polski?"; // TODO: Implement retrieving questions in text form
};
