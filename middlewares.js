

export const checkAuthenticated = (req, res, next) => {
    if (req.session.userId) {
      next(); // L'utilisateur est connecté, continuer la requête
    } else {
      res.status(401).send("Vous devez être connecté pour accéder à cette page");
    }
  };