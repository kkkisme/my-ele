
export function urlParse() {
  let url = window.location.href
  let obj = {}
  let pattern = /[?&][^?&]+=[^?&]+/g
  let arr = url.match(pattern)
  if (arr) {
    arr.forEach((item) => {
      let tempArr = item.substring(1).split('=')
      obj[tempArr[0]] = tempArr[1]
    })
  }
  return obj
}
