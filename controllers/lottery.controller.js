const Lottery = require("../models/lottery.model");
const Slot = require("../models/slot.model");
const SlotDateMap = require("../models/slotDateMap.model");
const Result = require("../models/result.model");
const { Op } = require("sequelize");
const moment = require('moment-timezone');
module.exports = class LotteryController {

    async getLotteryNumber(req, res, next) {
        try {
            let data = await Slot.findAll({
                include: [{
                    required: true,
                    model: SlotDateMap,
                    include: [{
                        required: true,
                        model: Lottery,
                        order:'id DESC',
                        where: {
                            mobileNo: req.query.mobileNo
                        },
                    }]
                }]
            })
            return res.createResponse(true, data, "fetch successfully.", 200);
        }
        catch (err) {
            return res.createResponse(false, err, err.message, 500);
        }
    }
    async addLotteryNumber(req, res, next) {
        let body = req.body;
        let now = moment(new Date());
        now.tz("Asia/Kolkata");
        let hours = now.hours()
        try {
            let id;
            let slotCheck = await Slot.findAll({
                where: {
                    [Op.or]: [
                        { from: hours },
                        { to: hours }
                    ]
                }
            });
            if (slotCheck.length) {
                let slot;
                if (now.minutes() >= 0 || now.seconds() >= 0) {
                    slot = await Slot.findOne({ where: { from: hours } })
                }
                else {
                    slot = await Slot.findOne({ where: { to: hours } })
                }
                let slotMap = await SlotDateMap.findOne({
                    where: {
                        slotId: {
                            [Op.eq]: slot.id
                        }
                    }, date: {
                        [Op.eq]: now
                    }
                })
                const lottery = await Lottery.create({ mobileNo: body.mobileNo, number: body.number, slotDateMapId: slotMap.id });
                return res.createResponse(true, { slot: `${slot.from}-${slot.to}`, date: now }, `Your Ticket has placed in ${slot.from}-${slot.to} slot.`, 200);
            }
            else {
                let slot = await Slot.findOne({
                    where: {
                        from: { [Op.lt]: hours },
                        to: { [Op.gt]: hours },
                    }
                });
                if(!slot)
                {
                    return res.createResponse(false, {}, "No active slot is available", 500);
                }
                let slotMap = await SlotDateMap.findOne({
                    where: {
                        slotId: {
                            [Op.eq]: slot.id
                        }
                    }, date: {
                        [Op.eq]: now
                    }
                })
                const lottery = await Lottery.create({ mobileNo: body.mobileNo, number: body.number, slotDateMapId: slotMap.id });
                return res.createResponse(true, { slot: `${slot.from}-${slot.to}`, date: now }, `Your Ticket has placed in ${slot.from}-${slot.to} slot.`, 200);
            }
        }
        catch (err) {
            return res.createResponse(false, err, err.message, 500);
        }
    }

    async displayResult(req, res, next) {
        let body = req.body;
        try {
            let result = await Result.findOne({
                where: {
                    slotDateMapId: {
                        [Op.eq]: body.slotDateMapId
                    }
                }
            })
            if (!result) {
                return res.createResponse(true, {}, `Sorry result is not yet displayed`, 500)
            }
            if (result.lotteryId == body.id) {
                return res.createResponse(true, result, "Congratulations your are the winner.", 500)
            }
            else {
                let lottery = await Lottery.findByPk(result.lotteryId)
                return res.createResponse(true, result, `Winner for this slot is ${lottery.number}.`, 500)
            }
        }
        catch (err) {
            return res.createResponse(false, err, err.message, 500)
        }
    }

    async setResult(req, res, next) {
        let body = req.body;
        try {
            let result = await Lottery.findAll({
                where: {
                    slotDateMapId: {
                        [Op.eq]: body.slotDateMapId
                    }
                }
            })
            let winner = result[Math.floor(Math.random() * result.length)];
            const lotteryResult = await Result.create({ slotDateMapId: winner.slotDateMapId, lotteryId: winner.lotteryId });
            return res.createResponse(true, result, `Winner for this slot is ${winner.number}.`, 500)

        }
        catch (err) {
            return res.createResponse(false, err, err.message, 500)
        }
    }
}