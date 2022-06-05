import { configureStore, getDefaultMiddleware, ThunkAction, Action } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import userReducer from "../features/user/userSlice";
import cartReducer from "../features/cart/cartSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import orderInfoReducer from "../features/orderInfo/orderInfoSlice";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["orderInfo"],
};

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  orderInfo: orderInfoReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
