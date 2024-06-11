import {combineReducers} from 'redux';
import sessionSlice from './SessionSlice/SessionSlice';
import infoSlice from './InfoSlice/InfoSlice';

const reducer = combineReducers({
  session: sessionSlice.reducer,
  info: infoSlice.reducer,
});

export default reducer;
