import {mongooseConnect} from "../../lib/mongoose"
import {Product} from "../../models/Product"
import {Order} from "../../models/Order"
const stripe = require("stripe")(process.env.STRIPE_SK);

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.json("should be POST request")
        return
    }
    await mongooseConnect()
    const {name,email,city,postalCode,streetAddress,country,cartProducts} = req.body
    const productIds = cartProducts
    const uniqueId = [...new Set(productIds)]
    const productsInfos = await Product.find({ _id: uniqueId }).exec();



    let line_items = []
    for (const productId of uniqueId) {
        const productInfo = productsInfos.find(p => p._id.toString() === productId)
        const quantity = productIds.filter(id => id === productId).length || 0
        if (quantity > 0 && productInfo) {
            line_items.push({
                quantity,
                price_data: {
                    currency: "USD",
                    product_data: {name:productInfo.title,},
                    unit_amount: quantity * (productInfo.price * 100),
                }
            })
        }
    }
    
    const orderDoc = await Order.create({
        line_items,name,email,city,postalCode,streetAddress,country,paid:false,
    })


    const session = await stripe.checkout.sessions.create({
        line_items,
        mode:"payment",
        customer_email: email,
        success_url: process.env.URL + "/cart?success=1",
        cancel_url: process.env.URL + "/cart?canceled=1",
        metadata:{ orderId:orderDoc._id.toString()},

        

    })
    res.json({
        url: session.url,
    })
}
