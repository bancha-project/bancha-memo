export default class DomUtils {

    public static hilightSelectedWord(original: string, word: string): string {
        const sp = original.split(word)
        return sp.map((s: string) => {
            return `<span>${s}</span>`
        }).join(`<b class="background-warning">${word}</b>`)
    }
}
