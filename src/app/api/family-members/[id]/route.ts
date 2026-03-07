import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  // Fetch photos to delete from storage
  const { data: photos } = await supabase
    .from("family_member_photos")
    .select("photo_url")
    .eq("family_member_id", id);

  // Delete photo files from storage
  if (photos && photos.length > 0) {
    const paths = photos
      .map((p) => {
        const url = new URL(p.photo_url);
        // Extract path after /storage/v1/object/public/family-photos/
        const match = url.pathname.match(/\/storage\/v1\/object\/public\/family-photos\/(.+)/);
        return match ? match[1] : null;
      })
      .filter(Boolean) as string[];

    if (paths.length > 0) {
      await supabase.storage.from("family-photos").remove(paths);
    }
  }

  // Delete the family member (photos cascade)
  const { error } = await supabase
    .from("family_members")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
