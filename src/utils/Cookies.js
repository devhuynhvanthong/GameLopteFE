import Cookie from 'js-cookie'
import Library from './Library'
import { base64Decode } from '~/utils/encryption'

export default function Cookies() {
    const library = Library()
    const Set = (key, text) => {
        const encrypt = library.base64Encode(JSON.stringify(text))
        Cookie.set(key, encrypt, {
            expires: 30,
            secure: true,
            sameSite: 'strict',
            // domain: 'aigoox.com'
        })
    }

    const Get = (key, isParseJson = true) => {
        const input = Cookie.get(key)
        if (input != null) {
            if (!isParseJson) {
                return input
            }
            console.log(JSON.parse(base64Decode(btoa(input))))
            return JSON.parse(base64Decode(btoa(input)))
        } else {
            return null
        }
    }

    const Remove = (key) => {
        Cookie.remove(key)
    }

    const Clear = () => {
        // Cookie.ge()
    }
    return {
        Set,
        Get,
        Remove,
        Clear,
    }
}
