import {readFileSync} from "node:fs";
import Back from "@/components/Back/Back";


export default function Shed() {
    const data = readFileSync("message.json", "utf-8")
    const shed = JSON.parse(data)

    return (
            <>
                <Back/>
                <h1 className="text-center mb-4 mt-4 font-bold text-2xl">Расписание</h1>
                <div className="bg-slate-700 flex flex-row gap-10 p-5 justify-center align-middle">
                    {
                        shed.map((less, index) => (
                            <div className="flex flex-col gap-10 " key={index}>
                                <li>{less.date}</li>

                                {less.lessons.map((lessi, index) => (
                                        <div className="bg-slate-400 p-3" key={index}>
                                            <li>{lessi.subject}</li>
                                            <li>{lessi.teacher}</li>
                                            <li>{lessi.time}</li>
                                            <li>{lessi.startTime}</li>
                                            <li>{lessi.endTime}</li>
                                            <li>{lessi.room}</li>
                                        </div>
                                    )
                                )}
                            </div>
                        ))
                    }
                </div>
            </>
        )
}