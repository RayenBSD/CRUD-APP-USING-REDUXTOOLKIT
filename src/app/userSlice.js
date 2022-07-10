import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice ({
    name: "user",
    initialState: {
        items: [],
        id: 0,
    },
    reducers: {
        addItem: (state, action) => {
            //new item
            action.payload = JSON.parse(action.payload);
            //console.log(action.payload);
            
            let newData = {
                id: ++state.id,
                name: action.payload.name,
                email: action.payload.email,
                password: action.payload.password,
            }
            newData = JSON.stringify(newData);

            state.items.push(newData);
        },
        deleteAll: (state) => {
            state.items = [];
            state.id = 0;
        },
        deleteItem: (state, action) => {
            state.items = state.items.map (item => JSON.parse(item));
            state.items = state.items.filter(item => item.id !== action.payload.id);
            state.items = state.items.map (item => JSON.stringify(item));
        },
        updateItem: (state, action) => {
            state.items = state.items.map (item => JSON.parse(item));
            let box = state.items;

            //console.log(box);
            action.payload = JSON.parse(action.payload);
            //console.log(action.payload);

            for (const i in box) {
                if (box[i].id === action.payload.id) {
                    //console.log(box[i].id);
                    //console.log(box[i].name );
                    //console.log(box[i].email);
                    //console.log(box[i].password);
                    box[i].id = action.payload.id;
                    box[i].name = action.payload.name;
                    box[i].email = action.payload.email;
                    box[i].password = action.payload.password;
                }
            }
            //console.log(box);
            state.items = box;
            state.items = state.items.map (item => JSON.stringify(item));
        }
    }
});

export const { addItem, deleteAll, deleteItem, updateItem } = userSlice.actions;

export default userSlice.reducer;
