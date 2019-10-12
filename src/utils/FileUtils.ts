import fs from 'fs'
import jsYaml from 'js-yaml'

export default class FileUtils {

    public static loadYaml(path: string) {
        const txt = fs.readFileSync(path, 'utf8')
        return jsYaml.safeLoad(txt)
    }

    public static saveYaml(path: string, obj: object) {
        const yaml = jsYaml.dump(obj)
        fs.writeFileSync(path, yaml)
    }
}
