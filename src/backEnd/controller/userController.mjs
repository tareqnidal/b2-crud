import {
  UserModel as model
} from '../models/user.mjs'

export const UserController = {}

// Check the login credentials
UserController.login = async (req, res, next) => {
  const user = await model.login(req.body)

  if (user instanceof Error) {
    req.session.flashMessage = user.message
    next()
    return
  }

  const sessionUser = {
    id: user.id,
    name: user.firstName + ' ' + user.lastName,
    username: user.username,
    email: user.email
  }

  req.session.user = sessionUser
  req.session.flashMessage = 'Successfully logged in'
  next()
}

// Register a new user
UserController.register = async (req, res, next) => {
  const user = await model.register(req.body)

  if (user instanceof Error) {
    const errorData = JSON.parse(user.message)
    req.session.flashMessage = errorData.message
    res.status(errorData.status).redirect('/register')
    return
  }

  req.session.flashMessage = 'Successfully registered, You can now login'
  next()
}

// Add a snippet to the user's collection
UserController.addSnippet = async (userId, snippetId) => {
  const adding = await model.addSnippet(userId, snippetId)
  if (adding instanceof Error) {
    return new Error(JSON.stringify({
      status: 500,
      message: 'Internal Server Error'
    }))
  }
}

// Remove a snippet from the user's collection
UserController.removeSnippet = async (userId, snippetId) => {
  const remove = await model.removeSnippet(userId, snippetId)
  if (remove instanceof Error) {
    return remove
  }
}

// Get user details
UserController.getUser = async (id) => {
  try {
    const user = await model.getUser(id)
    return user
  } catch (err) {
    return new Error(JSON.stringify({
      status: 500,
      message: 'Internal Server Error'
    }))
  }
}

// Get the author's name for display purposes
UserController.getAuthorName = async (id) => {
  return await model.getAuthorName(id)
}
