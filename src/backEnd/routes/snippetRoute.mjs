import express from 'express'
import {
  SnippetController
} from '../controller/snippetController.mjs'
import {
  validator
} from '../middlewares/validator.mjs'
import {
  sessionHandler
} from '../middlewares/actionHandler.mjs'

const snippetRouter = express.Router()

snippetRouter.get('/', SnippetController.findAll, sessionHandler.snippets)

snippetRouter.get('/create', validator.isLoggedIn, sessionHandler.createSnippet)

snippetRouter.get('/:id', validator.validateId, SnippetController.findOne, validator.validateIsPublic, sessionHandler.snippets)

snippetRouter.post('/create', validator.isLoggedIn, validator.createSnippet, SnippetController.create)

snippetRouter.delete('/:id/delete', validator.isLoggedIn, validator.validateId, SnippetController.findOne, validator.validateIsPublic, validator.validateUserSnippet, SnippetController.delete)

snippetRouter.get('/:id/update', validator.isLoggedIn, validator.validateId, SnippetController.findOne, validator.validateIsPublic, validator.validateUserSnippet, sessionHandler.createSnippet)

snippetRouter.put('/:id/update', validator.isLoggedIn, validator.validateId, validator.createSnippet, SnippetController.edit)

// Catch-all route for undefined paths
snippetRouter.get('*', sessionHandler.else)

export default snippetRouter
