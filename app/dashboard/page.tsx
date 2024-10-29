import { store } from "@/constants";
import { formatToTimeInput } from "@/utils";

const page = () => {
  const [start, end] = store.contacts.workHours.split(" - ");
  return (
    <div>
      <div className="container m-5 mx-auto flex flex-col gap-5 px-5">
        <h2 className="w-full rounded-3xl bg-white p-5 text-3xl text-primary shadow-sm">
          معلومات التواصل{" "}
        </h2>
        <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
          <div className="w-full rounded-3xl bg-white p-5 shadow-sm">
            <form action="">
              <label htmlFor="" className="text-2xl text-primary">
                البريد الالكتروني{" "}
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="ادخل البريد الالكتروني"
                value={store.contacts.email}
                readOnly
                required
                className="mt-4 h-14 w-full rounded-3xl border p-4 px-6 text-left tracking-wider outline-none md:text-lg"
              />
            </form>
          </div>
          <div className="w-full rounded-3xl bg-white p-5 shadow-sm">
            <form action="">
              <label htmlFor="" className="text-2xl text-primary">
                العنوان
              </label>
              <input
                type="text"
                name="address"
                id="address"
                placeholder="ادخل العنوان"
                value={store.contacts.address}
                readOnly
                required
                className="mt-4 h-14 w-full rounded-3xl border p-4 px-6 tracking-wider outline-none md:text-lg"
              />
            </form>
          </div>
          <div className="w-full rounded-3xl bg-white p-5 shadow-sm">
            <form action="">
              <label htmlFor="" className="text-2xl text-primary">
                رقم الهاتف{" "}
              </label>
              <input
                type="text"
                name="phoneNumber"
                id="phoneNumber"
                placeholder="ادخل رقم الهاتف"
                value={store.contacts.phoneNumber}
                readOnly
                required
                className="mt-4 h-14 w-full rounded-3xl border p-4 px-6 text-left tracking-wider outline-none md:text-lg"
              />
            </form>
          </div>
          <div className="w-full rounded-3xl bg-white p-5 shadow-sm">
            <form action="">
              <label htmlFor="" className="text-2xl text-primary">
                مواعيد العمل{" "}
              </label>
              <div className="flex flex-wrap md:flex-nowrap md:gap-5">
                <input
                  type="time"
                  name="startingHours"
                  id="startingHours"
                  placeholder="ادخل مواعيد بدء العمل"
                  value={formatToTimeInput(start)}
                  readOnly
                  required
                  className="mt-4 h-14 w-full rounded-3xl border p-4 px-6 tracking-wider outline-none md:text-lg"
                />
                <input
                  type="time"
                  name="endingHours"
                  id="endingHours"
                  placeholder="ادخل مواعيد انتهاء العمل"
                  value={formatToTimeInput(end)}
                  readOnly
                  required
                  className="mt-4 h-14 w-full rounded-3xl border p-4 px-6 tracking-wider outline-none md:text-lg"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
