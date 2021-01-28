import { deleteDoc, getAll, getDocWithId, insertDoc } from "./Database";

/**
 * Adds a new event
 * @param {String} creatorId The id of the event creator
 * @param {Object} newEventData New event data
 * @returns {Object} Inserted event data
 */
export const addEvent = async (creatorId, newEventData) => {
  const newEvent = { ...newEventData, creatorId };
  const eventDoc = await insertDoc("events", newEvent);
  return eventDoc;
};

/**
 * Gets all the events
 * @returns {Array}
 */
export const getAllEvents = async () => {
  const events = await getAll("events");
  return events;
};

/**
 * Edit an event
 * @param {String} userId User ID
 * @param {String} eventId Event ID
 * @param {Object} newEventData New event data
 */
export const editEvent = async (userId, eventId, newEventData) => {
  const eventDoc = await getDocWithId("events", eventId);
  if (!eventDoc) {
    throw new Error("not found");
  }
  if (eventDoc.creatorId !== userId) {
    throw new Error("unauthorized");
  }
  const newEventDoc = { ...eventDoc, ...newEventData };

  const result = await insertDoc("events", newEventDoc);
  return result;
};

/**
 * Deletes an event
 * @param {String} userId User ID
 * @param {String } eventId User ID
 */
export const deleteEvent = async (userId, eventId) => {
  const eventDoc = await getDocWithId("events", eventId);
  if (!eventDoc) {
    throw new Error("not found");
  }
  if (eventDoc.creatorId !== userId) {
    throw new Error("unauthorized");
  }
  const result = await deleteDoc("events", eventId);
  return result;
};
