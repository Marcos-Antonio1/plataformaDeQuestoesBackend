class indexController {
    async home(request,response){
      return response.send("api v 0.1")
    }
}

module.exports= indexController;
