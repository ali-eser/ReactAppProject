import express from "express";

const app = express();
app.use(express.json());

const PORT = 3000;
const baseURL = "https://apihero-api.quixtools.com/api/v1";

app.get("/api/store/:id", async (request, response) => {
  try {
    const { data } = await fetch(
      `${baseURL}/store/getProduct/${request.params.id}`
    );
    response.json(data);
  } catch (err) {
    response.status(500).json({ message: err.message });
    console.log(err.message);
  }
});

app.post("/api/store", async (request, response) => {
  try {
    const { data } = await fetch(
      `${baseURL}/store/getProducts`, {
        method: "POST",
        body: JSON.stringify({
          "sortBy": "createDate",
          "order": "desc",
          "pager": {
            "page": 1,
            "size": 15
          }
        })
      }
    );
    response.json(data);
  } catch (err) {
    response.status(500).json({ message: err.message })
  }
});

app.post("/api/createProduct", async (request, response) => {
  try {
    const body = request.body;

    const { data } = await fetch(
      `${baseURL}/store/createProduct`, {
        method: "POST",
        body: JSON.stringify({
          "brand": null,
          "productName": body.productName,
          "productDescription": body.productDescription,
          "productPrice": body.productPrice,
          "categoryId": null,
          "subCategoryId": null,
          "stock": null
        })
      }
    );
    response.json(data);
  } catch (err) {
    response.status(500).json({ message: err.message })
  }
});

app.put("/api/updateProduct", async (request, response) => {
  try {
    const body = request.body;

    const { data } = await fetch(
      `${baseURL}/store/updateProduct`, {
        method: "PUT",
        body: JSON.stringify({
          "productId": body.productId,
          "brand": body.brand,
          "productName": body.productName,
          "productDescription": body.productDescription,
          "productPrice": body.productPrice,
          "stock": body.stock
        })
      }
    );
    response.json(data);
  } catch (err) {
    response.status(500).json({ message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
