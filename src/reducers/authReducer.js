import actions from '../actions/authActions'
const initState = {
    requestToken: null,
    sessionId: null
}

export default (state = initState, action) => {
    switch(action.type) {
        default: {
            return state
        }
    }
}
