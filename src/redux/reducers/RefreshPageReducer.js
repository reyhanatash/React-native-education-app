import {REFRESH_PAGE
} from '../action/types';



export default (state =false, action) => {
    switch (action.type) {      
        case REFRESH_PAGE:
            return action.payload;
        default:
            return state;
    }
}
