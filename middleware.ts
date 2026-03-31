import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const lang = request.cookies.get("lang")?.value || "en";

  const response = NextResponse.next();
  response.headers.set("x-locale", lang);

  return response;
}
