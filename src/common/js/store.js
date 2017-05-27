export function saveToLocal(id, key, val) {
  let seller = window.localStorage.__seller__
  if (!seller) {
    seller = {}
    seller[id] = {}
  } else {
    seller = JSON.parse(seller)
    if (!seller[id]) {
      seller[id] = {}
    }
  }
  seller[id][key] = val
  localStorage.__seller__ = JSON.stringify(seller)
}

export function loadFromLocal(id, key, defat) {
  let seller = window.localStorage.__seller__
  if (!seller) {
    return defat
  }
  seller = JSON.parse(seller)[id]
  if (!seller) {
    return defat
  }

  let val = seller[key]
  return val || defat
}
