 export const ADD = (item) => {
    return {
        type: "ADD_CART",
        payload: item
    }
 }

// Remove item 
export const DELETE = (id) => {
    return {
        type: "REMOVE_CART",
        payload: id
    }
}

// Remove individual item 
export const REMOVE = (iteam) => {
    return {
        type: "REMOVE_ONE",
        payload: iteam
    }
}