import Constants from './Constants'
import { encrypt, decrypt } from 'n-krypta'
import date from 'date-and-time'
import { encode as base64Encode_, decode as base64Decode_ } from 'base-64'
import Cookies from './Cookies'

export default function Library() {
    const constants = Constants()
    const keyStorage = constants.KEY_ACCESS_TOKEN

    const isMobile = () => {
        let check = false
        if (navigator.userAgent.toString().search('Mobile') > -1) {
            check = true
        }
        return check
    }

    const reloadPage = (isCurrentPath) => {
        window.location.reload(isCurrentPath)
    }
    const startPageUrl = (url) => {
        window.location.href = url
    }
    const getParams = (params_) => {
        return params_
    }
    const base64Encode = (data) => {
        return base64Encode_(data)
    }

    const base64Decode = (data) => {
        try {
            return base64Decode_(data)
        } catch (e) {
            return false
        }
    }

    const encryptData = (data, key) => {
        return encrypt(data, key)
    }

    const decryptData = (data, key) => {
        return decrypt(data, key)
    }

    const getDateTime = () => {
        const now = new Date()
        return date.format(now, 'YYYY/MM/DD HH:mm:ss')
    }

    const getDate = () => {
        const today = new Date()
        return today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate()
    }

    const getSessionStorage = () => {
        const session = sessionStorage.getItem(keyStorage)
        return JSON.parse(session)
    }

    const setSessionStorage = (assetToken_, date_) => {
        const data = {
            assetToken: assetToken_,
            date: date_,
        }
        sessionStorage.setItem(keyStorage, JSON.stringify(data))
    }

    const getSessionStorageByKey = (key) => {
        const session = sessionStorage.getItem(key)
        return JSON.parse(session)
    }

    const setSessionStorageByKey = (key, value) => {
        sessionStorage.setItem(key, JSON.stringify(value))
    }

    const getLocalStorage = () => {
        const local = localStorage.getItem(keyStorage)
        return JSON.parse(local)
    }

    const setLocalStorage = (assetToken_, date_) => {
        const data = {
            accessToken: assetToken_,
            date: date_,
        }
        localStorage.setItem(keyStorage, JSON.stringify(data))
    }

    const clearLocalStorage = () => {
        localStorage.clear()
    }

    const removeItemLocalStorege = () => {
        localStorage.removeItem(keyStorage)
    }

    const clearSessionStorage = () => {
        sessionStorage.clear()
    }

    const removeItemSessionStorege = () => {
        sessionStorage.removeItem(keyStorage)
    }
    const load = (img) => {
        const url = img.getAttribute('lazy-src')
        img.setAttribute('src', url)
    }
    const ready = () => {
        if ('IntersectionObserver' in window) {
            const lazyImgs = document.querySelectorAll('[lazy-src]')
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    load(entry.target)
                })
            })
            lazyImgs.forEach(img => {
                observer.observe(img)
            })
        }
    }

    const checkLogin = () => {
        const cookie = Cookies().Get(Constants().KEY_ACCESS_TOKEN)
        return cookie !== null
    }

    return {
        getSessionStorage,
        setSessionStorage,
        setLocalStorage,
        getLocalStorage,
        ready,
        getDate,
        clearLocalStorage,
        clearSessionStorage,
        removeItemLocalStorege,
        removeItemSessionStorege,
        encryptData,
        decryptData,
        getDateTime,
        base64Decode,
        base64Encode,
        getParams,
        startPageUrl,
        reloadPage,
        isMobile,
        checkLogin,
        getSessionStorageByKey,
        setSessionStorageByKey,
    }
}
