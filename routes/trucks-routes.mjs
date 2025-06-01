import express from "express";
import connectionPool from "../utils/db.mjs";

const trucks = express.Router();

// Post Truck Data
trucks.post("/trucks", async (req, res) => {
  const newData = req.body;
  const dataKeys = Object.keys(req.body);  
  
  try {   
    if ((!newData.truck_id || !newData.availableresources || !newData.traveltimetoarea) || dataKeys.length !=3){
       return res.status(400).json({"Bad Request": "Missing or Invalid request data"})};       
    
       const query = `
        INSERT INTO trucks ( truck_id, availableresources, traveltimetoarea) 
        VALUES ($1, $2, $3) RETURNING *;
      `;

    const values = [newData.truck_id, newData.availableresources, newData.traveltimetoarea];
    await connectionPool.query(query, values);

    res.status(200).json({ message: "Add Trucks Data Successful" });
  } catch (error) {
    console.error("Error inserting Trucks Data:", error);
    res.status(500).json({ message: "Add Trucks Data failed", error });
  }
});

export default trucks;
