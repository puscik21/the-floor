export const getImageFromCategory = (category: string, index: number, fileFormat: string): string => {
    return `./categories/${category}/${index}.${fileFormat}`
};

// export const getTextFromCategory = (category: string, index: number): string => {
//     return "Kto był pierwszym królem Polski?"; // TODO: Implement retrieving questions in text form
// };
