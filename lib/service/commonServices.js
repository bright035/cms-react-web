import {httpSuccess,httpMultipleChoice} from '../constant'

export const isHttpSuccess = (status) => {
    return (httpSuccess<=status&&status<httpMultipleChoice)
}