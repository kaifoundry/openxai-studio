import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

const filePath = path.join(process.cwd(), "utils", "user_details.json")

export async function GET() {
  const users = JSON.parse(fs.readFileSync(filePath, "utf8"))
  return NextResponse.json(users)
}


export async function POST(req: Request) {
    const { address, name, profilePic } = await req.json()
    let users = JSON.parse(fs.readFileSync(filePath, "utf8"))
  
    const existingUser = users.find(
      (u: any) => u.address.toLowerCase() === address.toLowerCase()
    )
  
    if (!existingUser) {
      const newId =
        users.length > 0 ? Math.max(...users.map((u: any) => u.id || 0)) + 1 : 1
  
      const newUser = {
        id: newId,
        address,
        name: name || "Unknown",
        profilePic: profilePic || null,
        firstConnected: new Date().toISOString(),
      }
  
      users.push(newUser)
      fs.writeFileSync(filePath, JSON.stringify(users, null, 2))
  
      return NextResponse.json({
        success: true,
        isNewUser: true,  
        user: newUser,
      })
    }
  
    return NextResponse.json({
      success: true,
      isNewUser: false,   
      user: existingUser,
    })
  }
  


export async function PUT(req: Request) {
  const { address, name, profilePic } = await req.json()
  let users = JSON.parse(fs.readFileSync(filePath, "utf8"))

  const index = users.findIndex(
    (u: any) => u.address.toLowerCase() === address.toLowerCase()
  )

  if (index !== -1) {
    users[index].name = name || users[index].name
    users[index].profilePic = profilePic || users[index].profilePic

    fs.writeFileSync(filePath, JSON.stringify(users, null, 2))

    return NextResponse.json({ success: true, user: users[index] })
  }

  return NextResponse.json({ success: false, message: "User not found" })
}
