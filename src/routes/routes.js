const router = require("express").Router()
const bookController = require("../controllers/bookController")

router.get("/", bookController.getAllBooks)
router.get("/:id",bookController.getBookById)
router.post("/", bookController.addBook)
router.put("/:id", bookController.updateBook)
router.delete("/:id", bookController.deleteBook)
module.exports =router