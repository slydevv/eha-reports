import { NextRequest, NextResponse } from "next/server";
const bcrypt = require("bcrypt");
import prisma from "@/app/lib/prisma";

export async function PUT(req: NextRequest) {
  try {
    const { password } = await req.json();
      const id = req.url.split("changepassword/")[1];
      
      const hashed = await bcrypt.hash(password, 12);

    const update = await prisma.user.update({
      where: {
        id: parseInt(id),
      },
      data: {
        password:hashed
      },
    });
    return NextResponse.json({ update }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 400 });
  }
}
