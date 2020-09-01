export interface IStorageItem {
  key: string
  value: any
}

export class StorageItem {
  key: string
  value: any

  constructor(data: IStorageItem) {
    this.key = data.key
    this.value = data.value
  }
}

class LocalStorageWorker {
  localStorageSupported: boolean

  constructor() {
    this.localStorageSupported =
      typeof window['localStorage'] != 'undefined' &&
      window['localStorage'] != null
  }

  // add value to storage
  add(key: string, item: any) {
    this.localStorageSupported &&
      localStorage.setItem(key, JSON.stringify(item))
  }

  update(key: string, updates: any) {
    let existing = this.get(key) || null
    let newData: any

    if (existing) {
      newData = { ...existing, ...updates }
    } else {
      newData = updates
    }

    this.localStorageSupported && this.add(key, newData)
  }

  // get all values from storage (all items)
  getAllItems(): Array<StorageItem> {
    var list = new Array<StorageItem>()

    for (var i = 0; i < localStorage.length; i++) {
      var key = localStorage.key(i)

      if (key != null) {
        let value = localStorage.getItem(key)

        list.push(
          new StorageItem({
            key: key,
            value: value,
          })
        )

        return list
      }
    }

    throw 'No key present'
  }

  // get only all values from localStorage
  getAllValues(): Array<any> {
    var list = new Array<any>()

    for (var i = 0; i < localStorage.length; i++) {
      var key = localStorage.key(i)

      if (key != null) {
        let value = localStorage.getItem(key)
        list.push(value)
        return list
      }
    }

    throw `No key present`
  }

  // get one item by key from storage
  get(key: string): [] | null {
    if (this.localStorageSupported) {
      let item = localStorage.getItem(key)
      return item ? JSON.parse(item) : null
    } else {
      return null
    }
  }

  // remove value from storage
  remove(key: string) {
    if (this.localStorageSupported) {
      localStorage.removeItem(key)
    }
  }

  // clear storage (remove all items from it)
  clear() {
    if (this.localStorageSupported) {
      localStorage.clear()
    }
  }
}

export default LocalStorageWorker
