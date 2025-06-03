import express from "express";
import connectionPool from "../utils/db.mjs";
import axios from "axios";
import redisClient from "../utils/redisdb.mjs";

const assignments = express.Router();

// Get All Data
assignments.get("/data", async (req, res) => {
  try {
    const query = `
      SELECT *
      FROM areas area
      CROSS JOIN trucks truck
      ORDER BY area.urgencylevel DESC;
    `;
    const result = await connectionPool.query(query);
    res.status(200).json(result.rows);
  } catch (error) {    
    res.status(500).json({ message: "Failed to fetch data"});
  }
});

// Add assigment
assignments.post("/assignments", async (req, res) => {
  const newAssignment = req.body;
  const dataKeys = Object.keys(req.body);

  if (
    !newAssignment.area_id ||
    !newAssignment.resources_delivered ||
    dataKeys.length != 2
  ) {
    return res
      .status(400)
      .json({ "Bad Request": "Missing or Invalid request data" });
  }

  try {    
    const cacheData = await redisClient.get("data");  
    if (!cacheData) {      
      const result = await axios.get("https://test-ttss.onrender.com/api/data");

      await redisClient.setEx("data", 1800, JSON.stringify(result.data));

      console.log("Cache Created ");
      return res.status(200).json({ message: "Cache Created" });
    } else {        
      const parsedCache = JSON.parse(cacheData);  
         
      const filteredData = parsedCache
        .filter((item) => item.area_id === newAssignment.area_id)
        .filter((item) => {
          const available = item.availableresources;        
          const requiredDelivered = newAssignment.resources_delivered;          
          return Object.keys(requiredDelivered).every(
            (key) => available[key] >= requiredDelivered[key]
          );
        });
      const checkTravelTimeToArea = filteredData.filter((item) => {
        const available = item.traveltimetoarea[newAssignment.area_id];
        const required = item.timeconstraint;
        return available <= required;
      });    

      if (filteredData.length === 0) {
        return res
          .status(400)
          .json({ message: "RequiredResources cannot be delivered" });
      } else if (checkTravelTimeToArea.length === 0) {
        return res.status(400).json({ message: "Time constraint issue" });
      }

      const oldAssignments = await redisClient.get("assignments");
      let assignmentsArr = oldAssignments
        ? JSON.parse(oldAssignments)
        : [];

      const assignmentData = checkTravelTimeToArea.map((item) => ({
        area_id: item.area_id,
        truck_id: item.truck_id,
        resources_delivered: newAssignment.resources_delivered,
      }));

      assignmentsArr.push(...assignmentData);

      await redisClient.setEx(
        "assignments",
        1800,
        JSON.stringify(assignmentsArr)
      );

      return res.status(201).json({
        message: "Assignment Created",
        assignments: assignmentsArr,
      });
    }
  } catch (error) {    
    res.status(500).json({ message: "Assignment process failed"});
  }
});

// Get last assignment
assignments.get("/assignments", async (req, res) => {
    const lastAssignment = await redisClient.get("assignments")
    if (lastAssignment) {
    res.status(200).json(JSON.parse(lastAssignment)[JSON.parse(lastAssignment).length-1]);    
  } else {
    res.status(400).json({ message: "No cached assignments found." });
  }
})

// Delete assignment
assignments.delete("/assignments", async (req, res) => {
    const assignments = await redisClient.del("assignments")
    if (assignments) {
    res.status(200).json({message:"Delete Cache Successful!!"});    
  } else {
    res.status(400).json({ message: "No cached assignments found." });
  }
})

export default assignments;
