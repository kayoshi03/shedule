import getData from "@/parser/getData";
import {redirect} from "next/navigation";
import {Suspense} from "react";
import Loading from "@/app/loading";


export default function Home() {

     const getShed = async (e) => {
         "use server"
         const data = await getData(e)
         console.log(data)
         if (data === 1) {
             redirect("/sheduls")
         }
         else {
             console.log("error")
         }

    }
  return (
      <div className="w-full h-full flex align-middle justify-center">


          <form className="w-min h-100 flex flex-col align-middle justify-center gap-4" action={getShed}>
              <label className="text-center">Какая группа?</label>
              <input name="group" type="text"/>
              <button type="submit">Посмотреть расписание</button>
          </form>
      </div>
  )
}
