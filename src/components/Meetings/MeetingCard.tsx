interface MeetingCardProps {
  color: string;
  icon: React.ComponentType;
  title: string;
  description: string;
}

const MeetingCard = ({
  color,
  icon: Icon,
  title,
  description,
}: MeetingCardProps) => {
  return (
    <div
      className={`${color} p-6 bg-opacity-90 text-left flex flex-col justify-between w-full min-h-[180px] rounded-md cursor-pointer`}
    >
      {" "}
      <Icon />
      <div className="flex flex-col gap-2">
        <p className="text-2xl font-bold">{title}</p>
        <p className="">{description}</p>
      </div>
    </div>
  );
};
export default MeetingCard;
