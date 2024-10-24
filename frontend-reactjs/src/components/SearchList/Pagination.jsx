import React from 'react'

const Pagination = () => {
    return (
        <nav
            className="flex gap-5 justify-between self-center mt-16 max-w-full text-base leading-none text-center text-cyan-700 w-[233px] max-md:mt-10"
            aria-label="Pagination"
        >
            <ul className="flex gap-7 whitespace-nowrap list-none p-0">
                <li className="font-bold text-stone-900">
                    <a href="#" aria-current="page">
                        1
                    </a>
                </li>
                <li>
                    <a href="#">2</a>
                </li>
                <li>
                    <a href="#">3</a>
                </li>
                <li className="self-start mt-2.5 text-stone-900">…</li>
                <li>
                    <a href="#">9</a>
                </li>
            </ul>
            <a href="#" className="flex gap-2 self-start">
                Next
                <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/9e22d5e339f5bc6358bd01be344d300c4160007141cad149fc6a4fc93ae22117?placeholderIfAbsent=true&apiKey=ee3b4c55f4e940649da4e87de99f1704"
                    alt=""
                    className="object-contain shrink-0 my-auto w-1.5 aspect-[0.75]"
                />
            </a>
        </nav>
    )
}

export default Pagination
