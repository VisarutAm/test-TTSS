//------create a new area-----//
/**
 * @openapi
 * /api/areas:
 *   post:
 *     summary: Use to create a new area
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               area_id:
 *                 type: string
 *               urgencylevel:
 *                 type: integer
 *               requiredresources:
 *                 type: object
 *               timeconstraint:
 *                 type: integer
 *
 *     responses:
 *       '200':
 *         description: Add Area Successful.
 *       '400':
 *         description: "Bad Request: Missing or Invalid request data."
 *       '500':
 *         description: Add Area failed.
 */

//------create a new truck-----//
/**
 * @openapi
 * /api/trucks:
 *   post:
 *     summary: Use to create a new truck
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               truck_id:
 *                 type: string
 *               availableresources:
 *                 type: object
 *               traveltimetoarea:
 *                 type: object
 *              
 *
 *     responses:
 *       '200':
 *         description: Add Trucks Data Successful.
 *       '400':
 *         description: "Bad Request: Missing or Invalid request data."
 *       '500':
 *         description: Add Trucks Data failed.
 */

//------Assignments-----//
/**
 * @openapi
 * /api/assignments:
 *   post:
 *     summary: Use to create a new assignment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               area_id:
 *                 type: string
 *               resources_delivered:
 *                 type: object             
 *              
 *
 *     responses:
 *       '200':
 *         description: Cache Created.
 *       '201':
 *         description: Assignment Created.
 *       '400':
 *         description: "Bad Request: Missing or Invalid request data."
 *       '405':
 *         description: RequiredResources cannot be delivered
 *       '406':
 *         description: Time constraint issue
 *       '500':
 *         description: Add Trucks Data failed.
 */

//----Get last assignment----//
/**
 * @swagger
 * /api/assignments:
 *   get:
 *     description: Use to request last assignment
 *     responses:
 *       '200':
 *         description: 
 *       '400':
 *         description: No cached assignments found.
 */

//----Delete cache----//
/**
 * @swagger
 * /api/assignments:
 *   delete:
 *     description: Use to dalete cache assignment
 *     responses:
 *       '200':
 *         description: Delete Cache Successful!!
 *       '400':
 *         description: No cached assignments found.
 */
