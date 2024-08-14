export default function FormateDate(dateString: Date | string) {
  let dateObject = new Date(dateString);

  let year = dateObject.getFullYear().toString();
  let month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); // 因為月份是從0開始的，所以要加1
  let day = dateObject.getDate().toString().padStart(2, '0');

  let formattedDateString = year + month + day;
  return parseInt(formattedDateString);
}
