import express  from "express"
import admin from "./routers/admin.js"
import user from './routers/user.js'

const app = express();
const PORT = 9000

app.use(express.json());

app.use("/api/admin", admin)
app.use("/api/user", user)


app.listen(PORT, () => console.log(`server running on port ${PORT}`));

