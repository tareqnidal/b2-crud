export const sessionHandler = {}

sessionHandler.home = (req, res) => {
  // check if there is an error message in previous operations
  const flashMessage = req.session.flashMessage ?? null
  const user = req.session.user ?? null
  req.session.flashMessage = null
  res.render('home', {
    user,
    flashMessage
  })
}

sessionHandler.login = (req, res) => {
  // check if user is already logged in
  const user = req.session.user ?? null
  if (user) {
    req.session.flashMessage = 'You are already logged in'
    res.redirect('/home')
  }

  const flashMessage = req.session.flashMessage ?? null
  req.session.flashMessage = null

  res.render('login', {
    flashMessage,
    user
  })
}

sessionHandler.register = (req, res) => {
  const flashMessage = req.session.flashMessage ?? null
  const user = req.session.user ?? null
  req.session.flashMessage = null

  res.render('register', {
    flashMessage,
    user,
    info: null
  })
}

sessionHandler.logout = (req, res, next) => {
  req.session.flashMessage = null
  req.session.user = null
  req.session.snippets = null
  const flashMessage = 'You have been logged out'

  res.render('home', {
    flashMessage,
    user: null
  })
}

sessionHandler.snippets = (req, res) => {
  const flashMessage = req.session.flashMessage ?? null
  const user = req.session.user ?? null
  req.session.flashMessage = null
  const snippets = req.session.snippets ?? null
  req.session.snippets = null
  res.render('snippet', {
    snippets,
    user,
    flashMessage
  })
}

sessionHandler.createSnippet = (req, res) => {
  const flashMessage = req.session.flashMessage ?? null
  const user = req.session.user ?? null
  const snippets = req.session.snippets ?? null
  req.session.flashMessage = null
  req.session.snippets = null
  res.render('createSnippet', {
    snippets,
    user,
    flashMessage,
    isPublic: true
  })
}

sessionHandler.else = (req, res) => {
  const flashMessage = req.session.flashMessage ?? null
  const user = req.session.user ?? null
  req.session.flashMessage = null
  res.status(404).render('error', {
    url: req.url,
    user,
    flashMessage
  })
}
