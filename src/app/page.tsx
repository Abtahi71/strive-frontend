import Image from "next/image";
import AllActivities from "../components/allActivities";
import Hero from "../components/hero";

export default function Home() {
  return (
    <div>
      <Hero/>
      <AllActivities/>
    </div>
  );
}
