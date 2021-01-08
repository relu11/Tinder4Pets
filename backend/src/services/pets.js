import { getDocs, insertDoc, getDocWithId, deleteDoc } from "./Database";

export const nearbyServices = async (userCity) => {
  const nearbyService = await getDocs("pets_services", { city: userCity });
  console.log("NearbyServices:", nearbyService);
  return nearbyService;
};
export const addServices = async (serviceOwnerId, newServicesData) => {
  const newService = { ...newServicesData, serviceOwnerId };
  const result = await insertDoc("pets_services", newService);
  const serviceDoc = await getDocWithId("pets_services", result.id);
  return serviceDoc;
};
export const editServices = async (userId, serviceId, newServicesData) => {
  let serviceDoc = await getDocWithId("pets_services", serviceId);
  if (serviceDoc.serviceOwnerId !== userId) {
    throw new Error("unauthorized");
  }
  const newserviceDoc = { ...serviceDoc, ...newServicesData };
  delete newserviceDoc._rev;
  const result = await insertDoc("pets_services", newserviceDoc);
  serviceDoc = await getDocWithId("pets_services", result.id);
  return serviceDoc;
};
export const deleteService = async (userId, serviceId) => {
  const serviceDoc = await getDocWithId("pets_services", serviceId);
  if (serviceDoc.ownerId !== userId) {
    throw new Error("unauthorized");
  }
  const result = await deleteDoc("pets_services", serviceId);
  return result;
};
