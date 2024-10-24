import { DownOutlined } from '@ant-design/icons'
import React from 'react'

const FilterSection = () => {
    return (
        <aside className="flex flex-col self-start mt-3.5 text-base leading-none text-stone-900">
            <section className="flex flex-col items-start py-5 pr-2 pl-px w-full border-t border-black border-opacity-10">
                <h3 className="flex gap-5 justify-between self-stretch font-bold whitespace-nowrap">
                    Availability
                    <div>-</div>
                </h3>
                <div className="flex gap-2.5 mt-6">
                    <input
                        type="checkbox"
                        id="inStock"
                        className="object-contain shrink-0 self-start w-3.5 rounded-sm aspect-square"
                    />
                    <label htmlFor="inStock">In stock (181)</label>
                </div>
                <div className="flex gap-2.5 mt-4">
                    <input
                        type="checkbox"
                        id="outOfStock"
                        className="object-contain shrink-0 self-start w-3.5 rounded-sm aspect-square"
                    />
                    <label htmlFor="outOfStock">Out of stock (29)</label>
                </div>
            </section>
            <section className="flex gap-5 justify-between py-5 pr-2 pl-px font-bold whitespace-nowrap border-t border-b border-black border-opacity-10">
                <h3>Wooden</h3>
                <DownOutlined style={{ fontSize: '10px' }} />
            </section>
        </aside>
    )
}

export default FilterSection
