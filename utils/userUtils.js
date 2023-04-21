import {UserModel} from "../Models/User.js"
import argon2 from "argon2";



export async function checkIfEmailIsUsed(emailToCheck) {
    const user = await UserModel.findOne({ email: emailToCheck });
    if (user !== null) {
      throw new Error("Cette adresse mail est déjà utilisée");
    }
  }
  
  export async function registerUser(userData,hashedPassword) {
    const { firstName, lastName, email} = userData;
    // TODO : encodage du mot de passe
    await UserModel.create({ firstName, lastName, email, password: hashedPassword });
  }
  
  export async function encodePassword(req) {
  
  
  
    if (req.password !== req.password_confirm) {
      throw new Error("Les mots de passe ne correspondent pas");
    }
  
    // Hash the password using Argon2i
    const hashedPassword = await argon2.hash(req.password, {
      type: argon2.argon2i
    });
  
  
    console.log(hashedPassword)
    return hashedPassword
  
  }



export async function getHashedPassword(email) {
  const user = await UserModel.findOne({ email: email});
  return { hashedPassword: user.password, id: user.id };
}

export async function verifyPassword(password, hash) {
  try {
    return await argon2.verify(hash, password);
  } catch (err) {
    console.error("Erreur lors de la vérification du mot de passe :", err);
    return false;
  }
}


export async function checkIfEveryInputIs(req) {

    for (const input in req) {
      if (!req[input] || req[input].trim() === '') {
        throw new Error(`La propriété "${input}" est manquante ou vide.`);
      }
    }
  }
