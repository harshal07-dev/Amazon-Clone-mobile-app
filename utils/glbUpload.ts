import { supabase } from "@/supabase";
export const glbUpload = async (glbUrl: string | null) => {
        if (!glbUrl) return null;
        const fileName = `${Date.now()}.glb`;

        // Convert local file URI to ArrayBuffer and upload via Supabase JS client
        const fileResponse = await fetch(glbUrl);
        const arrayBuffer = await fileResponse.arrayBuffer();

        const { error: uploadError } = await supabase.storage
            .from("user_data")
            .upload(`user-uploads/${fileName}`, arrayBuffer as any, {
                contentType: "model/gltf-binary",
                upsert: true,
            });

        if (uploadError) {
            console.error("GLB upload failed:", uploadError.message);
            throw new Error("GLB upload failed (client)");
        }

        const { data: publicData } = supabase.storage
            .from("user_data")
            .getPublicUrl(`user-uploads/${fileName}`);
        return publicData.publicUrl ?? null;
};