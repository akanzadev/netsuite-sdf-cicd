/**
 * @NApiVersion 2.1
 * @NModuleScope SameAccount
 */
define([], () => {
  /**
   * Formats a date to YYYY-MM-DD string.
   * @param {Date} date - A valid Date object
   * @returns {string} Formatted date string
   */
  const formatDate = (date) => {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      throw new Error('Invalid date provided');
    }
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  /**
   * Checks if a value is a non-empty string.
   * @param {*} value - The value to check
   * @returns {boolean} True if value is a non-empty string
   */
  const isNonEmptyString = (value) => typeof value === 'string' && value.trim().length > 0;

  /**
   * Safe parse of a float value, returns 0 on failure.
   * @param {*} value - The value to parse
   * @returns {number} Parsed float or 0
   */
  const safeParseFloat = (value) => {
    const parsed = parseFloat(value);
    return isNaN(parsed) ? 0 : parsed;
  };

  return { formatDate, isNonEmptyString, safeParseFloat };
});
