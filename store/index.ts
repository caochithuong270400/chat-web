// store/index.ts
import { defineStore } from 'pinia';
import numeral from "numeral";

// Kiểm tra nếu locale đã được đăng ký
const localeExists = (locale: string): boolean => {
  try {
    numeral.locale(locale);
    // Kiểm tra một thuộc tính của locale để xác nhận locale tồn tại
    return numeral.locales[locale] !== undefined;
  } catch {
    return false;
  }
};

// Đăng ký locale nếu chưa tồn tại
if (!localeExists('vi-custom')) {
  numeral.register('locale', 'vi-custom', {
    delimiters: {
      thousands: '.',
      decimal: ','
    },
    abbreviations: {
      thousand: 'k',
      million: 'm',
      billion: 'b',
      trillion: 't'
    },
    ordinal: (number: number): string => {
      return number === 1 ? 'er' : 'ème';
    },
    currency: {
      symbol: '₫'
    }
  });
}

// Đặt locale là 'vi-custom'
numeral.locale('vi-custom');
export const useStore = defineStore('filterStore', () => {
  const state = ref({
    theme: 'dark',
    // dialogProductDetail
  })

  const style = ref({
    // button
  })

  const data = ref({
    user: {
      name: null
    }
  })

  const method = ref({

  })


  // chuyển từ số sang tiền
  function formatMoney(val: number) {

    return numeral(val).format("0,0");
  }

  // chuyển từ tiền sang số
  function parseMoney(val: string) {
    return numeral(val).value();
  }

  // Chuyển dạng ngày thành dd-mm-yy
  function parseDateToDMY(date: string) {
    if (!date) {
      return null
    } else {
      const dd = new Date(date).getDate()
      const mm = String(new Date(date).getMonth() + 1).padStart(2, "0");
      const yyyy = String(new Date(date).getFullYear()).padStart(2, "0");
      return `${dd}-${mm}-${yyyy}`
    }
  }

  function parseDMYToYMD(date: string) {
    if (!date) {
      return null
    } else if (date.split('-').length === 3) {
      const dd = date.split('-')[0]
      const mm = date.split('-')[1]
      const yyyy = date.split('-')[2]
      return `${yyyy}-${mm}-${dd}`
    }
  }

  function validateEmail(email: string) {
    // Biểu thức chính quy để kiểm tra định dạng email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function validatePhoneNumber(phone: string) {
    // Biểu thức chính quy để kiểm tra định dạng số điện thoại (định dạng quốc tế hoặc Việt Nam)
    // Số điện thoại quốc tế: bắt đầu bằng dấu + và theo sau là các chữ số
    // Số điện thoại Việt Nam: 10 chữ số, bắt đầu bằng số 0 (ví dụ: 0901234567)
    const phoneRegex = /^\+?[0-9]{10,15}$/;
    return phoneRegex.test(phone);
  }

  return {
    state, style, data, method,
    formatMoney, parseMoney, parseDateToDMY, parseDMYToYMD,
    validateEmail, validatePhoneNumber
  }
});
