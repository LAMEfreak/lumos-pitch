import { Button } from "../ui/button";
import { Investor, columns } from "./columns";
import DataTable from "./DataTable";
import { useEffect, useState } from "react";

async function getData(): Promise<Investor[]> {
  return [
    {
      id: 1,
      name: "John Smith",
      type: "VC",
      company: "John Ventures",
      stage: "Pre Seed",
      email: "johnventures@live.com",
      updated: "2021-09-01 10:42 AM",
    },
    {
      id: 2,
      name: "Harry Potter",
      type: "Angel",
      company: "Hogwarts",
      stage: "Series A",
      email: "harry@hogwarts.com",
      updated: "2024-09-01 09:34 AM",
    },
    {
      id: 3,
      name: "Harry Potter",
      type: "Angel",
      company: "Hogwarts",
      stage: "Series A",
      email: "harry@hogwarts.com",
      updated: "2024-09-01 09:34 AM",
    },
    {
      id: 3,
      name: "Harry Potter",
      type: "Angel",
      company: "Hogwarts",
      stage: "Series A",
      email: "harry@hogwarts.com",
      updated: "2024-09-01 09:34 AM",
    },
    {
      id: 3,
      name: "Harry Potter",
      type: "Angel",
      company: "Hogwarts",
      stage: "Series A",
      email: "harry@hogwarts.com",
      updated: "2024-09-01 09:34 AM",
    },
    {
      id: 3,
      name: "Harry Potter",
      type: "Angel",
      company: "Hogwarts",
      stage: "Series A",
      email: "harry@hogwarts.com",
      updated: "2024-09-01 09:34 AM",
    },
    {
      id: 3,
      name: "Harry Potter",
      type: "Angel",
      company: "Hogwarts",
      stage: "Series A",
      email: "harry@hogwarts.com",
      updated: "2024-09-01 09:34 AM",
    },
    {
      id: 3,
      name: "Harry Potter",
      type: "Angel",
      company: "Hogwarts",
      stage: "Series A",
      email: "harry@hogwarts.com",
      updated: "2024-09-01 09:34 AM",
    },
    {
      id: 3,
      name: "Harry Potter",
      type: "Angel",
      company: "Hogwarts",
      stage: "Series A",
      email: "harry@hogwarts.com",
      updated: "2024-09-01 09:34 AM",
    },
    {
      id: 3,
      name: "Harry Potter",
      type: "Angel",
      company: "Hogwarts",
      stage: "Series A",
      email: "harry@hogwarts.com",
      updated: "2024-09-01 09:34 AM",
    },
    {
      id: 3,
      name: "Harry Potter",
      type: "Angel",
      company: "Hogwarts",
      stage: "Series A",
      email: "harry@hogwarts.com",
      updated: "2024-09-01 09:34 AM",
    },
    {
      id: 3,
      name: "Harry Potter",
      type: "Angel",
      company: "Hogwarts",
      stage: "Series A",
      email: "harry@hogwarts.com",
      updated: "2024-09-01 09:34 AM",
    },
    {
      id: 3,
      name: "Harry Potter",
      type: "Angel",
      company: "Hogwarts",
      stage: "Series A",
      email: "harry@hogwarts.com",
      updated: "2024-09-01 09:34 AM",
    },
    {
      id: 3,
      name: "Harry Potter",
      type: "VC",
      company: "Hogwarts dwad aw daw d",
      stage: "Series A",
      email: "harry@hogwarts.com",
      updated: "2024-09-01 09:34 AM",
    },
  ];
}

export const InvestorsMasterList = () => {
  const [investorList, setInvestorList] = useState<Investor[]>(
    [] as Investor[]
  );

  useEffect(() => {
    const fetchData = async () => {
      const result = await getData();
      setInvestorList(result);
    };

    fetchData();
  }, []);

  if (investorList === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container relative mx-auto py-4">
      <h1 className="text-left text-2xl mb-0">Investors</h1>
      <div className="absolute right-8 top-16 flex gap-4">
        <Button
          variant="outline"
          size="default"
          className=" dark:bg-blue-700 dark:hover:bg-blue-800 "
        >
          Add Investor
        </Button>
        <Button variant="destructive" size="default">
          Delete
        </Button>
      </div>
      <DataTable columns={columns} data={investorList} />
    </div>
  );
};

export default InvestorsMasterList;
