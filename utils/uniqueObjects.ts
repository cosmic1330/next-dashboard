const uniqueObjects = (arr: any[]): any[] => {
  const set = new Set();
  return arr.filter((obj) => {
    const serialized = JSON.stringify(obj);
    if (set.has(serialized)) {
      return false; // 已存在，过滤掉
    }
    set.add(serialized); // 添加新的对象
    return true; // 保留
  });
};
export default uniqueObjects;
