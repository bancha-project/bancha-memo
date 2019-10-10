export default class DomUtils {

    public static hilightSelectedWord(original: string, word: string): string {
        const sp = original.split(word)
        return sp.map((s: string) => {
            return `<span>${s}</span>`
        }).join(`<span class="has-background-warning">${word}</span>`)
    }
}
