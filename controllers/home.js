
  import { checkIfEmailIsUsed, registerUser, encodePassword,verifyPassword,getHashedPassword,checkIfEveryInputIs } from "../utils/userUtils.js";
  import {UserModel} from "../Models/User.js"
 

/*************************GET*********************************** */

export function home(req, res) {
  res.render("home");
}


export function connexion(req, res) {
  res.render("connexion");
}

export function dashboard(req, res) {
  res.render("dashboard");
}



/*************************POST*********************************** */

export async function formTreatement(req, res) {
  const emailToCheck = req.body.email;
  try {
    await checkIfEveryInputIs(req.body);
    await checkIfEmailIsUsed(emailToCheck);
  let hashedPassword =  await encodePassword(req.body)
    await registerUser(req.body,hashedPassword);
    req.flash('success', 'Inscription réussie !'); 
    res.redirect("/connexion");
  } catch (err) {
    console.log(err);
    req.flash('error', err.message); // Message flash d'erreur
    res.redirect("back");
  }
}

export async function connexionFormTreatement(req, res) {


  const email = req.body.email;
  const password = req.body.password;

  try {
    const { hashedPassword, id: userId } = await getHashedPassword(email);
    const passwordIsValid = await verifyPassword(password, hashedPassword);

    if (passwordIsValid) {
      req.session.userId= userId
      req.flash('success', 'Connexion réussie !'); 
      res.redirect("/dasboard")
    } else {
      req.flash('error', "Mot de passe incorrect"); // Message flash d'erreur
      res.redirect("back");
    }
  } catch (err) {
    console.error("Erreur lors de la connexion :", err);
    res.status(500).send("Une erreur s'est produite lors de la connexion");
  }
}

