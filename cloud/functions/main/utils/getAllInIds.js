const cloud = require("wx-server-sdk");

const MAX_LIMIT = 100;

const getAllInIds = async (collection, ids, { field, order }) => {
  const db = cloud.database();
  const _ = db.command;

  const { total } = await db
    .collection(collection)
    .where({ _id: _.in(ids) })
    .count();
  const batchTimes = Math.ceil(total / 100);
  const tasks = [];

  for (let i = 0; i < batchTimes; i++) {
    const promise = db
      .collection(collection)
      .where({ _id: _.in(ids) })
      .orderBy(field, order || "desc")
      .skip(i * MAX_LIMIT)
      .limit(MAX_LIMIT)
      .get();
    tasks.push(promise);
  }

  console.log(tasks);

  return (await Promise.all(tasks)).reduce(
    (acc, cur) => {
      return {
        data: acc.data.concat(cur.data),
        errMsg: acc.errMsg,
      };
    },
    { data: [] }
  );
};

module.exports = getAllInIds;
