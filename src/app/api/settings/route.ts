import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const SESSION_TOKEN = "portfolio_admin_session";

function isAuthenticated(cookieStore: Awaited<ReturnType<typeof cookies>>) {
  return !!cookieStore.get(SESSION_TOKEN)?.value;
}

function getSettingsPath() {
  return join(process.cwd(), "src/data/settings.json");
}

export async function GET() {
  try {
    const data = readFileSync(getSettingsPath(), "utf-8");
    const settings = JSON.parse(data);
    // Don't expose admin password
    const { adminPassword, ...publicSettings } = settings;
    void adminPassword;
    return NextResponse.json(publicSettings);
  } catch {
    return NextResponse.json({}, { status: 200 });
  }
}

export async function PUT(request: Request) {
  const cookieStore = await cookies();
  if (!isAuthenticated(cookieStore)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const updates = await request.json();
    const data = readFileSync(getSettingsPath(), "utf-8");
    const settings = JSON.parse(data);

    const updatedSettings = { ...settings, ...updates };
    writeFileSync(
      getSettingsPath(),
      JSON.stringify(updatedSettings, null, 2),
      "utf-8"
    );

    const { adminPassword, ...publicSettings } = updatedSettings;
    void adminPassword;
    return NextResponse.json(publicSettings);
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
