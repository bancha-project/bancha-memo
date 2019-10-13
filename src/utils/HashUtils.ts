import crypto from 'crypto'

export const calcMdDigest = (s: string): string => {
    const hash =  crypto.createHash('md5')
    hash.update(s)
    return `${hash.digest('hex')}`

}
