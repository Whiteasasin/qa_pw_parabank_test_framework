
// @param {'MM-DD-YYYY' | 'DD-MM-YYYY'} format
//  * @returns {string}

export function getTodayDateString(format = 'MM-DD-YYYY', daysToShift = 0) {
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + daysToShift);
  const day = String(targetDate.getDate()).padStart(2, '0');
  const month = String(targetDate.getMonth() + 1).padStart(2, '0');
  const year = targetDate.getFullYear();

  if (format === 'DD-MM-YYYY') {
    return `${day}-${month}-${year}`;
  }

  return `${month}-${day}-${year}`;
}

export function getCurrentMonth(monthsToShift = 0) {
  const date = new Date();
  date.setDate(1);
  date.setMonth(date.getMonth() + monthsToShift);

  return date.toLocaleDateString('en-US', { month: 'long' });
}