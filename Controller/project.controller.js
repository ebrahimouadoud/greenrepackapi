const db = require('../models')
const ProjetAssociative = db.projetassociative;
const Association = db.association;


// POST >> Create Project (Association)
exports.createProject = (req, res) => {
  db.association.findOne(
    { Where: { userId: req.userId } }
  ).then(asso => {
    ProjetAssociative.create({
      name: req.body.name,
      description: req.body.description,
      dateCreation: req.body.dateCreation,
      debutPrevu: req.body.debutPrevu,
      finPrevu: req.body.finPrevu,
      budgetAttendu: req.body.budgetAttendu,
      associationId: asso.id,

    }).then((result) => {
      return res.status(200).json({
        "result": result,
      })
    }).catch((error) => {
      return res.status(500).json({ error: error.message })
    });
  })

}


// GET >> Get All Project (Association)
exports.allProjects = (req, res) => {
  ProjetAssociative.findAll({
    include: {
      model: Association,
      attributes: ['name']
    }
  })
    .then(projects => {
      res.status(200).send({
        "Projects": projects
      });
    })
    .catch(err => {
      return res.status(400).send({ message: err.message });
    });
}

// GET >> Count Waiting Project (Association)
exports.pendingProjectsCount = (req, res) => {
  ProjetAssociative.findAndCountAll({
    where: { status: 'En Attendant' },
    include: {
      model: Association,
      attributes: ['name']
    }
  })
    .then(projects => {
      res.status(200).send({
        "Pending Projects": projects.count
      });
    })
    .catch(err => {
      return res.status(400).send({ message: err.message });
    });
}

exports.pendingProjects = (req, res) => {
  ProjetAssociative.findAndCountAll({
    where: { status: 'En Attendant' },
    include: {
      model: Association,
      attributes: ['name']
    }
  })
    .then(projects => {
      res.status(200).send({
        "Pending Projects": projects
      });
    })
    .catch(err => {
      return res.status(400).send({ message: err.message });
    });
}

exports.validatedProjects = (req, res) => {
  ProjetAssociative.findAndCountAll({
    where: { status: 'Validé' },
    include: {
      model: Association,
      attributes: ['name']
    }
  })
    .then(projects => {
      res.status(200).send({
        "Pending Projects": projects
      });
    })
    .catch(err => {
      return res.status(400).send({ message: err.message });
    });
}


// PUT >> Refuse Project (Association)
exports.refuseProject = (req, res) => {
  ProjetAssociative.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((result) => {
      if (!result) {
        return res.status(404).send({ message: 'Project Not Found.' })
      }
      if (result.status == 'Refusé' || result.status == 'Validé') {
        return res.status(500).send({
          message: 'Project Has Already been Refused/Validated',
        })


      } else {
        result.status = 'Refusé'
        result.save();
        return res.status(200).send({
          message: 'project Was Refused Successfully',
        })
      }
      next();
    })
    .catch((err) => {
      return res.status(400).send({ message: err.message })
    })
}



// PUT >> Validate Project (Association)
exports.validateProject = (req, res) => {
  ProjetAssociative.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((result) => {
      if (!result) {
        return res.status(404).send({ message: 'Project Not Found.' })
      }
      if (result.status == 'Refusé' || result.status == 'Validé') {
        return res.status(500).send({
          message: 'Project Has Already been Refused/Validated',
        })


      } else if (result.status !== 'Validé') {
        result.status = 'Validé'
        result.save();
        return res.status(200).send({
          message: 'Project Was Validate Successfully',
        })
      }
      next();
    })
    .catch((err) => {
      return res.status(400).send({ message: err.message })
    })
}


// PUT >> Update Project (Association)
exports.updateProject = (req, res) => {
  ProjetAssociative.findOne({
    where: { id: req.params.id },
  })
    .then((Project) => {
      Project.update({
        name: req.body.name,
        description: req.body.description,
        dateCreation: req.body.dateCreation,
        debutPrevu: req.body.debutPrevu,
        finPrevu: req.body.finPrevu,
        budgetAttendu: req.body.budgetAttendu,
        associationId: req.body.associationId,
      }).then((result) => {
        return res.status(200).json({
          message: "Project Updated Successfully",
          "Project": result,
        })
      }).catch((error) => {
        return res.status(500).json({ error: error.message })
      });
    }).catch((err) => {
      return res.status(404).send({ message: "Project Not found." });
    });

}



// PUT >> Donate Project (Association)
exports.donateProject = (req, res) => {
}