let Express = require("express");
let router = Express.Router();
let validateJWT = require("../middleware/validate-jwt");

const { LogModel } = require("../models");

router.get('/practice', validateJWT, (req, res) => {
    res.send('Hey!! This is a practice route!')
});
/*
====================
  Log Create
====================
*/
router.post("/log", validateJWT, async (req, res) => {
    const { description, definition, result } = req.body.log;
    const { id } = req.user;
    const logEntry = {
        description,
        definition,
        result,
        owner_id: id
    }
    try {
        const newLog = await LogModel.create(logEntry);
        res.status(200).json(logEntry);
    } catch (err) {
        res.statuis (500).json({ error: err});
    }
    LogModel.create(logEntry)
});
/*
===================================
   Get all of an individual's Logs
===================================
*/
router.get("/log", async (req, res) => {
    try {
        const entries = await LogModel.findAll({
            where: {
                owner: id
            }
        });
        res.status(200).json(entries);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

/*
==================================================
   Get log by id for individual user
==================================================
*/
router.get("log/:id", validateJWT, async (req, res) => {
    const { id } = req.user;
    try {
        const userLogs = await LogModel.findAll({
            where: {
                owner: id
            }
        });
        res.status(200).json(userLogs);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});


/*
======================
   Update a log
======================
*/
router.put("/log/:id", validateJWT, async (req, res) => {
    const { description, definition, result, owner_id } = req.body.log;
    const logId = req.params.id;
    const userId = req.user.id;

    const query = {
        where: {
            id: logId,
            owner: userId
        }
    };
    const updatedLog = {
       description : description,
       definition: definition,
       result: result, 
       owner_id: owner_id
    };
    try {
        const update = await LogModel.update(updatedLog, query);
        res.status(200).json(update);
    } catch (err) {
        res.status (500).json({ error: err});
    }
});

/*
======================
   Delete a Journal
======================
*/
router.delete("/log/:id", validateJWT, async (req, res) => {
    const ownerId = req.user.id;
    const logId = req.params.id;

    try{
        const query = {
            where: {
                id: logId,
                owner: ownerId
            }
        };

        await LogModel.destroy(query);
        res.status(200).json({ message: "Log Entry Removed" });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});
module.exports = router;