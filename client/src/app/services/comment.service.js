import httpService from "./http.service";

const commentEndpoint = "comment/";

const commentService = {
  fetchAll: async () => {
    const { data } = await httpService.get(commentEndpoint);
    return data;
  },
  create: async (payload) => {
    const { data } = await httpService.post(commentEndpoint, payload);
    return data;
  },
  reply: async (payload, id) => {
    const { data } = await httpService.patch(commentEndpoint + id, payload);
    return data;
  },
  remove: async (id) => {
    const { data } = await httpService.delete(commentEndpoint + id);
    return data;
  }
};

export default commentService;
