const express=require("express")
const { getAllPersons,createPerson, updatePerson, deletePerson,giveCart,checkout } = require("../controllers/personController.js")
const router=express.Router()


router.route("/persons").get(getAllPersons)
router.route("/persons/new").post(createPerson)
router.route("/persons").put(updatePerson)
router.route("/persons/getcart").get(giveCart)

router.route("/persons/checkout").put(checkout)


module.exports=router