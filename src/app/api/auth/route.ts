import { NextResponse } from 'next/server';

export async function GET() {
  const clientID = process.env.OAUTH_CLIENT_ID;
  // Müşteriyi GitHub'ın yetkilendirme sayfasına yönlendiriyoruz
  return NextResponse.redirect(
    `https://github.com/login/oauth/authorize?client_id=${clientID}&scope=repo,user`
  );
}