function votedBy(parent, args, context) {
    return context.prisma.user({ id: parent.id }).votedBy()
  }
  
  function votes(parent, args, context) {
    return context.prisma.option({ id: parent.id }).votes()
  }
  
  
  
  module.exports = {
    votedBy,
    votes,
 
    
  }