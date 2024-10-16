import orderModel from "../models/orderModel.js";
import userModel from "../models/userModels.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Placing user order for frontend
const placeOrder = async (req, res) => {
    const frontend_url = 'http://localhost:5173';  // Update this to the actual frontend URL
    try {
        // Creating a new order in the database
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
        });
        
        await newOrder.save();
        console.log("Order model created.");

        // Clearing user's cart after order
        // await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        // Line items necessary for Stripe payment
        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "inr",  // Ensure consistency with INR
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100,  // Stripe requires amount in cents (INR)
            },
            quantity: item.quantity
        }));
        console.log("Line items created.");

        // Adding delivery charges as an additional line item
        line_items.push({
            price_data: {
                currency: "inr",  // Use INR for delivery charges too
                product_data: {
                    name: "Delivery Charges"
                },
                unit_amount: 200 ,  // Delivery charge (2 USD in INR cents)
            },
            quantity: 1
        });
        console.log("Delivery charges added.");

        // Creating a Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`
        });
        console.log("Stripe checkout session created.");

        // Sending the session URL for redirection
        res.json({ success: true, session_url: session.url });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Payment failed due to an error" });
    }
};

export { placeOrder };
