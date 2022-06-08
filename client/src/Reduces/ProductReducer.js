import {
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    ALL_PRODUCT_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    CLEAR_ERRORS
} from "../Constants/ProductConstants.js"

export const ProductReducer = ( state={ products:[] }, action) => {
    switch (action.type) {
        case ALL_PRODUCT_REQUEST:
            return {
                load:true,
                products:[]
            }
            
        case ALL_PRODUCT_SUCCESS:
            return {
                load:false,
                products: action.payload.products,
                productsCount: action.payload.productsCount
            }
            
        case ALL_PRODUCT_FAIL:
            return {
                load:false,
                error:action.error
            }
            
        case CLEAR_ERRORS:
            return {
                ...state,
                error:null
            }
            
        default:
            return state
    }
}

export const ProductDetailsReducer = ( state={ product:{} }, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return {
                load:true,
                product:{}
            }
            
        case PRODUCT_DETAILS_SUCCESS:
            return {
                load:false,
                product: action.payload
            }
            
        case PRODUCT_DETAILS_FAIL:
            return {
                load:false,
                error:action.error
            }
            
        case CLEAR_ERRORS:
            return {
                ...state,
                error:null
            }
            
        default:
            return state
    }
}