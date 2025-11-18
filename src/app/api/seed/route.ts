import prisma from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server'

export async function GET(request: Request) { 
 
  //const todo = await prisma.productImage.deleteMany;

  //console.log(todo);
  return NextResponse.json({ message: 'Seed Executed' });
}