import Actors from '../models/actors'
import { Request, Response } from 'express'



export const createActor = async (req : Request, res: Response) => {
    console.log("this CREATE REQUEST is coming from this person: ", req.currentUser)

    // ! in order to create a movie, the schema requires a "user" field
    // ! and thus we must pull that out of the req.currentUser variable (which
    // !    is populated by the jwt validation code)
    req.body.user = req.currentUser._id;
    const actor = await Actors.create(req.body)
    res.send(actor)
}

export const getActors = async (req : Request, res: Response) => {
    const actors = await Actors.find().populate('movies');
    res.send(actors)
  }

