import actions from '../actions/authActions'
const initState = {
    requestToken: null,
    sessionId: null
}

export default (action, state = initState) => {
    switch(action.type) {
        default: {
            return state
        }
    }
}
