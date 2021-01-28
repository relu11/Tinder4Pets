import { deleteDoc, getDocs, getDocWithId, insertDoc } from "./Database";

/**
 * Add new article
 * @param {String} creatorId Id of the article author
 * @param {Object} newArticleData New article data
 * @returns {Object} Inserted article data
 */
export const addArticle = async (creatorId, newArticleData) => {
  console.log(newArticleData);
  const newArticle = { ...newArticleData, creatorId };
  const articleDoc = await insertDoc("articles", newArticle);
  return articleDoc;
};

/**
 * Gets all the articles
 * @returns {Array} All articles
 */
export const getAllArticles = async () => {
  const articles = await getDocs("articles", { approved: true });
  return articles;
};

/**
 * Gets all the articles of an author
 * @param {String} userId The id of the author
 * @returns {Array} Author's articles
 */
export const getMyArticles = async (userId) => {
  const articles = await getDocs("articles", { creatorId: userId });
  return articles;
};

/**
 * Updates article data
 * @param {String} userId The id of the author
 * @param {String} articleId The id of the article to edit
 * @param {Object} newArticleData Updated article data
 * @returns {Object} The updated aticle
 */
export const editArticle = async (userId, articleId, newArticleData) => {
  const articleDoc = await getDocWithId("articles", articleId);
  if (!articleDoc) {
    throw new Error("not found");
  }
  if (articleDoc.creatorId !== userId) {
    throw new Error("unauthorized");
  }
  const newArticleDoc = { ...articleDoc, ...newArticleData };
  const result = await insertDoc("articles", newArticleDoc);
  return result;
};

/**
 * Deletes an article
 * @param {String} userId The id of the author
 * @param {String} articleId The id of the article to delete
 * @returns {boolean} Success state of the operations
 */
export const deleteArticle = async (userId, articleId) => {
  const articleDoc = await getDocWithId("articles", articleId);
  if (!articleDoc) {
    throw new Error("not found");
  }
  if (articleDoc.creatorId !== userId) {
    throw new Error("unauthorized");
  }
  const result = await deleteDoc("articles", articleId);
  return result;
};
