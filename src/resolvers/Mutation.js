const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { APP_SECRET, getUserId } = require('../utils')

function post(parent, args, context, info) {
  const userId = getUserId(context)
  return context.prisma.createPost({
    description: args.description,
    postedBy: { connect: { id: userId } },
  })
}

function option(parent, args, context, info) {
  
  return context.prisma.createOption({
    answer: args.answer,
    post: { connect: { id: post.id } },
 
  })
}

async function signup(parent, args, context, info) {
  const password = await bcrypt.hash(args.password, 10)
  const user = await context.prisma.createUser({ ...args, password })

  const token = jwt.sign({ userId: user.id }, APP_SECRET)

  return {
    token,
    user,
  }
}

async function login(parent, args, context, info) {
  const user = await context.prisma.user({ email: args.email })
  if (!user) {
    throw new Error('No such user found')
  }

  const valid = await bcrypt.compare(args.password, user.password)
  if (!valid) {
    throw new Error('Invalid password')
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET)

  return {
    token,
    user,
  }
}

async function vote(parent, args, context, info) {
  const userId = getUserId(context)
  const optionExists = await context.prisma.$exists.vote({
    user: { id: userId },
    option: { id: args.optionId },
  })
  if (optionExists) {
    throw new Error(`Already voted for Option: ${args.optionId}`)
  }

  return context.prisma.createVote({
    user: { connect: { id: userId } },
    option: { connect: { id: args.optionId } },
  })
}

module.exports = {
  post,
  signup,
  login,
  option,
  vote,
}