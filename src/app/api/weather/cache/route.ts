import { NextResponse } from "next/server";
import { weatherCache } from "@/utils/weatherCache";

export async function GET() {
  try {
    const stats = weatherCache.getStats();
    return NextResponse.json({
      message: "Weather cache statistics",
      stats,
      cacheInfo: {
        duration: "2 hours",
        cleanupInterval: "30 minutes",
      },
    });
  } catch (error) {
    console.error("Cache stats error:", error);
    return NextResponse.json(
      { error: "Failed to get cache statistics" },
      { status: 500 },
    );
  }
}

export async function DELETE() {
  try {
    weatherCache.clear();
    return NextResponse.json({
      message: "Weather cache cleared successfully",
    });
  } catch (error) {
    console.error("Cache clear error:", error);
    return NextResponse.json(
      { error: "Failed to clear cache" },
      { status: 500 },
    );
  }
}

export async function POST() {
  try {
    weatherCache.cleanup();
    const stats = weatherCache.getStats();
    return NextResponse.json({
      message: "Cache cleanup completed",
      stats,
    });
  } catch (error) {
    console.error("Cache cleanup error:", error);
    return NextResponse.json(
      { error: "Failed to cleanup cache" },
      { status: 500 },
    );
  }
}
