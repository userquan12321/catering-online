export const parseToNumber = (value: string | undefined) => {
  if (!value || isNaN(+value)) {
    return 0
  }
  return +value
}
