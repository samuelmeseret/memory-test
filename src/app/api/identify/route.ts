import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { identifyPerson } from "@/lib/openrouter";

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { photo } = await request.json();

  if (!photo || typeof photo !== "string") {
    return NextResponse.json({ error: "Photo is required" }, { status: 400 });
  }

  // Fetch all family members with photos
  const { data: members, error } = await supabase
    .from("family_members")
    .select("*, photos:family_member_photos(*)")
    .eq("user_id", user.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!members || members.length === 0) {
    return NextResponse.json({
      name: "",
      confidence: 0,
      explanation: "You haven't added any family members yet. Add someone first!",
    });
  }

  // Download stored photos and convert to base64
  const familyMembersWithPhotos = await Promise.all(
    members
      .filter((m) => m.photos && m.photos.length > 0)
      .map(async (member) => {
        const photoBase64s: string[] = [];

        // Limit to 2 photos per member
        for (const p of member.photos.slice(0, 2)) {
          try {
            const res = await fetch(p.photo_url);
            const buffer = await res.arrayBuffer();
            const base64 = Buffer.from(buffer).toString("base64");
            const mimeType = res.headers.get("content-type") || "image/jpeg";
            photoBase64s.push(`data:${mimeType};base64,${base64}`);
          } catch {
            // Skip photos that fail to download
          }
        }

        return {
          name: member.name,
          photoBase64s,
        };
      })
  );

  const membersWithPhotos = familyMembersWithPhotos.filter(
    (m) => m.photoBase64s.length > 0
  );

  if (membersWithPhotos.length === 0) {
    return NextResponse.json({
      name: "",
      confidence: 0,
      explanation: "No photos found for your family members. Please add photos first.",
    });
  }

  try {
    const result = await identifyPerson(photo, membersWithPhotos);
    return NextResponse.json(result);
  } catch (err) {
    console.error("Identify error:", err);
    return NextResponse.json(
      { error: "Failed to identify person" },
      { status: 500 }
    );
  }
}
