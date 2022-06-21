import { createStore, applyMiddleware, combineReducers } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "@redux-devtools/extension"

// reducers
import { ProductReducer, ProductDetailsReducer } from "./Reducers/ProductReducer"

const reducers = combineReducers({
     products:ProductReducer, 
     productDetails:ProductDetailsReducer
})
let initialState = {}
const middleware = [thunk]
const Store = createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default Store
