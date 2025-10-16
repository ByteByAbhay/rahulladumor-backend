const AdditionalInfo = require("../models/AdditionalInfo");

/**
 * @swagger
 * /api/additional-info:
 *   get:
 *     summary: Get additional information
 *     tags: [Additional Info]
 *     responses:
 *       200:
 *         description: Additional information retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AdditionalInfo'
 *       404:
 *         description: Additional information not found
 */
const getAdditionalInfo = async (req, res) => {
  try {
    const additionalInfo = await AdditionalInfo.findOne();
    
    if (!additionalInfo) {
      return res.status(404).json({
        status: "error",
        message: "Additional information not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: additionalInfo,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to retrieve additional information",
      error: error.message,
    });
  }
};

/**
 * @swagger
 * /api/additional-info:
 *   post:
 *     summary: Create additional information
 *     tags: [Additional Info]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AdditionalInfo'
 *     responses:
 *       201:
 *         description: Additional information created successfully
 *       400:
 *         description: Validation error
 */
const createAdditionalInfo = async (req, res) => {
  try {
    // Check if additional info already exists (should be only one record)
    const existingInfo = await AdditionalInfo.findOne();
    if (existingInfo) {
      return res.status(400).json({
        status: "error",
        message: "Additional information already exists. Use PUT to update.",
      });
    }

    const additionalInfo = new AdditionalInfo(req.body);
    const savedInfo = await additionalInfo.save();

    res.status(201).json({
      status: "success",
      message: "Additional information created successfully",
      data: savedInfo,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to create additional information",
      error: error.message,
    });
  }
};

/**
 * @swagger
 * /api/additional-info/{id}:
 *   put:
 *     summary: Update additional information
 *     tags: [Additional Info]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AdditionalInfo'
 *     responses:
 *       200:
 *         description: Additional information updated successfully
 *       404:
 *         description: Additional information not found
 */
const updateAdditionalInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedInfo = await AdditionalInfo.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedInfo) {
      return res.status(404).json({
        status: "error",
        message: "Additional information not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Additional information updated successfully",
      data: updatedInfo,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to update additional information",
      error: error.message,
    });
  }
};

/**
 * @swagger
 * /api/additional-info/{id}:
 *   delete:
 *     summary: Delete additional information
 *     tags: [Additional Info]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Additional information deleted successfully
 *       404:
 *         description: Additional information not found
 */
const deleteAdditionalInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedInfo = await AdditionalInfo.findByIdAndDelete(id);

    if (!deletedInfo) {
      return res.status(404).json({
        status: "error",
        message: "Additional information not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Additional information deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to delete additional information",
      error: error.message,
    });
  }
};

module.exports = {
  getAdditionalInfo,
  createAdditionalInfo,
  updateAdditionalInfo,
  deleteAdditionalInfo,
};
