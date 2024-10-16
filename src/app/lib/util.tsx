export function toProperCase(text: string): string {
    if (text === undefined || text === null) return '';

    const splitText = text.toLowerCase().split(' ');
    splitText.forEach((word, index, array) => array[index] = word.charAt(0).toUpperCase() + word.slice(1));
    return splitText.join(' ');
}