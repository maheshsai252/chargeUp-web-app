import { Types } from '../actions/actionTypes';

const initialState = {
  tab: 'Home'
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.CHANGE_ACTIVE_TAB:
        console.log('changing', action.payload)
      return {
        ...state,
        tab: action.payload.tab,
      }
    
    default:
      return state;
  }
}

export default reducer;