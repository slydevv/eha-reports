import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'
const bcrypt = require('bcrypt');
import sendEmail from '../send';
import { NextRequest, NextResponse } from 'next/server';
import { EmailTemplate } from "@/app/components/email-template";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export  async function GET(req:Request, res: NextResponse) {
  
            try {
                const allUsers = await prisma.user.findMany({
                      orderBy:{
                createdAt:'desc'
            },
                    include:{
                        categories:true
                    }
                })
                
               return NextResponse.json(allUsers)
            } catch (error) {
                NextResponse.json({error}, {status:400})
            }
 
    } 
   

export async function POST(req: NextRequest, res:NextResponse) {
    const body = await req.json()
    
    const { name, email, password, categoryValue, isAdmin } = body
      try {
                 if (!name || !email || !password ) {
                    return  NextResponse.json({error:"Please fill in all the fields"}, { status: 400 })
                     }
                const validEmail = email.includes("@eha.ng")
                if (!validEmail) {
                    return NextResponse.json({error:"This is not a valid work email"}, { status: 400 })
                }
                const userExist = await prisma.user.findUnique({
                    where: {
                        email:email
                    }
                })
                if (userExist) { 
                    return NextResponse.json({error:"This User already exist"},  { status: 400 })
                }
                const hashed = await bcrypt.hash(password, 12);
            
                const result = await prisma.user.create({
                  data: {
                    name,
                    email,
                    password: hashed,
                    isAdmin,
                    categories: {
                      connectOrCreate: categoryValue.map((singleCategory:any) => ({
                        where: { name: singleCategory },
                        create: { name: singleCategory },
                      })),
                    },
                  },
                });
          await resend.emails.send({
            from: "informatics@eha.ng",
            to: [`${email}`],
            subject: "Welcome to EHA Reports Platform!",
            // @ts-ignore
            react: EmailTemplate({
              firstName: name,
              email: email,
              password: password,
            }),
          });
                
          return NextResponse.json({ result })
      } catch (error) {
       
          return  NextResponse.json({ error }, {status:400})
            }
}