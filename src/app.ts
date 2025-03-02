import express, { Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json";
import { Users } from "../data/users";

const app = express();
const port = 3000;

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// * ใช้งาน any กับ error เพราะว่าต้องการให้ ทั้งหมด ที่เป็น error
app.get("/api/users", (req: Request, res: Response) => {
  try {
    res.status(200).json(Users);
  } catch (error: any) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/api/users/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  try {
    const user = Users.find((user) => user.id === id);

    if (!user) {
      res.status(404).json({ message: "User not found" }); //
    }

    res.status(200).json(user);
  } catch (error: any) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/api/users", (req: Request, res: Response) => {
  const { name, email } = req.body;

  if (!name || !email) {
    res.status(400).json({ message: "Name and email are required" });
  }

  const user = {
    id: Users.length + 1,
    name,
    email,
    createdAt: new Date(),
  };

  Users.push(user);

  res.status(201).json(user);
});

app.put("/api/users/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const updatedUser = req.body;

  if (!updatedUser.name || !updatedUser.email) {
    res.status(400).json({ message: "Name and email are required" });
  }

  const userIndex = Users.findIndex((user) => user.id === id);

  if (userIndex === -1) {
    res.status(404).json({ message: "User not found" });
  }

  Users[userIndex] = {
    id,
    name: updatedUser.name,
    email: updatedUser.email,
    createdAt: new Date(),
  };

  res.status(200).json(Users[userIndex]);
});

app.delete("/api/users/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  if (!id) {
    res.status(400).json({ message: "ID is required" });
  }

  const User = Users.find((user) => user.id === id);

  if (!User) {
    res.status(404).json({ message: "User not found" });
  }

  res.status(200).json({ message: `User ${id} deleted successfully` });
});

// app listen
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
