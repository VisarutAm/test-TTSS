import express from "express"
import cors from "cors";
import "dotenv/config";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import areas from "./routes/areas-routes.mjs";
import trucks from "./routes/trucks-routes.mjs";
import assignments from "./routes/assignments-routes.mjs";

const app = express();
const port = process.env.PORT || 4000;

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: "Disaster Resource Allocation API",
      description: "API",      
    },    
  },
  apis: ["./swagger.mjs"]
};

const swaggerDocs=swaggerJSDoc(swaggerOptions);
app.use('/swagger',swaggerUi.serve,swaggerUi.setup(swaggerDocs));

app.use(express.json());
app.use(cors());

app.use('/api', areas);
app.use('/api', trucks);
app.use('/api', assignments);

app.get("/test", (req, res) => {
    return res.json("Server API is working 🚀");
  });
  
  app.listen(port, () => {
    console.log(`Server is running at ${port}`);
  });