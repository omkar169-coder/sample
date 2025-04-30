import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function GET(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const accessToken = typeof token?.accessToken === 'string' ? token.accessToken : '';

  const params = new URLSearchParams();
  params.append('mode', 'login');
  params.append('token', accessToken);

  return NextResponse.redirect(
    `https://wooble.io/service/Authenticate/oauth2callback.php?mode=login&${params.toString()}`,
    302 // 302 is the default status code for redirects
  ,
  );
}
