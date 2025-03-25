import { GraphByPeriod } from "./components/Home/GraphByPeriod";
import LastOperationWidget from "./components/Home/LastOperationWidget";
import TotalTransaction from "./components/Home/TotalTransaction";
import Navbar from "./components/Nav/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      
      <div className="flex justify-center gap-20 mt-10">
        <div className="flex gap-8 flex-wrap justify-center">
          <LastOperationWidget />
          <TotalTransaction />
          <GraphByPeriod />
        </div>
      </div>
    </>
  );
}
