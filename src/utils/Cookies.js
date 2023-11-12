import Cookie from 'js-cookie'
import Library from './Library'
import { base64Decode } from '~/utils/encryption'
import Constants from '~/utils/Constants'

export default function Cookies() {
    const library = Library()
    const Set = (key, text) => {
        const encrypt = library.base64Encode(JSON.stringify(text))
        Cookie.set(key, encrypt, {
            expires: 30,
            secure: true,
            sameSite: 'strict',
        })
    }

    const Get = (key, isParseJson = true) => {
        const input = Cookie.get(key)
        if (input != null) {
            if (!isParseJson) {
                return input
            }
            return JSON.parse(base64Decode(input))
        } else {
            return null
        }
    }

    const Remove = (key = Constants().KEY_ACCESS_TOKEN) => {
        Cookie.remove(key)
    }

    return {
        Set,
        Get,
        Remove,
    }
}
