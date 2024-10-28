const page = ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  console.log("🚀 ~ searchParams:", searchParams);
  return (
    <div>
      <div className="container m-5 mx-auto flex flex-col gap-5">
        <div className="rounded-3xl bg-white p-5 shadow-sm">
          <form action="">
            <label htmlFor="" className="text-xl text-primary">
              رقم الهاتف{" "}
            </label>
            <input
              type="text"
              name="phoneNumber"
              id="phoneNumber"
              placeholder="ادخل رقم الهاتف"
              required
              className="mt-4 h-14 w-full rounded-full border p-4 px-6"
            />
          </form>
        </div>
        <div className="rounded-3xl bg-white p-5 shadow-sm">
          <form action="">
            <label htmlFor="" className="text-xl text-primary">
              العنوان{" "}
            </label>
            <input
              type="text"
              name="address"
              id="address"
              placeholder="ادخل العنوان"
              required
              className="mt-4 h-14 w-full rounded-full border p-4 px-6"
            />
          </form>
        </div>
        <div className="rounded-3xl bg-white p-5 shadow-sm">
          <form action="">
            <label htmlFor="" className="text-xl text-primary">
              البريد الالكتروني{" "}
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="ادخل البريد الالكتروني"
              required
              className="mt-4 h-14 w-full rounded-full border p-4 px-6"
            />
          </form>
        </div>
        <div className="rounded-3xl bg-white p-5 shadow-sm">
          <form action="">
            <label htmlFor="" className="text-xl text-primary">
              مواعيد العمل{" "}
            </label>
            <div className="flex gap-5">
              <input
                type="time"
                name="startingHours"
                id="startingHours"
                placeholder="ادخل مواعيد العمل"
                required
                className="mt-4 h-14 w-full rounded-full border p-4 px-6"
              />
              <input
                type="time"
                name="endingHours"
                id="endingHours"
                placeholder="ادخل مواعيد العمل"
                required
                className="mt-4 h-14 w-full rounded-full border p-4 px-6"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default page;
