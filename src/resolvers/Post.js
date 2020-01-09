function postedBy(parent, args, context) {
    return context.prisma.post({ id: parent.id }).postedBy()
  }
  function options(parent, args, context) {
    return context.prisma.options({ id: parent.id }).options()
  }
  

  
  module.exports = {
    postedBy,
    options,
   
    
  }