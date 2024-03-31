"use client"
// import {redirect, useRouter} from "next/navigation";

import {useRouter} from "next/navigation";

const Back = () => {
    const nav = useRouter()
    const returnPage = () => {
        nav.push("/")
    }
    return (
        <button onClick={returnPage}>Выбрать другую группу</button>
    )
}

export default Back