import { safeParse, pipe, transform, parse, string } from "valibot";
import {
  DraftProductSchema,
  Product,
  ProductSchema,
  ProductsSchema,
} from "../types";
import { BASE_URL } from "../constants/system";
import axios from "axios";
import { toBoolean } from "../utils";

type ProductData = {
  [k: string]: FormDataEntryValue;
};
export async function addProduct(data: ProductData) {
  try {
    const result = safeParse(DraftProductSchema, {
      name: data.name,
      price: +data.price,
    });
    if (result.success) {
      await axios.post(`${BASE_URL}/api/products`, result.output);
    } else {
      throw new Error("Invalid data");
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getProducts() {
  try {
    const { data } = await axios.get(`${BASE_URL}/api/products`);
    const result = safeParse(ProductsSchema, data?.data);
    if (result.success) {
      return result.output;
    } else {
      throw new Error("Invalid data");
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getProductById(id: Product["id"]) {
  try {
    const { data } = await axios.get(`${BASE_URL}/api/products/${id}`);
    const result = safeParse(ProductSchema, data?.data);
    if (result.success) {
      return result.output;
    } else {
      throw new Error("Invalid data");
    }
  } catch (error) {
    console.log(error);
  }
}

export async function editProduct(data: ProductData, id: Product["id"]) {
  try {
    const NumberSchema = pipe(
      string(),
      transform(Number)
    );
    const result = safeParse(ProductSchema, {
      id,
      name: data.name,
      price: parse(NumberSchema, data.price),
      availability: toBoolean(data.availability.toString())
    });
    if (result.success) {
      await axios.put(`${BASE_URL}/api/products/${id}`, result.output);
    } else {
      throw new Error("Invalid data");
    }
  } catch (error) {
    console.log(error);
  }
}

export async function deleteProduct(id: Product["id"]) {
  try {
    await axios.delete(`${BASE_URL}/api/products/${id}`);
  } catch (error) {
    console.log(error);
  }
}

export async function updateAvailability(id: Product["id"]) {
  try {
    const { data } = await axios.patch(`${BASE_URL}/api/products/${id}`);
    const result = safeParse(ProductSchema, data?.data);
    if (result.success) {
      return result.output;
    } else {
      throw new Error("Invalid data");
    }
  } catch (error) {
    console.log(error);
  }
}
