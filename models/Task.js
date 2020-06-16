const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TodoListSchema = new Schema({
    
    todo_list_name: {
        type: String
    }, 
    tasks: [
        String
    ], 
    tags: [
        String
    ]
      
})

module.exports = User = mongoose.model('todoLists', TodoListSchema)
