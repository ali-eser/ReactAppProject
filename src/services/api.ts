import { type Product } from "@/interfaces/interfaces";

const baseURL = "https://apihero-api.quixtools.com/api/v1";

const getProducts = async () => {
  try {
    const data = await fetch(
      `${baseURL}/store/getProducts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "sortBy": "createDate",
          "order": "desc",
          "pager": {
            "page": 1,
            "size": 28
          }
        })
      }
    );
    const response = await data.json();
    return response.data.productData;
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
      return { message: err.message };
    }
  }
};

const createProduct = async (body: Product) => {
  try {
    const data = await fetch(
      `${baseURL}/store/createProduct`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "brand": body.brand,
          "productName": body.productName,
          "productDescription": body.productDescription,
          "productPrice": body.productPrice,
          "categoryId": "ct001",
          "subCategoryId": "subCt001",
          "stock": 50
        })
      }
    );
    const response = await data.json();
    return response.data;
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
      return { message: err.message };
    }
  }
};

const updateProduct = async (body: Product) => {
  try {
    const data = await fetch(
      `${baseURL}/store/updateProduct`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "productId": body.productId,
          "brand": body.brand,
          "productName": body.productName,
          "productDescription": body.productDescription,
          "productPrice": body.productPrice,
          "categoryId": "cat001",
          "subCategoryId": "subCat001",
          "stock": 50
        })
      }
    );
    const response = await data.json();
    return response.data;
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
      return { message: err.message };
    }
  }
};

const deleteProduct = async (id: string) => {
  try {
    const data = await fetch(
      `${baseURL}/store/deleteProduct/${id}`, {
        method: "DELETE"
      }
    );
    const response = await data.json();
    console.log(response);
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
      return { message: err.message };
    }
  }
}

export default { getProducts, createProduct, updateProduct, deleteProduct };