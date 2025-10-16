import { supabase } from "@/supabase";

export const imageUpload = async (imageUri: string | null) => {
    if (!imageUri) return null;
    const fileName = `${Date.now()}.jpg`;

    // Convert local file URI to ArrayBuffer and upload via Supabase JS client
    const fileResponse = await fetch(imageUri);
    const arrayBuffer = await fileResponse.arrayBuffer();

    const { error: uploadError } = await supabase.storage
        .from("user_data")
        .upload(`user-uploads/${fileName}`, arrayBuffer as any, {
            contentType: "image/jpeg",
            upsert: true,
        });

    if (uploadError) {
        console.error("Image upload failed:", uploadError.message);
        throw new Error("Image upload failed (client)");
    }

    const { data: publicData } = supabase.storage
        .from("user_data")
        .getPublicUrl(`user-uploads/${fileName}`);

    return publicData.publicUrl ?? null;
};