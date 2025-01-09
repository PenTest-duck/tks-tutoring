import { createClient } from "@/utils/supabase/server";

const AdminPage = async () => {
  const supabase = await createClient();
  const { data: sheets } = await supabase.from("sheets").select();

  return (
    <div>
      <pre>{JSON.stringify(sheets, null, 2)}</pre>
    </div>
  );
};

export default AdminPage;
