const authLogin = (data) => {
  let errors = {};

  if (!data.username) {
    errors.username = "نام کاربری خود را وارد نمایید";
  } else if (data.username !== "admin") {
    errors.username = "نام کاربری اشتباه است";
  } else {
    delete errors.username;
  }

  if (!data.password) {
    errors.password = "رمز عبور خود را وارد نمایید";
  } else {
    delete errors.password;
  }

  return errors;
};

export default authLogin;
