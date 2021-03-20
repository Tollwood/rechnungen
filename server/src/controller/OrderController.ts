import { Request, Response } from "express";
import { getConnection, getManager } from "typeorm";
import BillItem from "../entity/BillItem";
import { Order, OrderStatus } from "../entity/Order";
import OrderItem from "../entity/OrderItem";

export default class OrderController {
  static async getAll(request: Request, response: Response) {
    const page = Number.parseInt((request.query.page as string) || "0");
    const size = Number.parseInt((request.query.size as string) || "10000");
    const sort: string[] = request.query.sort ? (request.query.sort as string).split(",") : ["", ""];
    const sortDir: "ASC" | "DESC" = (sort[1] as "ASC" | "DESC") || "ASC";
    const sortCol = sort[0];
    const term: string = (request.query.term as string) || "";
    let status: string[] = Object.values(OrderStatus);

    if (typeof request.query.status === "string") {
      status = [request.query.status];
    } else if (Array.isArray(request.query.status)) {
      status = request.query.status as string[];
    }

    const orderRepository = getManager().getRepository(Order);

    const [orders, total] = await orderRepository
      .createQueryBuilder("order")
      .where((qb) => {
        qb.where(
          "order.status IN ( :...status ) AND (order.name LIKE :term OR realEstate.street LIKE :term OR realEstate.city LIKE :term OR realEstate.name LIKE :term OR order.orderId LIKE :term OR order.billNo LIKE :term)",
          {
            term: `%${term}%`,
            status: status,
          }
        );
      })
      .leftJoinAndSelect("order.realEstate", "realEstate")
      .leftJoinAndSelect("order.employee", "employee")
      .leftJoinAndSelect("order.billItems", "billItems")
      .leftJoinAndSelect("order.orderItems", "orderItems")
      .leftJoinAndSelect("orderItems.product", "orderItemProduct")
      .skip(page * size)
      .take(size)
      .orderBy(`order.${sortCol}`, sortDir)
      .getManyAndCount();
    response.send({
      data: orders,
      page: { page: page, totalPages: Math.ceil(total / size) },
    });
  }

  static async getOne(request: Request, response: Response) {
    const id: string = request.params.id;
    const orderRepository = getManager().getRepository(Order);
    const order = await orderRepository.findOne(id);
    response.send(order);
  }

  static async delete(request: Request, response: Response) {
    OrderController.deleteById(Number.parseInt(request.params.id));
    response.send("order");
  }

  static async deleteById(id: number) {
    const repository = getManager().getRepository(Order);

    await getConnection().createQueryBuilder().delete().from(BillItem).where("orderId = :id", { id: id }).execute();
    await getConnection().createQueryBuilder().delete().from(OrderItem).where("orderId = :id", { id: id }).execute();
    await repository.delete(id);
  }

  static async create(request: Request, response: Response) {
    const repository = getManager().getRepository(Order);
    const order = await repository.save(request.body);
    const orderItemRepository = getManager().getRepository(OrderItem);
    const orderItems = request.body.orderItems.map((oi) => ({ ...oi, order: order, orderId: order.id }));
    await orderItemRepository.save(orderItems);

    const billItemRepository = getManager().getRepository(BillItem);
    const billItems = request.body.billItems.map((oi) => ({ ...oi, order: order, orderId: order.id }));
    await billItemRepository.delete({ orderId: order.id });
    await billItemRepository.save(billItems);
    response.send(order);
  }

  static async update(request: Request, response: Response) {
    const repository = getManager().getRepository(Order);
    const orderItemRepository = getManager().getRepository(OrderItem);
    const billItemRepository = getManager().getRepository(BillItem);
    const order = request.body as Order;
    // delete relations
    await orderItemRepository.delete({ orderId: order.id });
    await billItemRepository.delete({ orderId: order.id });

    //update order
    const updatedOrder = await repository.save(order);

    //add relations
    const orderItems = request.body.orderItems.map((oi) => ({ ...oi, order: updatedOrder, orderId: updatedOrder.id }));
    await orderItemRepository.save(orderItems);

    const billItems = request.body.billItems.map((oi) => ({ ...oi, order: updatedOrder, orderId: updatedOrder.id }));
    await billItemRepository.save(billItems);

    response.send(request.body);
  }
}
