const emailReg =
    /* eslint no-useless-escape:0 */
    /^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/;
const mobilePhoneNumberReg = /^04\d{8}$/;

export const isEmail = (email) => emailReg.test(email);

export const isPhoneNumber = (phone) => mobilePhoneNumberReg.test(phone);
