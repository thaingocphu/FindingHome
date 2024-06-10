import React, { useEffect, useState } from "react";
import user1 from "../../assets/images/user/user2.jpg";
import { CardProduct } from "../../components/index";
import { useDispatch, useSelector } from "react-redux";
import { postAction } from "../../redux/store/action/postAction";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { callApiUserProfile } from "../../api/getUserApi";
import validator from "validator";

import {
  registerAction,
  logoutAction,
} from "../../redux/store/action/authenAction";
import { path } from "../../ultils/path";
const Profile = () => {
  const dispatch = useDispatch();
  const usenavi = useNavigate();
  const useLocate = useLocation();
  const [userData, setUserData] = useState([]);
  const [IsInValid, setIsInvalid] = useState([]);
  const [updateClick, setUpdateClick] = useState(false);

  // const [userId, setUserId] = useState(useLocate.state?.UserId);
  // const [formUserData, setFormUserData] = useState({
  //   id: "",
  //   address: "",
  //   name: "",
  //   phone: "",
  //   zalo: "",
  // });

  const stateAuth = useSelector((state) => state.auth);
  const { posts } = useSelector((state) => state.post);
  // useEffect(() => {
  //   if (stateAuth.isLoggedIn) {
  //     const getApiuserProfile = async () => {
  //       // const response = await callApiUserProfile(userId);
  //       const response = await callApiUserProfile("1");

  //       setUserData(response.data);
  //     };
  //     getApiuserProfile();
  //     dispatch(postAction());
  //   }
  // }, []);
  console.log("stateAuth", stateAuth);
  useEffect(() => {
    stateAuth.isLoggedIn && setUserData(stateAuth.data);
  }, []);

  useEffect(() => {
    !stateAuth.isLoggedIn && usenavi("/");
  }, [stateAuth.isLoggedIn]);

  const handleLogOut = () => {
    dispatch(logoutAction());
  };

  const handleFormUserData = (e) => {
    setUserData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  const handleOnFocus = (e) => {
    setIsInvalid([]);
  };
  const validate = (formData) => {
    let isInvalidCount = true;
    const IsNull = (value, i, title) => {
      if (value.trim() === "") {
        setIsInvalid((prevState) => [
          ...prevState,
          { name: i, msg: `ban chua nhap ${title} ` },
        ]);
        isInvalidCount = false;
      }
    };
    for (let i in formData) {
      if (i === "email") {
        const resultValidateEmail = validator.isEmail(formData[i]);
        if (!resultValidateEmail) {
          setIsInvalid((prevState) => [
            ...prevState,
            { name: i, msg: `email không hợp lệ` },
          ]);
          isInvalidCount = false;
        }
      }

      if (i === "name") {
        const title = `Tên`;
        IsNull(formData[i], i, title);
      }

      if (i === "phone") {
        const resultValidatePhone = validator.isMobilePhone(formData[i]);
        if (!resultValidatePhone) {
          setIsInvalid((prevState) => [
            ...prevState,
            { name: i, msg: `số điện thoại không hợp lệ` },
          ]);
          isInvalidCount = false;
        }
      }
    }
    return isInvalidCount;
  };

  const handleSave = async () => {
    let error = validate(userData);
    console.log("eror", error);
    console.log("userData", userData);
    // if (error) {
    //   dispatch(registerAction(userData));
    // }
  };
  return (
    <>
      <div className="w-full">
        <div className="container mx-auto py-8">
          <div className="grid grid-cols-4 md:grid-cols-12 gap-6 px-4">
            <div className="col-span-4 md:col-span-3">
              <div className="bg-white shadow rounded-lg p-6">
                <div className="flex flex-col items-center">
                  <img
                    src={user1}
                    className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0"
                  ></img>
                  {userData.name && (
                    <h1 className="text-xl font-bold">{userData.name}</h1>
                  )}
                  <p className="text-gray-700"></p>
                  <div className="mt-6 flex flex-wrap gap-4 justify-center">
                    <div
                      onClick={() => setUpdateClick(true)}
                      className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                    >
                      Sửa Thông Tin
                    </div>
                    <Link
                      //  onClick={() => handleNewPostNavidate()}
                      to={path.LOGIN}
                      className="bg-rose-500 hover:bg-rose-400 text-white py-2 px-4 rounded"
                    >
                      Đăng tin
                    </Link>
                  </div>
                </div>
                <hr className="my-6 border-t border-gray-300" />
                <div className="flex flex-col">
                  {/* <span className="text-gray-700 uppercase font-bold tracking-wider mb-2">
                    Skills
                  </span> */}
                  <ul>
                    <li className="mb-4 border-b-[1px] border-[#dfdfdf] ">
                      Quản lý tin đăng
                    </li>

                    <li className="mb-4 border-b-[1px] border-[#dfdfdf] ">
                      Lịch sử hoạt động
                    </li>
                    <li
                      className="mb-4 border-b-[1px] border-[#dfdfdf] "
                      onClick={() => handleLogOut()}
                    >
                      xóa tài khoản
                    </li>
                    <li
                      className="mb-4 border-b-[1px] border-[#dfdfdf] "
                      onClick={() => handleLogOut()}
                    >
                      Đăng xuất
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-span-4 md:col-span-9">
              {/* <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">
                  Giới thiệu thông tin{" "}
                </h2>
                <p className="text-gray-700">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  finibus est vitae tortor ullamcorper, ut vestibulum velit
                  convallis. Aenean posuere risus non velit egestas suscipit.
                  Nunc finibus vel ante id euismod. Vestibulum ante ipsum primis
                  in faucibus orci luctus et ultrices posuere cubilia Curae;
                  Aliquam erat volutpat. Nulla vulputate pharetra tellus, in
                  luctus risus rhoncus id.
                </p>

                <h3 className="font-semibold text-center mt-3 -mb-2">
                  Liên hệ
                </h3>
                <div className="flex justify-center items-center gap-6 my-6">
                  <a
                    className="text-gray-700 hover:text-orange-600"
                    aria-label="Visit TrendyMinds LinkedIn"
                    href=""
                    target="_blank"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                      className="h-6"
                    >
                      <path
                        fill="currentColor"
                        d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"
                      ></path>
                    </svg>
                  </a>
                  <a
                    className="text-gray-700 hover:text-orange-600"
                    aria-label="Visit TrendyMinds YouTube"
                    href=""
                    target="_blank"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 576 512"
                      className="h-6"
                    >
                      <path
                        fill="currentColor"
                        d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"
                      ></path>
                    </svg>
                  </a>
                  <a
                    className="text-gray-700 hover:text-orange-600"
                    aria-label="Visit TrendyMinds Facebook"
                    href=""
                    target="_blank"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 320 512"
                      className="h-6"
                    >
                      <path
                        fill="currentColor"
                        d="m279.14 288 14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
                      ></path>
                    </svg>
                  </a>
                  <a
                    className="text-gray-700 hover:text-orange-600"
                    aria-label="Visit TrendyMinds Instagram"
                    href=""
                    target="_blank"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                      className="h-6"
                    >
                      <path
                        fill="currentColor"
                        d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
                      ></path>
                    </svg>
                  </a>
                  <a
                    className="text-gray-700 hover:text-orange-600"
                    aria-label="Visit TrendyMinds Twitter"
                    href=""
                    target="_blank"
                  >
                    <svg
                      className="h-6"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="currentColor"
                        d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"
                      ></path>
                    </svg>
                  </a>
                </div>
</div> */}
              {/* // form chỉnh sua thong tin  */}

              {/* // chinh sua thong tin form */}
              <div className="my-4 bg-white max-w-screen-md border  shadow-xl px-4 md:mx-auto">
                <div className="flex flex-col border-b py-4 sm:flex-row sm:items-start">
                  <div className="shrink-0 mr-auto sm:py-3">
                    <p className="font-medium">Thông tin người dùng</p>
                    <p className="text-sm text-gray-600">
                      Chỉnh sửa thông tin cá nhân
                    </p>
                  </div>
                  {updateClick && (
                    <div>
                      <button
                        onClick={() => setUpdateClick(false)}
                        className="mr-2 hidden rounded-lg border-2 px-4 py-2 font-medium text-gray-500 sm:inline focus:outline-none focus:ring hover:bg-gray-200"
                      >
                        hủy
                      </button>
                      <button
                        onClick={() => handleSave()}
                        className="hidden rounded-lg border-2 border-transparent bg-blue-600 px-4 py-2 font-medium text-white sm:inline focus:outline-none focus:ring hover:bg-blue-700"
                      >
                        Lưu
                      </button>
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
                  <p className="shrink-0 w-32 font-medium">Họ & Tên</p>
                  <input
                    value={userData.name}
                    id={"name"}
                    onChange={(e) => handleFormUserData(e)}
                    className="mb-2 w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 sm:mr-4 sm:mb-0 focus:ring-1"
                  />
                </div>
                <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
                  <p className="shrink-0 w-32 font-medium">Email</p>
                  <div className=" flex flex-col mb-2">
                    <input
                      value={userData.email}
                      id={"email"}
                      onFocus={handleOnFocus}
                      onChange={(e) => handleFormUserData(e)}
                      placeholder="Nhập email"
                      className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
                    />
                    {IsInValid.length > 0 &&
                      IsInValid.some((element) => element.name === "email") && (
                        <span className="italic text-[#f33a58] text-center text-xl">
                          {" "}
                          {IsInValid.find((e) => e.name === "email")?.msg}{" "}
                        </span>
                      )}
                  </div>
                </div>
                <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
                  <p className="shrink-0 w-32 font-medium">Số điện thoại</p>
                  <div className=" flex flex-col mb-2">
                    <input
                      value={userData.phone}
                      onChange={(e) => handleFormUserData(e)}
                      id={"phone"}
                      placeholder="Nhập số điện thoại"
                      className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
                    />
                    {IsInValid.length > 0 &&
                      IsInValid.some((element) => element.name === "phone") && (
                        <span className="italic text-[#f33a58] text-center text-xl">
                          {" "}
                          {IsInValid.find((e) => e.name === "phone")?.msg}{" "}
                        </span>
                      )}
                  </div>
                </div>
                <div className="flex flex-col gap-4 py-4  lg:flex-row">
                  <div className="shrink-0 w-32  sm:py-4">
                    <p className="mb-auto font-medium">Ảnh đại diện</p>
                    <p className="text-sm text-gray-600">Thay đổi</p>
                  </div>
                  <div className="flex h-56 w-full flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-gray-300 p-5 text-center">
                    <img src={user1} className="h-16 w-16 rounded-full" />
                    <p className="text-sm text-gray-600">
                      Thả ảnh bạn mong muốn thay đổi
                    </p>
                    <input
                      type="file"
                      className="max-w-full rounded-lg px-2 font-medium text-blue-600 outline-none ring-blue-600 focus:ring-1"
                    />
                  </div>
                </div>
                {updateClick && (
                  <div className="flex justify-end py-4 sm:hidden">
                    <button
                      onClick={() => setUpdateClick(false)}
                      className="mr-2 rounded-lg border-2 px-4 py-2 font-medium text-gray-500 focus:outline-none focus:ring hover:bg-gray-200"
                    >
                      hủy
                    </button>
                    <button
                      onClick={() => handleSave()}
                      className="rounded-lg border-2 border-transparent bg-blue-600 px-4 py-2 font-medium text-white focus:outline-none focus:ring hover:bg-blue-700"
                    >
                      Lưu
                    </button>
                  </div>
                )}
              </div>
              {/* // tin ddax ddangw */}
            </div>
          </div>
          <div>
            <div className="flex flex-col gap-[20px]">
              <h1 className="mt-[5vh] text-[30px] font-semibold text-rose-500">
                Tin đã đăng
              </h1>
              <ul className="flex flex-col gap-[20px]  ">
                {posts?.length > 0 &&
                  posts.map((product) => {
                    return (
                      <CardProduct
                        key={product.id}
                        address={product.address}
                        price={product.price}
                        area={product.area}
                        status={product.status}
                        description={product.description}
                        placesNearby={product.placesNearby}
                        name={product.name}
                        phone={product.phone}
                        zalo={product.zalo}
                        // src={product.imgSrc}
                      />
                    );
                  })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
