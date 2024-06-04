import { columns } from "./columns";
import DataTable from "./DataTable";
import { useContext, useEffect } from "react";
import AddInvestorButton from "./table_components/AddInvestorButton";
// import DeleteButton from "./table_components/DeleteButton";
import { InvestorsListContext } from "../../utilities/context/InvestorsListContext";

// async function getData(): Promise<Investor[]> {
//   return [
//     {
//       id: 1,
//       name: "John Smith",
//       type: "VC",
//       company: "John Ventures",
//       stage: "Pre Seed",
//       email: "johnventures@live.com",
//       updated: "2021-09-01 10:42 AM",
//     },
//     {
//       id: 2,
//       name: "Harry Potter",
//       type: "Angel",
//       company: "Hogwarts",
//       stage: "Series A",
//       email: "harry@hogwarts.com",
//       updated: "2024-09-01 09:34 AM",
//     },
//     {
//       id: 3,
//       name: "Harry Potter",
//       type: "Angel",
//       company: "Hogwarts",
//       stage: "Series A",
//       email: "harry@hogwarts.com",
//       updated: "2024-09-01 09:34 AM",
//     },
//     {
//       id: 3,
//       name: "Harry Potter",
//       type: "Angel",
//       company: "Hogwarts",
//       stage: "Series A",
//       email: "harry@hogwarts.com",
//       updated: "2024-09-01 09:34 AM",
//     },
//     {
//       id: 3,
//       name: "Harry Potter",
//       type: "Angel",
//       company: "Hogwarts",
//       stage: "Series A",
//       email: "harry@hogwarts.com",
//       updated: "2024-09-01 09:34 AM",
//     },
//     {
//       id: 3,
//       name: "Harry Potter",
//       type: "Angel",
//       company: "Hogwarts",
//       stage: "Series A",
//       email: "harry@hogwarts.com",
//       updated: "2024-09-01 09:34 AM",
//     },
//     {
//       id: 3,
//       name: "Harry Potter",
//       type: "Angel",
//       company: "Hogwarts",
//       stage: "Series A",
//       email: "harry@hogwarts.com",
//       updated: "2024-09-01 09:34 AM",
//     },
//     {
//       id: 3,
//       name: "Harry Potter",
//       type: "Angel",
//       company: "Hogwarts",
//       stage: "Series A",
//       email: "harry@hogwarts.com",
//       updated: "2024-09-01 09:34 AM",
//     },
//     {
//       id: 3,
//       name: "Harry Potter",
//       type: "Angel",
//       company: "Hogwarts",
//       stage: "Series A",
//       email: "harry@hogwarts.com",
//       updated: "2024-09-01 09:34 AM",
//     },
//     {
//       id: 3,
//       name: "Harry Potter",
//       type: "Angel",
//       company: "Hogwarts",
//       stage: "Series A",
//       email: "harry@hogwarts.com",
//       updated: "2024-09-01 09:34 AM",
//     },
//     {
//       id: 3,
//       name: "Harry Potter",
//       type: "Angel",
//       company: "Hogwarts",
//       stage: "Series A",
//       email: "harry@hogwarts.com",
//       updated: "2024-09-01 09:34 AM",
//     },
//     {
//       id: 3,
//       name: "Harry Potter",
//       type: "Angel",
//       company: "Hogwarts",
//       stage: "Series A",
//       email: "harry@hogwarts.com",
//       updated: "2024-09-01 09:34 AM",
//     },
//     {
//       id: 3,
//       name: "Harry Potter",
//       type: "Angel",
//       company: "Hogwarts",
//       stage: "Series A",
//       email: "harry@hogwarts.com",
//       updated: "2024-09-01 09:34 AM",
//     },
//     {
//       id: 3,
//       name: "Harry Potter",
//       type: "VC",
//       company: "Hogwarts dwad aw daw d",
//       stage: "Series A",
//       email: "harry@hogwarts.com",
//       updated: "2024-09-01 09:34 AM",
//     },
//   ];
// }

export const InvestorsMasterList = () => {
  const { investorsList, fetchData } = useContext(InvestorsListContext)!;

  // const [investorList, setInvestorList] = useState<Investor[]>(
  //   [] as Investor[]
  // );
  // const [parentRowSelection, setParentRowSelection] = useState<
  //   Record<number, boolean>
  // >({});

  // const handleRowSelectionChange = (
  //   newRowSelection: Record<number, boolean>
  // ) => {
  //   setParentRowSelection(newRowSelection);
  // };

  // const fetchData = async () => {
  //   // const result = await getData();
  //   const token = await getAccessTokenSilently();
  //   const auth0Id = user?.sub;

  //   try {
  //     const result = await axios.get(
  //       `${import.meta.env.VITE_SOME_BACKEND_SERVER}/investors/${auth0Id}`,
  //       {
  //         headers: { Authorization: `Bearer ${token}` },
  //       }
  //     );
  //     setInvestorList(result.data);
  //   } catch (error) {
  //     console.log(`Error: ${error}`);
  //   }
  // };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className="flex flex-col items-center p-2 align-middle">
      <div className="container relative mx-auto pt-4 pb-8">
        <h1 className="text-left text-2xl mb-0">Investors</h1>
        <div className="absolute right-8 top-14 flex gap-4">
          <AddInvestorButton />
          {/* <DeleteButton /> */}
        </div>
        <DataTable columns={columns} data={investorsList} opacity-95 />
      </div>
    </section>
  );
};

export default InvestorsMasterList;
