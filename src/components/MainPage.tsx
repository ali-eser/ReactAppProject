import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { Trash2Icon, SquarePen } from "lucide-react"
import services from "../services/api.ts"
import { useEffect, useState } from "react";

import { type Product } from "@/interfaces/interfaces";

const MainPage = () => {
  const [productList, setProductList] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const [brand, setBrand] = useState("");
  const [label, setLabel] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);

  const addProduct = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newProduct = {
      "brand": brand,
      "productName": label,
      "productDescription": description,
      "productPrice": price
    };

    let res: Product = await services.createProduct(newProduct);

    res = {
      ...res,
      isUserCreated: true
    }
    console.log(res);
    const updatedList: Product[] = [res, ...productList];

    setProductList(updatedList);

    setBrand("");
    setDescription("");
    setPrice(0);
  };

  const deleteProduct = async (id: string) => {
    await services.deleteProduct(id);
    setProductList(productList.filter(p => id !== p.productId));
  }

  const updateProduct = async (id: string) => {
    const updatedProduct = {
      "productId": id,
      "brand": brand,
      "productName": label,
      "productDescription": description,
      "productPrice": price ? price : 0
    };

    console.log(productList.filter(p => id === p.productId)[0].isUserCreated)

    if (productList.filter(p => id === p.productId)[0].isUserCreated === true) {
      const updatedList = productList.map(p => {
        if (id === p.productId) {
          return {
            ...p,
            "brand": brand,
            "productName": label,
            "productDescription": description,
            "productPrice": price ? price : 0
          }
        } else {
          return p;
        }
      });
      setProductList(updatedList);
    } else {
      const res = await services.updateProduct(updatedProduct);

      const updatedList = productList.map(p => {
        if (id === p.productId) {
          return res;
        } else {
          return p;
        }
      })

      setProductList(updatedList);
    }
    setBrand("");
    setDescription("");
    setPrice(0);
  };

  useEffect(() => {
    async function fetchProducts () {
      setLoading(true);
      const data = await services.getProducts();
      setProductList(data);
      setLoading(false);
    }
    fetchProducts();
  }, []);

  return (
    <section id="main-page">
      <div id="top-bar">
        <div id="welcome">Demo Store</div>
        <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Add New Product</Button>
        </PopoverTrigger>
        <PopoverContent className="w-64" align="start">
          <PopoverHeader>
            <PopoverTitle>Add New Product</PopoverTitle>
            <PopoverDescription>
              Create a new product to add to the page.
            </PopoverDescription>
          </PopoverHeader>
          <form onSubmit={(event) => addProduct(event)}>
            <FieldGroup className="gap-4">
              <Field orientation="horizontal">
                <FieldLabel htmlFor="brand" className="w-1/2">
                  Brand
                </FieldLabel>
                <Input id="brand" required placeholder="Brand" onChange={(e) => setBrand(e.target.value)} />
              </Field>
              <Field orientation="horizontal">
                <FieldLabel htmlFor="label" className="w-1/2">
                  Label
                </FieldLabel>
                <Input id="label" required placeholder="Product label" onChange={(e) => setLabel(e.target.value)} />
              </Field>
              <Field orientation="horizontal">
                <FieldLabel htmlFor="description" className="w-1/2">
                  Description
                </FieldLabel>
                <Input id="description" required defaultValue="" placeholder="Description" onChange={(e) => setDescription(e.target.value)} />
              </Field>
              <Field orientation="horizontal">
                <FieldLabel htmlFor="price" className="w-1/2">
                  Price
                </FieldLabel>
                <Input id="price" type="number" placeholder="Price" onChange={(e) => setPrice(parseInt(e.target.value))} />
              </Field>
              <Button type="submit" variant="outline" >Add</Button>
            </FieldGroup>
          </form>

        </PopoverContent>
      </Popover>
      </div>
      <div id="item-section">
          {loading && (
            <h3>Loading products...</h3>
          )}
          {productList.length === 0 && !loading && (
            <h3>No products found.</h3>
          )}
          {productList.length > 0 && (
            <ul>
              {productList.map(p => (
                <li key={p.productId}>
                  <Card className="relative mx-auto w-full max-w-xs pt-0 card">
                    <div className="absolute inset-0 z-30 aspect-video" />
                    {typeof p.productImage === "undefined" && (
                      <img
                        alt={`No image provided for ${p.productName}`}
                        className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
                      />
                    )}
                    {p.productImage && (
                      <img
                        src={p.productImage}
                        alt="Event cover"
                        className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
                      />
                    )}
                    <CardHeader>
                      <CardAction>
                      </CardAction>
                      <h3>{p.brand}</h3>
                      <h1>{p.productName}</h1>
                      <CardDescription className="card-desc">
                        {p.productDescription}
                      </CardDescription>
                    </CardHeader>
                    <CardFooter className="card-footer">
                      <div>
                        ${p.productPrice}
                      </div>
                      <div>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button id={p.productId} variant="secondary" >
                              <SquarePen />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-64" align="start">
                            <PopoverHeader>
                              <PopoverTitle>Update "{p.productName}"</PopoverTitle> 
                            </PopoverHeader>
                            <FieldGroup className="gap-4">
                              <Field orientation="horizontal">
                                <FieldLabel htmlFor="brand" className="w-1/2">
                                  Brand
                                </FieldLabel>
                                <Input id="brand" placeholder="Brand" onChange={(e) => setBrand(e.target.value)} />
                              </Field>
                              <Field orientation="horizontal">
                                <FieldLabel htmlFor="label" className="w-1/2">
                                  Label
                                </FieldLabel>
                                <Input id="label" placeholder="Product label" onChange={(e) => setLabel(e.target.value)} />
                              </Field>
                              <Field orientation="horizontal">
                                <FieldLabel htmlFor="description" className="w-1/2">
                                  Description
                                </FieldLabel>
                                <Input id="description" defaultValue="" placeholder="Description" onChange={(e) => setDescription(e.target.value)} />
                              </Field>
                              <Field orientation="horizontal">
                                <FieldLabel htmlFor="price" className="w-1/2">
                                  Price
                                </FieldLabel>
                                <Input id="price" type="number" placeholder="Price" onChange={(e) => setPrice(parseInt(e.target.value))} />
                              </Field>
                            </FieldGroup>
                            <Button id={p.productId} variant="outline" onClick={(e) => updateProduct((e.target as HTMLElement).id)}>Update</Button>
                          </PopoverContent>
                        </Popover>
                        <Button id={p.productId} variant="destructive" onClick={(e) => deleteProduct((e.target as HTMLElement).id)}>
                          <Trash2Icon />
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                </li>
              ))}
            </ul>
          )}
      </div>
    </section>
  )
};

export default MainPage;