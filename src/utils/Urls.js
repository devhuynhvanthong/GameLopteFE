export default function Urls() {
    const BASE_URL = 'https://api-gamelopte.aigoox.com/'
    const SHORT_LINK = `https://lopteapi.com/st?api=9e9e970c7f58835c77eb3bdc6b7eea7495649963&url=${window.location.host}/get-key?code=`
    const API = BASE_URL + 'api/'

    const URL_VERIFY_KEY = API + 'verify_key'
    const URL_GET_KEY = API + 'get_key'
    const URL_GET_KEYS = API + 'get_all_key'
    const URL_ADD_KEY = API + 'add_key'
    const URL_REMOVE_KEY = API + 'remove_key'
    const URL_REMOVE_CATEGORY = API + 'remove_category'
    const URL_CATEGORY = API + 'get_category'
    const URL_ALL_CATEGORY = API + 'get_all_category'
    const URL_ADD_CATEGORY = API + 'add_category'
    const URL_GET_ALL_KEY_USED = API + 'get_all_key_used'
    const URL_GET_CONFIG = API + 'get_config'
    const URL_UPDATE_CONFIG = API + 'update_config'
    const URL_GET_CONFIG_VISIT = API + 'get_config_visit'
    const URL_LOGIN = API + 'login'
    const URL_ACCOUNT = API + 'account'
    const URL_REGISTER = API + 'register'
    const URL_UPDATE_PASSWORD = API + 'update_password'

    return {
        URL_UPDATE_PASSWORD,
        URL_REGISTER,
        URL_ACCOUNT,
        URL_LOGIN,
        SHORT_LINK,
        URL_GET_KEY,
        URL_VERIFY_KEY,
        URL_GET_KEYS,
        URL_ADD_KEY,
        URL_REMOVE_KEY,
        URL_CATEGORY,
        URL_ALL_CATEGORY,
        URL_REMOVE_CATEGORY,
        URL_ADD_CATEGORY,
        URL_GET_ALL_KEY_USED,
        URL_GET_CONFIG,
        URL_UPDATE_CONFIG,
        URL_GET_CONFIG_VISIT,
    }
}
