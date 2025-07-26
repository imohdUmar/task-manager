// @desc    Test controller
// @route   GET /api/users/
// @access  Public
const testUserRoute = (req, res) => {
  res.send('User controller working...')
}

module.exports = {
  testUserRoute
}
