import { NextRequest, NextResponse } from "next/server";

export default function middleware(req) {
  const verify = req.cookies.get("inicio");
  const admins = req.cookies.get("admin");
  const url = req.url;
  const url2 = req.nextUrl;
  const uri = process.env.DATA_URL;
  if (!verify && url.includes("/app")) {
    return NextResponse.redirect(`${uri}/demo`);
  } else if (verify && url2.pathname === "/") {
    return NextResponse.redirect(`${uri}/app`);
  }
  if (!admins && url.includes("/app/admin")) {
    return NextResponse.redirect(`${uri}/demo/admin-demo`);
  }
}
