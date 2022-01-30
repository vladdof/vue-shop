export default function numberFormat(value) {
  return Intl.NumberFormat().format(value);
}
