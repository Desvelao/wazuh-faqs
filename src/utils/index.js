export const uniqueValuesOfArray = (value, index, array) =>
  array.indexOf(value) === index

export const copyToClipboard = (str) => {
  const el = document.createElement("textarea")
  el.value = str
  el.setAttribute("readonly", "")
  el.style.position = "absolute"
  el.style.left = "-9999px"
  el.style.display = "hidden"
  document.body.appendChild(el)
  el.select()
  document.execCommand("copy")
  document.body.removeChild(el)
}

export const classNames = (names) =>
  Object.entries(names)
    .filter(([key, value]) => {
      console.log([key, value])
      if (typeof value === "function") {
        return value()
      } else {
        return value
      }
    })
    .map(([key]) => key)
    .join(" ")
