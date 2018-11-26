/**
 * @method isOwnerDocument
 * @param userId
 * @param doc
 * @param fields
 * @param modifier
 */
export const isOwnerDocument = (userId, doc, fields, modifier) => doc && doc.userId === userId;

/**
 * @method allowModel
 * @param collection
 */
export const allowModel = collection => {
  // collection.allow({
  //   insert: isOwnerDocument,
  //   update: isOwnerDocument,
  //   remove: isOwnerDocument
  // });
  return collection;
};

/**
 * @method denyModel
 * @param collection
 */
export const denyModel = collection => {
  // collection.deny({
  //   update: (userId, docs, fields, modifier) => {
  //     // can't change owners
  //     return _.contains(fields, 'userId');
  //   }
  // });
  return collection;
};