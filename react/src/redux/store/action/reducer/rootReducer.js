import { authenReducer } from "./authenReducer";
import { userReducer } from "./userReducer";
import { locationReducer } from "./locationReducer";

import { combineReducers } from "redux";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { postReducer } from "./postReducer";

// whitelist là mảng các state cần lưu
const persistConfig = {
  key: "auth",
  whitelist: ["", ""],
  storage,
  stateReconciler: autoMergeLevel2,
};

//persistReducer để đóng gói, tham số đầu vào là reducer cần persist và object chứa state cần lưu vào storage
const rootReducer = combineReducers({
  auth: persistReducer(persistConfig, authenReducer),
  user: userReducer,
  post: postReducer,
  location: locationReducer,
});
export default rootReducer;
