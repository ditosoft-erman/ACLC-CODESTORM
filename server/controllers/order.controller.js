const { Orders, OrderItems, Products } = require('../models');

const createOrder = async (req, res) => {
    const { items, totalAmount, paymentMethod } = req.body;
    const userId = req.user.userId;

    if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ error: 'Order items are required' });
    }

    try {
        const newOrder = await Orders.create({
            userId: userId,
            orderDate: new Date(),
            status: 'Pending',
            totalAmount,
            paymentMethod
        });

        const orderItems = items.map(item => ({
            orderId: newOrder.id,
            productId: item.productId,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            totalPrice: item.quantity * item.unitPrice
        }));

        await OrderItems.bulkCreate(orderItems);

        res.status(201).json({ message: 'Order created successfully', orderId: newOrder.id });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: 'Unable to create order' });
    }
};

const getOrder = async (req, res) => {
    const { id } = req.params;

    try {
        const order = await Orders.findOne({
            where: { id },
            include: [
                { model: OrderItems, include: [Products] }
            ]
        });

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.status(200).json(order);
    } catch (error) {
        console.error('Error fetching order:', error);
        res.status(500).json({ error: 'Unable to fetch order' });
    }
};


const listOrdersForUser = async (req, res) => {
    const { userId } = req.params;

    try {
        const orders = await Orders.findAll({
            where: { userId },
            include: [OrderItems]
        });

        if (!orders || orders.length === 0) {
            return res.status(404).json({ error: 'No orders found for this user' });
        }

        res.status(200).json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'Unable to fetch orders' });
    }
};


module.exports = { createOrder, getOrder };