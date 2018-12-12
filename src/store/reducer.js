const initialState = {
    access_code: '',
};

const reducer = (state = initialState, action) => {

    switch (action.type) {

        case 'SET_ACCESS_CODE':
            // console.log(action)
            return {
                access_code: action.accessToken
            }

        default: return state

    }

};


export default reducer;
