import { options } from "@/app/api/auth/[...nextauth]/options";
import ProfileForm from "@/components/ProfileForm";
import { getUser } from "@/lib/actions/user.actions";
import { NextAuthProvider } from "@/NextAuthProvider";
import { getServerSession } from "next-auth";

const page = async () => {
  const session = await getServerSession(options);
  const user = await getUser(session?.user?.email as string);

  if (!user) return null;
  return (
    <div className="flex-1">
      <div className="container m-5 mx-auto flex flex-col gap-5 px-5">
        <NextAuthProvider>
          <ProfileForm user={user} />
        </NextAuthProvider>
      </div>
    </div>
  );
};

export default page;
