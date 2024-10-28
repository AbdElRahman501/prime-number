const cards = [
  {
    title: "مبيعات اليوم",
    value: "$12,345",
  },
  {
    title: "العملاء الجدد",
    value: "234",
  },
  {
    title: "الطلبات الجديدة",
    value: "98",
  },
  {
    title: "الارباح اليومية",
    value: "$45,123",
  },
  {
    title: "المسخدمين",
    value: "67",
  },
  {
    title: "المسخدمين",
    value: "67",
  },
];

const page = () => {
  return (
    <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.title} {...card} />
      ))}
    </div>
  );
};

export default page;

interface CardProps {
  title: string;
  value: string;
}

const Card: React.FC<CardProps> = ({ title, value }) => {
  return (
    <div className="flex flex-col items-center rounded-3xl bg-white p-6 text-primary shadow-sm">
      <h3 className="mb-2 text-lg font-semibold">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
};
