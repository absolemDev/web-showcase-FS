import httpService from "./http.service";

const userEndpoint = "user/";

const userService = {
  fetchAll: async () => {
    const { data } = await httpService.get(userEndpoint);
    return data;
  },
  update: async (payload) => {
    const { data } = await httpService.patch(userEndpoint, payload);
    return data;
  }
};
export default userService;
