const Recipe = require('./models/Recipe');
const express = require('express');
const app = express();


mongoose.connect('mongodb+srv://gthankgod:8thanky@cluster0-wga0n.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true })
  .then(() => console.log('Successfully connected to Mongodb cloud'))
  .catch(err => console.log(`Could not connect, ${err.message}`));


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//@POST Route - Add a new recipe

app.post('/api/recipes', (req, res, next) => {
  const recipe = new Recipe({
    title: req.body.title,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
    difficulty: req.body.difficulty,
    time: req.body.time

  });
  recipe.save().then(
    () => {
      res.status(201).json({
        mesage: ' Recipe saved Successfully'
      })
    }
  )
    .catch((error) => {
      res.status(400).json({
        error: error
      });
    })
});

//@GET Route - Get a single recipe

app.get('/api/recipes/:id', (req, res, next) => {
  Recipe.findOne({
    _id: req.params.id
  }).then(
    (recipe) => {
      res.status(200).json(recipe);
    }
  )
    .catch(
      (error) => {
        res.status(404).json({
          error: error
        });
      }
    );
});

//@PUT Route - Edit a recipe

app.put('/api/recipes/:id', (req, res, next) => {
  const recipe = new Recipe({
    _id: req.params.id,
    title: req.body.title,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
    difficulty: req.body.difficulty,
    time: req.body.time
  });
  Recipe.updateOne({ _id: req.params.id }, recipe).then(
    () => {
      res.status(201).json({
        message: 'Recipe updated successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
});

//@DELETE Route - Delete a recipe

app.delete('/api/recipes/:id', (req, res, next) => {
  Thing.deleteOne({ _id: req.params.id }).then(
    () => {
      res.status(200).json({
        message: 'Deleted!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
});

//@GET Route - GET All recipes

app.use('/api/recipes', (req, res, next) => {
  Recipe.find().then(
    (recipes) => {
      res.status(200).json(recipes)
    }
  )
    .catch((error) => {
      res.status(400).json({
        error: error
      });
    });
});

module.exports = app;