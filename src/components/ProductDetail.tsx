import {
  ActionFunctionArgs,
  Form,
  redirect,
  useFetcher,
  useNavigate,
} from "react-router-dom";
import { Product } from "../types";
import { formatCurrency } from "../utils";
import { deleteProduct } from "../services/productServices";

type ProductDetailProps = {
  product: Product;
};

export async function action({ params }: ActionFunctionArgs) {
  if (params.id !== undefined) {
    await deleteProduct(+params.id);
  }
  return redirect("/");
}
const ProductDetail = ({ product }: ProductDetailProps) => {
  const navigate = useNavigate();
  const fetcher = useFetcher();
  const handleNavigateEdit = () => {
    navigate(`/productos/${product.id}/editar`);
  };
  return (
    <>
      <tr className="border-b ">
        <td className="p-3 text-lg text-gray-800">{product.name}</td>
        <td className="p-3 text-lg text-gray-800">
          {formatCurrency(product.price)}
        </td>
        <td className="p-3 text-lg text-gray-800">
          <fetcher.Form method="POST">
            <button
              type="submit"
              name="id"
              value={product.id}
              className={`${
                product.availability ? "text-green-500" : "text-red-500"
              } bg-slate-50 font-bold uppercase p-3 rounded-lg w-full`}
            >
              {product.availability ? "Disponible" : "No disponible"}
            </button>
          </fetcher.Form>
        </td>
        <td className="p-3 text-lg text-gray-800 ">
          <div className="flex items-center gap-5">
            <button
              className="bg-indigo-500 text-white font-bold uppercase p-3 rounded-lg hover:bg-indigo-600 w-full"
              onClick={handleNavigateEdit}
            >
              Editar
            </button>
            <Form
              className="w-full"
              method="POST"
              action={`productos/${product.id}/eliminar`}
              onSubmit={(e) => {
                if (!confirm("¿Deseas eliminar este producto?")) {
                  e.preventDefault();
                }
              }}
            >
              <input
                type="submit"
                value="Eliminar"
                className="bg-red-500 text-white font-bold uppercase p-3 rounded-lg hover:bg-red-600 w-full"
              />
            </Form>
          </div>
        </td>
      </tr>
    </>
  );
};

export default ProductDetail;
