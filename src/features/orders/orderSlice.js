import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    generalInfo: {},
    items: [],
    staticItems: [],
    rooms: [],

    //reset after add room
    windows: [],
    materials: [],
    cleats: []
}

const orderSlice = createSlice({
    name: 'orderSlice',
    initialState,
    reducers: {
        addGeneralInfo(state, action) {
            state.generalInfo = action.payload
        },
        addItem(state, action) {
            state.items.push(action.payload)
            state.staticItems.push(action.payload)
        },
        increaseItemQuantityByDecimal(state, action) {
            const item = state.items.find(item => item.code === action.payload)
            item.quantity += 0.1
            ///////////////////////////////////////////
            const staticItem = state.staticItems.find(item => item.code === action.payload)
            staticItem.quantity += 0.1
        },
        increaseItemQuantity(state, action) {
            const item = state.items.find(item => item.code === action.payload)
            item.quantity++
            ///////////////////////////////////////////
            const staticItem = state.staticItems.find(item => item.code === action.payload)
            staticItem.quantity++
        },
        increaseItemQuantityByTen(state, action) {
            const item = state.items.find(item => item.code === action.payload)
            item.quantity += 10
            /////////////////////////////////////////
            const staticItem = state.staticItems.find(item => item.code === action.payload)
            staticItem.quantity += 10
        },
        decreaseItemQuantity(state, action) {
            const item = state.items.find(item => item.code === action.payload)
            item.quantity--
            /////////////////////////////////////////
            const staticItem = state.staticItems.find(item => item.code === action.payload)
            staticItem.quantity--
        },
        editQuantity(state, action) {
            const item = state.items.find(item => item.productName === action.payload.product)
            if (!item) return
            item.quantity -= action.payload.quantity
        },
        removeItem(state, action) {
            const updatedItems = state.items.filter(item => item.code !== action.payload)
            state.items = updatedItems
            //////////////////////////////////////
            const updatedStaticItems = state.staticItems.filter(item => item.code !== action.payload)
            state.items = updatedStaticItems
        },
        addRoom(state, action) {
            state.rooms.push(action.payload)
        },
        editRoom(state, action) {
            const filteredRooms = state.rooms.filter((room) => room.roomName !== action.payload.roomName)
            state.rooms = [...filteredRooms, action.payload]
        },
        addRoomMaterials(state, action) {
            state.materials.push(action.payload)
        },
        addRoomCleats(state, action) {
            state.cleats.push(action.payload)
        },
        resetRoomMaterials(state) {
            state.materials = []
        },
        resetRoomCleats(state) {
            state.cleats = []
        },
        addWindow(state, action) {
            state.windows.push(action.payload)
        },
        resetWindows(state) {
            state.windows = []
        },
        clearState(state) {
            state.generalInfo = {}
            state.items = []
            state.rooms = []
            state.windows = []
        }
    }
})


export const {
    addGeneralInfo,
    addItem,
    increaseItemQuantityByDecimal,
    increaseItemQuantity,
    increaseItemQuantityByTen,
    decreaseItemQuantity,
    editQuantity,
    removeItem,
    addRoom,
    editRoom,
    addRoomMaterials,
    addRoomCleats,
    resetRoomMaterials,
    resetRoomCleats,
    addWindow,
    resetWindows,
    clearState
} = orderSlice.actions
export default orderSlice.reducer

export const getGeneralInfo = (state) => state.order.generalInfo;
export const getItems = (state) => state.order.items;
export const getItemByName = (product) => state => state.order.items.find(item => item.productName === product)
export const getStaticItems = (state) => state.order.staticItems;
export const getCurrentQuantityById = (id) => state => state.order.items.find(item => item.code === id)?.quantity ?? 0;
export const getRooms = (state) => state.order.rooms;
export const getRoomByName = (roomName) => state => state.order.rooms.filter((room) => room.roomName === roomName);
export const getWindows = (state) => state?.order?.windows;
export const getMaterials = (state) => state?.order?.materials;
export const getCleats = (state) => state?.order?.cleats;