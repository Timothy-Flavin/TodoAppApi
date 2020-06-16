'use strict'

const mongoose = require('mongoose')
const Task = require('../models/Task')
exports.plugin = {
    register: (server, options) =>{
        
        server.route({
            method: 'GET',
            path:'/todoLists',
            handler: (req, h) =>{
                return Task.find((err,res)=>{
                    if(err){
                        return err
                    }
                    return res 
                })
            }
        })

        server.route({
            method:'GET',
            path:'/todoLists/{id}',
            handler: (req, h) =>{
                return Task.findOne({
                    _id: mongoose.Types.ObjectId(req.params.id)
                },(err,doc) =>{
                    if(err){
                        return err, 'internal MongoDB error'
                    }
                    if(!doc){
                        return 'Not Found'
                    }
                    return doc
                })
            }
        })

        server.route({
            method:'POST',
            path:'/todoLists',
            handler: (req, h) =>{
                var todoList = new Task()
                todoList.todo_list_name = req.payload.todo_list_name
                todoList.tasks = req.payload.tasks
                todoList.tags = req.payload.tags

                return todoList.save().then((err, res) => {
                    if(err){
                        return err
                    }
                    return res
                })
            }
        })

        server.route({
            method:'PUT',
            path:'/todoList/{id}',
            handler: (req, h) =>{
                return Task.findOneAndUpdate(
                    {_id: mongoose.Types.ObjectId(req.params.id)},
                    {todo_list_name: req.payload.todo_list_name,
                    tags: req.payload.tags,
                    tasks: req.payload.tasks},
                    (err,result) =>{
                        if(err){
                            return err, "Internal MongoDB error"
                        }
                        if(result && result.n ===0){
                            return 'Not Found'
                        }
                        return 204
                    }
                )
            }
        })


        server.route({
            method:'DELETE',
            path:'/todoList/{id}',
            handler: (req, h) =>{
                return Task.deleteOne(
                    {_id: mongoose.Types.ObjectId(req.params.id)},
                    (err,result) =>{
                        if(err){
                            return err, "Internal MongoDB error"
                        }
                        if(result.n ===0){
                            return 'Not Found'
                        }
                        return 204
                    }
                )
            }
        })
//###################################################################################
        server.route({
            method:'GET',
            path:'/tasks',
            handler: (req, h) =>{
                return Task.find((err,res) =>{
                    if(err){
                        return err
                    }
                    return res
                })
            }
        })


        server.route({
            method:'GET',
            path:'/task/{id}',
            handler: (req, h) =>{
                return Task.findOne({
                    _id: mongoose.Types.ObjectId(req.params.id)
                },(err,doc) =>{
                    if(err){
                        return err, 'internal MongoDB error'
                    }
                    if(!doc){
                        return 'Not Found'
                    }
                    return doc
                })
            }
        })


        server.route({
            method:'POST',
            path:'/task',
            handler: (req, h) =>{
                var task = new Task()
                task.task_name = req.payload.task_name

                return task.save().then((err, res) => {
                    if(err){
                        return err
                    }
                    return res
                })
            }
        })

        server.route({
            method:'PUT',
            path:'/task/{id}',
            handler: (req, h) =>{
                return Task.findOneAndUpdate(
                    {_id: mongoose.Types.ObjectId(req.params.id)},
                    {task_name: req.payload.task_name},
                    (err,result) =>{
                        if(err){
                            return err, "Internal MongoDB error"
                        }
                        if(result && result.n ===0){
                            return 'Not Found'
                        }
                        return 204
                    }
                )
            }
        })


        server.route({
            method:'DELETE',
            path:'/task/{id}',
            handler: (req, h) =>{
                return Task.deleteOne(
                    {_id: mongoose.Types.ObjectId(req.params.id)},
                    (err,result) =>{
                        if(err){
                            return err, "Internal MongoDB error"
                        }
                        if(result.n ===0){
                            return 'Not Found'
                        }
                        return 204
                    }
                )
            }
        })
    },
    name: 'api'
}