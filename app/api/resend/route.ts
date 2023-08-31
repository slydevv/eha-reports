import { NextResponse } from "next/server";
import { EmailTemplate } from "../../components/email-template";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: any, res: any) {
  const body = await req.json();
  const { name, email, password  } = body;
  try {
    const data = await resend.emails.send({
      from: "admin@eha.ng",
      to: req.body.email,
      subject: "Hello world",
      html: "<strong>It works!</strong>",
      // @ts-ignore
      react: EmailTemplate({
        firstName: name,
        email: email,
        password: password,
      }),
    });

   return;
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
