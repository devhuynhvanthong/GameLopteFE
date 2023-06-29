import { decode as base64Decode_, encode as base64Encode_ } from 'base-64'
export const base64Encode = (data) => {
    return base64Encode_(data)
}
export const base64Decode = (data) => {
    return base64Decode_(data)
}
