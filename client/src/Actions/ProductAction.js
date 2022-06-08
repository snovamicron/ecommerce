import axios from "axios"
import {
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    ALL_PRODUCT_FAIL,
    CLEAR_ERRORS
} from "../Constants/ProductConstants.js"


export const getProducts = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_PRODUCT_REQUEST })
        const { data } = await axios.get("/api/v1/products")
        dispatch({
            type: ALL_PRODUCT_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type:ALL_PRODUCT_FAIL,
            error: error.response.data.message
        })
    }
}

export const clearError = () => async(dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}