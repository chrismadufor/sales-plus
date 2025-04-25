import moment from "moment";

const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export const pounds = "£";

export const perPage = 100;

// test
// export const baseUrl = "https://lasepa-le2w.onrender.com/api/v1/";

// live
export const baseUrl = "https://server.lasepaonline.com/api/v1/";

export const clearToken = () => {
  sessionStorage.removeItem("lasepaToken");
};

export const errorHandler = (err) => {
  if (!err) return;
  let errMsg;
  if (err.message) errMsg = err.message;
  else if (err.error === "TypeError: Failed to fetch")
    errMsg = "Check your network and try again";
  else if (err.error) errMsg = err.error;
  else if (err.data?.error && typeof err.data.error === "string")
    errMsg = err.data?.error;
  else errMsg = "An error occured";

  return errMsg;
};

export const getErrorData = (err) => {
  let errData =
    err.code === "ERR_NETWORK"
      ? {
          error: true,
          data: { message: err.message },
          // status: null,
        }
      : {
          error: true,
          data: err?.response?.data,
          // status: err?.response?.status,
        };
  return errData;
};

export const getTime = (value) => {
  let date = new Date(value);
  let currentTime = Date.now();
  let resultInMins = Math.floor((currentTime - date) / 60000);
  let resultInHours = Math.floor((currentTime - date) / 3600000);
  let resultInDays = Math.floor((currentTime - date) / 86400000);
  let resultInWeeks = Math.floor((currentTime - date) / 604800000);
  let resultInMonths = Math.floor((currentTime - date) / 2592000000);
  if (resultInMins === 1) return `${resultInMins} min ago`;
  if (resultInMins < 60) return `${resultInMins} mins ago`;
  else if (resultInHours === 1) return `${resultInHours} hour ago`;
  else if (resultInHours < 24) return `${resultInHours} hours ago`;
  else if (resultInDays === 1) return `${resultInDays} day ago`;
  else if (resultInDays < 7) return `${resultInDays} days ago`;
  else if (resultInWeeks === 1) return `${resultInWeeks} week ago`;
  else if (resultInWeeks <= 4) return `${resultInWeeks} weeks ago`;
  else if (resultInMonths === 1) return `${resultInMonths} month ago`;
  else return `${resultInMonths} months ago`;
};

export const formatDate = (date) => {
  if (!date) return "N/A";
  return moment(date).format("MMMM Do YYYY");
};

export const formatDateTime = (date) => {
  if (date == Number(date)) date = Number(date);
  if (!date) return "N/A";
  return moment(date).format("MMM Do YYYY, h:mm A");
};

export const formatNumber = (num) => {
  num = +num;
  // if (num > 999999) return `${(num / 1000000).toFixed(1)} Mil`;
  let str = num.toLocaleString("en-US");
  return str;
};

export const formatPoundsNumber = (num) => {
  if (!num) return pounds + "0";
  num = +num;
  // if (num > 999999) return `${(num / 1000000).toFixed(1)} Mil`;
  let str = num.toLocaleString("en-US");
  return pounds + str;
};

export const returnKeys = (data) => {
  return Object.keys(data);
};

export const removeEmptyFilters = (data) => {
  const keys = returnKeys(data);
  const temp = {};
  keys.forEach((key) => {
    if (data[key]) temp[key] = data[key];
  });
  return temp;
};

export const setFilterParams = (filters) => {
  const temp = removeEmptyFilters(filters);
  const params = new URLSearchParams(temp);
  return params;
};

export const returnName = (id, data) => {
  let temp = data?.filter((item) => item._id === id);
  return temp?.length > 0 ? temp[0].name : null;
};

export const getFirstName = (str) => {
  if (!str) return ""
  let arr = str.split(" ")
  return arr[0]
}

export const generatePassword = () => {
  let length = 8;
  let result = " ";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};

export const getYear = (val) => {
  const year = new Date(val).getFullYear();
  return year;
};

export const monthsData = [
  {
    label: "January",
    value: "january"
  },
  {
    label: "February",
    value: "february"
  },
  {
    label: "March",
    value: "march"
  },
  {
    label: "April",
    value: "april"
  },
  {
    label: "May",
    value: "may"
  },
  {
    label: "June",
    value: "june"
  },
  {
    label: "July",
    value: "july"
  },
  {
    label: "August",
    value: "august"
  },
  {
    label: "September",
    value: "september"
  },
  {
    label: "October",
    value: "october"
  },
  {
    label: "November",
    value: "november"
  },
  {
    label: "December",
    value: "december"
  },
]

export const removeTags = (str) => {
  if (str === null || str === "") return false;
  else str = str.toString();
  return str.replace(/(<([^>]+)>)/gi, "");
};

export const paymentStatusValue = (status) => {
  if (status === "paid") return "paid";
  else return "not paid";
};

export const paymentStatusColor = (status) => {
  if (status === "paid") return "primary_bg";
  else return "dark_gray text-white block";
};

export const shortenSentence = (str, val) => {
  if (!str) return "";
  val = val ? val : 30;
  let temp = str?.slice(0, val);
  return temp?.length < val ? temp : temp + "...";
};

export const getSerialNumber = (index, currentPage) => {
  let number = (currentPage - 1) * perPage + (index + 1);
  return number;
};

export const formatPhone = (phone) => {
  phone = phone.toString();
  const prefix = "+234";
  if (
    phone.substr(0, 4) === prefix &&
    phone.length === 14 &&
    (phone[5] === "0" || phone[5] === "1") &&
    (phone[4] === "9" || phone[4] === "8" || phone[4] === "7")
  )
    return phone;
  else if (phone.substr(0, 3) === "234" && phone.length === 13) {
    return "+" + phone;
  } else if (
    phone.length === 11 &&
    phone[0] === "0" &&
    (phone[2] === "0" || phone[2] === "1")
  ) {
    let temp = prefix + phone.substr(1);
    return temp;
  } else if (
    phone.length === 10 &&
    (phone[0] === "9" || phone[0] === "8" || phone[0] === "7") &&
    (phone[1] === "0" || phone[1] === "1")
  )
    return prefix + phone;
  else return false;
};
