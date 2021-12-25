import axios from "axios";
import { toast } from "react-toastify";

export const StartUp = () => {
  // Add a response interceptor
  axios.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data

      let url = response.config.url.split("/").reverse()[0];

      if (response.config.method === "get") return response;

      if (response.status >= 200 && response.status <= 200) {
        switch (url) {
          case "clients":
            toast.success("اطلاعات کلاینت با موفقیت ثبت شد");
            break;

          case "users":
            toast.success("اطلاعات منشی با موفقیت ثبت شد");
            break;

          case "authenticate":
            toast.success("با موفقیت وارد شدید");
            break;

          default:
            break;
        }
      }

      if (response.status >= 400 && response.status <= 500) {
        switch (url) {
          case "clients":
            toast.error("فیلد های وارد شده را با دقت پر کنید");
            break;

          case "authenticate":
            toast.error("فیلد های مورد نظر را با دقت پر کنید");
            break;

          default:
            break;
        }
      }

      return response;
    },
    function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      return Promise.reject(error);
    }
  );
};
