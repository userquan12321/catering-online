export const formatDate = (isoString: string) => {
  const date = new Date(isoString)
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }
  return date.toLocaleDateString('en-GB', options).replace(/\//g, '-')
}
