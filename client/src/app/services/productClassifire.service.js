import httpService from "./http.service";

const productClassifireEndpoint = "classifireProduct/";

const productClassifireService = {
  search: async (payload) => {
    const { data } = await httpService.get(productClassifireEndpoint, {
      params: { name: payload }
    });
    return data;
  }
};

export default productClassifireService;
