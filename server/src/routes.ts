import { productCatalogGetAllAction } from "./controller/ProductCatalogGetAllAction";
import CustomerController from "./controller/CustomerController";
import ProductController from "./controller/ProductController";
import OrderController from "./controller/OrderController";
import EmployeeController from "./controller/EmployeeController";
import RealEstateController from "./controller/RealEstateController";
import { companyGetByIdAction } from "./controller/CompanyGetByIdAction";

export const AppRoutes = [
  {
    path: "/api/product-catalogs",
    method: "get",
    action: productCatalogGetAllAction,
  },
  {
    path: "/api/clients",
    method: "get",
    action: CustomerController.getAll,
  },
  {
    path: "/api/products",
    method: "get",
    action: ProductController.getAll,
  },
  {
    path: "/api/products",
    method: "post",
    action: ProductController.create,
  },
  {
    path: "/api/products/:id",
    method: "patch",
    action: ProductController.update,
  },
  {
    path: "/api/products/:id",
    method: "delete",
    action: ProductController.delete,
  },
  {
    path: "/api/orders",
    method: "get",
    action: OrderController.getAll,
  },
  {
    path: "/api/orders/:id",
    method: "get",
    action: OrderController.getOne,
  },
  {
    path: "/api/orders",
    method: "post",
    action: OrderController.create,
  },
  {
    path: "/api/orders/:id",
    method: "put",
    action: OrderController.update,
  },
  {
    path: "/api/orders/:id",
    method: "delete",
    action: OrderController.delete,
  },
  {
    path: "/api/employees",
    method: "get",
    action: EmployeeController.findAll,
  },
  {
    path: "/api/employees/:id",
    method: "delete",
    action: EmployeeController.delete,
  },
  {
    path: "/api/employees/:id",
    method: "patch",
    action: EmployeeController.update,
  },
  {
    path: "/api/employees",
    method: "post",
    action: EmployeeController.create,
  },
  {
    path: "/api/realestates",
    method: "get",
    action: RealEstateController.getAll,
  },
  {
    path: "/api/realestates",
    method: "post",
    action: RealEstateController.create,
  },
  {
    path: "/api/realestates/:id",
    method: "patch",
    action: RealEstateController.update,
  },
  {
    path: "/api/realestates/:id",
    method: "delete",
    action: RealEstateController.delete,
  },
  {
    path: "/api/company/:id",
    method: "get",
    action: companyGetByIdAction,
  },
];
