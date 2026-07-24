import fs from "fs";
import path from "path";

const adminFile = path.join(process.cwd(), "data", "admin.json");

export interface AdminUser {
  username: string;
  password: string;
}

export function getAdmin(): AdminUser {
  if (!fs.existsSync(adminFile)) {
    const defaultAdmin = {
      username: "admin",
      password: "admin123",
    };

    fs.writeFileSync(
      adminFile,
      JSON.stringify(defaultAdmin, null, 2)
    );

    return defaultAdmin;
  }

  return JSON.parse(fs.readFileSync(adminFile, "utf8"));
}

export function saveAdmin(admin: AdminUser) {
  fs.writeFileSync(
    adminFile,
    JSON.stringify(admin, null, 2)
  );
}