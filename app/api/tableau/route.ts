const jwt = require("jsonwebtoken");
import { NextResponse } from "next/server";
const { randomBytes } = require("crypto");

export function GET() {
  const token = jwt.sign(
    {
      iss: process.env.TABLEAU_CLIENTID,
      sub: "support@eha.ng",
      aud: "tableau",
      jti: randomBytes(64).toString("hex"),
      scp: ["tableau:views:embed", "tableau:metrics:embed"],
    },
    process.env.TABLEAU_SECRETVALUE,
    {
      algorithm: "HS256",
      expiresIn: 600,
      header: {
        kid: process.env.TABLEAU_SECRETID,
        iss: process.env.TABLEAU_CLIENTID,
      },
    }
  );

  return NextResponse.json(token);
}
