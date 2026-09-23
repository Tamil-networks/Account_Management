const db = require("../config/database");

const updateTick = async (req, res) => {
    try {
        const {
            Name1,
            Name2,
            Village,
            Tick,
            secretCode
        } = req.body;

        // Check required fields
        if (
            !Name1 ||
            !Name2 ||
            !Village ||
            !Tick ||
            !secretCode
        ) {
            return res.status(400).json({
                success: false,
                message: "Required information is missing"
            });
        }

        // Validate Tick value
        if (Tick !== "Yes" && Tick !== "No") {
            return res.status(400).json({
                success: false,
                message: "Tick must be Yes or No"
            });
        }

        // Verify secret code
        if (secretCode !== process.env.TICK_UPDATE_SECRET) {
            return res.status(401).json({
                success: false,
                message: "Invalid secret code"
            });
        }

        // Update the matching account
        const [result] = await db.query(
            `
            UPDATE moi_account
            SET Tick = ?
            WHERE Name1 = ?
              AND Name2 = ?
              AND Village = ?
            `,
            [
                Tick,
                Name1,
                Name2,
                Village
            ]
        );

        // No matching account
        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Account not found"
            });
        }

        return res.json({
            success: true,
            message: "Tick updated successfully",
            Tick
        });

    } catch (error) {
        console.error("Tick update error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to update Tick"
        });
    }
};

module.exports = {
    updateTick
};