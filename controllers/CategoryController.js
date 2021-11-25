const Category = require("../models/category");

class CategoryController{

    async create(req, res){
        try {
            const category = await Category.create(req.body);
            res.status(201).json(category);
        } catch (error) {
            res.status(500).json({message: 'Something went wrong.'})
        }
    }

    async list(req, res){
        try {
            const categories = await Category.find();
            res.status(200).json(categories);
        } catch (error) {
            res.status(500).json({message: 'Something went wrong.'})
        }
    }

}

module.exports = CategoryController;