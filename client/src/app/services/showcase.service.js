import httpService from "./http.service";

const showcaseEndpoint = "showcase/";

const showcaseService = {
  fetchAll: async () => {
    const { data } = await httpService.get(showcaseEndpoint);
    return data;
  },
  create: async (payload) => {
    const { data } = await httpService.post(showcaseEndpoint, payload);
    return data;
  },
  update: async (payload, id) => {
    const { data } = await httpService.patch(showcaseEndpoint + id, payload);
    return data;
  },
  remove: async (id) => {
    const { data } = await httpService.delete(showcaseEndpoint + id);
    return data;
  }
};

export default showcaseService;
