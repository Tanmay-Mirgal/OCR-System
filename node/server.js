import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const products = [
    {
        id: 1,
        name: "Product 1",
        category: "FACE WASH",
        price: 10.99,
        image: "https://picsum.photos/id/1015/200/300"
    },
    {
        id: 2,
        name: "Product 2",
        category: "SHAMPOO",
        price: 12.99,
        image: "https://picsum.photos/id/1016/200/300"
    },
    {
        id: 3,
        name: "Product 3",
        category: "BODY LOTION",
        price: 9.99,
        image: "https://picsum.photos/id/1017/200/300"
    },
    {
        id: 4,
        name: "Product 4",
        category: "SOAP",
        price: 8.99,
        image: "https://picsum.photos/id/1018/200/300"
    },
    {
        id: 5,
        name: "Product 5",
        category: "SERUM",
        price: 15.99,
        image: "https://picsum.photos/id/1019/200/300"
    },
    {
        id: 6,
        name: "Product 6",
        category: "MOISTURIZER",
        price: 14.99,
        image: "https://picsum.photos/id/1020/200/300"
    },
    {
        id: 7,
        name: "Product 7",
        category: "FACE WASH",
        price: 11.99,
        image: "https://picsum.photos/id/1021/200/300"
    },
    {
        id: 8,
        name: "Product 8",
        category: "SHAMPOO",
        price: 13.99,
        image: "https://picsum.photos/id/1022/200/300"
    },
    {
        id: 9,
        name: "Product 9",
        category: "BODY LOTION",
        price: 10.99,
        image: "https://picsum.photos/id/1023/200/300"
    },
    {
        id: 10,
        name: "Product 10",
        category: "SERUM",
        price: 16.99,
        image: "https://picsum.photos/id/1024/200/300"
    }
]


app.use(cors({
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 200
}));

app.use(express.json()); // Ensure request body is parsed correctly

app.post("/get-products-by-category", (req, res) => {
  console.log("Received category:", req.body.category);

  const filteredProducts = products.filter(product => product.category === req.body.category);

  res.json({ message: "Products retrieved successfully", products: filteredProducts });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
