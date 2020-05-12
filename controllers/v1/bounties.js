// Create router and reference the models
let db = require('../../models')
let router = require('express').Router()

// GET /v1/bounties - Retrieve all bounties in the DB
router.get('/',(req,res)=>{
    db.Bounty.find()
    .then(Bounties=>{
        res.send(Bounties)
    })
    .catch(err=>{
        console.log('ERROR in index route', err)
        res.status(500).send({message: 'Oops?'})
    })
})

// POST /v1/bounties - Create a new bounty
router.post('/',(req,res)=>{
    db.Bounty.create(req.body)
    .then(newBounty=>{
        res.status(201).send(newBounty)
    })
    .catch(err=>{
        console.log('ERROR in post route', err)
        if(err.name == "ValidationError"){
            res.status(406).send({message: 'Validation error'})
        }
        else
            res.status(503).send({message: 'Server or database error'})
        
      
    })
})

// PUT /v1/bounties - Bulk update bounties
router.put('/',(req,res)=>{
  /*   db.Bounty.updateMany({},{"captured": false})
    .then(bounties=>{
        res.status(201).send(bounties)
    })
    .catch(err=>{
        console.log('ERROR in bulk update route', err)
        res.status(500).send({message: 'Oops?'})
    }) */
    db.Bounty.updateMany({}, req.body)
    .then(bounties=>{
        res.status(201).send(bounties)
    })
    .catch(err=>{
        console.log('ERROR in bulk update route', err)
        res.status(500).send({message: 'Oops?'})
    })
})

// GET /v1/bounties/:id - Retrieve a single bounty by its id
router.get('/:id',(req,res)=>{
    db.Bounty.findById(req.params.id)
    .then(bounty=>{
        res.send(bounty)
    })
    .catch(err=>{
        console.log('ERROR in index id route', err)
        res.status(500).send({message: 'Oops?'})
    })
})

// DELETE /v1/bounties - Delete ALL bounties
router.delete('/',(req,res)=>{
    db.Bounty.deleteMany({"wantedFor" : "test1"})
    .then(bounty=>{
        res.status(201).send(bounty)
    })
    .catch(err=>{
        console.log('ERROR in delete all route', err)
        res.status(500).send({message: 'Oops?'})
    })
})

// PUT /v1/bounties/:id - Update a single bounty
router.put('/:id',(req,res)=>{
    // finByIdAndUpdate method when new set to true will give the new updated bounty document
    db.Bounty.findByIdAndUpdate({_id: req.params.id},{"reward": 9099, "captured": false}, {new:true})
    .then(bounty=>{
        res.status(201).send(bounty)
    })
    .catch(err=>{
        console.log('ERROR in update/put id route', err)
        res.status(500).send({message: 'Oops?'})
    })

    /* db.Bounty.update({_id: req.params.id},{"reward": 9000, "captured": false}, {new:true})
    .then(bounty=>{
        res.status(201).send(bounty)
    })
    .catch(err=>{
        console.log('ERROR in delete id route', err)
        res.status(500).send({message: 'Oops?'})
    }) */
})




// DELETE /v1/bounties/:id - Delete a single bounty
    router.delete('/:id',(req,res)=>{
        db.Bounty.deleteOne({_id: req.params.id}) // can also work with findByIdAndDelete
        .then(bounty=>{
            res.status(201).send(bounty)
        })
        .catch(err=>{
            console.log('ERROR in delete id route', err)
            res.status(500).send({message: 'Oops?'})
        })

    })

// Export the router object and the routes attached to it
module.exports = router
