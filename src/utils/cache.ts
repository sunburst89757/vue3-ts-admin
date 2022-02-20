// 缓存相关处理
class Cache {
  getCache(key: string) {
    const cache = localStorage.getItem(key);
    if (typeof cache == "string") {
      return JSON.parse(cache);
    } else {
      return null;
    }
  }
  setCache(key: string, value: any) {
    return localStorage.setItem(key, JSON.stringify(value));
  }
  deleteCache(key: string) {
    localStorage.removeItem(key);
  }
  clearCache() {
    localStorage.clear();
  }
}

export default new Cache();
