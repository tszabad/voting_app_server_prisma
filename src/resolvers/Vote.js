function option(parent, args, context) {
    return context.prisma.vote({ id: parent.id }).options()
  }
  
  function user(parent, args, context) {
    return context.prisma.vote({ id: parent.id }).user()
  }
  
  module.exports = {
    option,
    user,
  }