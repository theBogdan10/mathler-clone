const OPERATIONS_FIRST_ROW = Array.from(Array(10).keys()).map(el => String(el));
const OPERATIONS_SECOND_ROW = ['+', '-', '*', '/'];

const EMAIL_REGEX = new RegExp('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$');

export {OPERATIONS_FIRST_ROW, OPERATIONS_SECOND_ROW, EMAIL_REGEX};
