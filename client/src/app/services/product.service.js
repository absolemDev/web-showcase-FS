import httpService from "./http.service";

const productEndpoint = "product/";

const productService = {
  fetchAll: async () => {
    const { data } = await httpService.get(productEndpoint);
    return data;
  },
  create: async (payload, idShowcase) => {
    const { data } = await httpService.post(productEndpoint, payload, {
      params: { idShowcase }
    });
    return data;
  },
  update: async (payload, idShowcase, idProduct) => {
    const { data } = await httpService.patch(
      productEndpoint + idProduct,
      payload,
      { params: { idShowcase } }
    );
    return data;
  },
  remove: async (idShowcase, idProduct) => {
    const { data } = await httpService.delete(productEndpoint + idProduct, {
      params: { idShowcase }
    });
    return data;
  }
};

export default productService;
