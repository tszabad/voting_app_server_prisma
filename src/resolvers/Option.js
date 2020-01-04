function votedBy(parent, args, context) {
    return context.prisma.user({ id: parent.id }).votedBy()
  }
  
  function votes(parent, args, context) {
    return context.prisma.option({ id: parent.id }).votes()
  }

  function postOption(parent, args, context) {
    return context.prisma.option({ id: parent.id }).postOption()
  }
  
  module.exports = {
    votedBy,
    votes,
    postOption,
  }