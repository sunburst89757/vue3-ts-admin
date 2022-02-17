// 缓存相关处理
class Cache {
  getCache(key: string) {
    return localStorage.getItem(key);
  }
  setCache(key: string, value: any) {
    return localStorage.setItem(key, value);
  }
  deleteCache(key: string) {
    localStorage.removeItem(key);
  }
}

export default new Cache();
