import { createStore, applyMiddleware, combineReducers } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "@redux-devtools/extension"

// reducers
import { ProductReducer } from "./Reduces/ProductReducer"

const reducers = combineReducers({
    ProductReducer
})
let initialState = {}
const middleware = [thunk]
const Store = createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default Store
