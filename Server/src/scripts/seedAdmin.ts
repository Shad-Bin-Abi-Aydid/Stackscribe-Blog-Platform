import { prisma } from "../lib/prisma";
import { UserRole } from "../middlewares/auth";

async function seedAdmin() {
  try {
    // we create admin data, better to keep them into the .env file
    const adminData = {
      name: "Admin2",
      email: "admin2@admin.com",
      role: UserRole.ADMIN,
      password: "admin12345",
    };

    // check the user(admin) already exist in the database or not
    const existingUser = await prisma.user.findUnique({
      where: {
        email: adminData.email,
      },
    });
    if (existingUser) {
      throw new Error("User already exist");
    }

    // if it's not exits in db then we do the signUP for the admin
    const signUpAdmin = await fetch(
      "http://localhost:5000/api/auth/sign-up/email",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          origin: "http://localhost:4000",
        },
        body: JSON.stringify(adminData),
      },
    );

    // When create the admin it's emailVerification is false by default
    // but we need to do that true otherwise admin can't login.
    // so we update the emailVerification when it's create but only do that if the admin is create
    // so when signUpAdmin.ok is true it's mean the admin is create

    if (signUpAdmin.ok) {
      await prisma.user.update({
        where: {
          email: adminData.email,
        },
        data: {
          emailVerified: true,
        },
      });
    }

    console.log("SignAdmin info =>", signUpAdmin);
  } catch (error: any) {
    console.error(error);
  }
}

seedAdmin();
