import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../Reducer/Reducer";

const store = createStore(rootReducer, applyMiddleware(thunk)); // El applyMiddleware(thunk) nos permite manejar eventos asincronos como pueden serlo peticiones a la DB o Apis.

export default store;
