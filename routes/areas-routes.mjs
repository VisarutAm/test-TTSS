import express from "express";
import connectionPool from "../utils/db.mjs";


const areas = express.Router();

// Post Areas
areas.post("/areas",async (req, res) => {
  const newData = req.body;
  const dataKeys = Object.keys(req.body);  
  
  try {
    if ((!newData.area_id || !newData.urgencylevel|| !newData.requiredresources || !newData.timeconstraint) || dataKeys.length !=4){
       return res.status(400).json({"Bad Request": "Missing or Invalid request data"})};       
    
    const query = `
        INSERT INTO areas ( area_id, urgencylevel, requiredresources, timeconstraint) 
        VALUES ($1, $2, $3, $4) RETURNING *;
      `;

    const values = [
      newData.area_id,
      newData.urgencylevel,
      newData.requiredresources,
      newData.timeconstraint  
    ];
    await connectionPool.query(query, values); 

    res.status(200).json({ message: "Add Area Successful"});
  } catch (error) {
    console.error("Error inserting area:", error);
    res.status(500).json({ message: "Add Area failed", error });
  }
});

export default areas;
