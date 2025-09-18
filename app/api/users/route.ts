import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import multer from "multer";
import { promisify } from "util";


const filePath = path.join(process.cwd(), "utils", "user_details.json");
const uploadDir = path.join(process.cwd(), "public/uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}


const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname.replace(/\s+/g, "_");
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });
const uploadMiddleware = upload.single("profilePic");


const runMiddleware = promisify(uploadMiddleware as any);

// ---------- GET ----------
export async function GET() {
  const users = JSON.parse(fs.readFileSync(filePath, "utf8"));
  return NextResponse.json(users);
}

// ---------- POST ----------
export async function POST(req: Request) {
  const { address, name, profilePic } = await req.json();
  let users = JSON.parse(fs.readFileSync(filePath, "utf8"));

  const existingUser = users.find(
    (u: any) => u.address.toLowerCase() === address.toLowerCase()
  );

  if (!existingUser) {
    const newId =
      users.length > 0 ? Math.max(...users.map((u: any) => u.id || 0)) + 1 : 1;

    const newUser = {
      id: newId,
      address,
      name: name || "Unknown",
      profilePic: profilePic || null,
      firstConnected: new Date().toISOString(),
    };

    users.push(newUser);
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

    return NextResponse.json({
      success: true,
      isNewUser: true,
      user: newUser,
    });
  }

  return NextResponse.json({
    success: true,
    isNewUser: false,
    user: existingUser,
  });
}

// ---------- PUT (with multer for image upload) ----------
export async function PUT(req: Request) {
  try {
    const formData = await req.formData();
    const address = formData.get("address") as string;
    const name = formData.get("name") as string;
    const file = formData.get("profilePic") as File | null;

    let users = JSON.parse(fs.readFileSync(filePath, "utf8"));

    const index = users.findIndex(
      (u: any) => u.address.toLowerCase() === address.toLowerCase()
    );

    if (index === -1) {
      return NextResponse.json({ success: false, message: "User not found" });
    }

    // update fields
    users[index].name = name || users[index].name;

    if (file) {
      const bytes = Buffer.from(await file.arrayBuffer());
      const fileName = Date.now() + "-" + file.name.replace(/\s+/g, "_");
      const filePathOnDisk = path.join(uploadDir, fileName);

      fs.writeFileSync(filePathOnDisk, bytes);

      users[index].profilePic = `/uploads/${fileName}`;
    }

    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

    return NextResponse.json({ success: true, user: users[index] });
  } catch (error) {
    console.error("PUT Error:", error);
    return NextResponse.json({ success: false, error: "Error updating user" });
  }
}

