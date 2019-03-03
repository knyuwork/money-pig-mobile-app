import { fromJS } from 'immutable';
import actions from './actions';


const initState = fromJS({
  isLoading: false,
});

export default userInterfaceReducer = (state = initState, action) => {
  switch (action.type) {
    case actions.START_LOADING:
      return state
              .merge({isLoading: true})
    case actions.END_LOADING:
      return state
              .merge({isLoading: false})
    default:
      return state;
  }
}
