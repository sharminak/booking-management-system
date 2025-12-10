import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { users } from "../data/db.js";

export function register(req, res) {
  const { name, email, password, role } = req.body;

  if (users.find((u) => u.email === email)) {
    return res.json({ message: "Email already exists" });
  }

  const passwordHash = bcrypt.hashSync(password, 10);

  const newUser = {
    id: Date.now().toString(),
    name,
    email,
    passwordHash,
    role: role || "user",
  };

  users.push(newUser);

  res.json({ success: true, message: "User registered successfully" });
}

export function login(req, res) {
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email);
  if (!user) return res.json({ message: "Invalid credentials" });

  if (!bcrypt.compareSync(password, user.passwordHash)) {
    return res.json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    "secret123",
    { expiresIn: "2h" }
  );

  res.json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
}
