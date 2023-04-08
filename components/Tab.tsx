import React from 'react'

export interface TabItem {
    name: string
    id: string
}

interface TabProps {
    items: TabItem[]
    active: TabItem
    setActive: (item: TabItem) => void
}

const Tab: React.FC<TabProps> = ({ items, active, setActive }) => {
    return (
        <div className="flex flex-row items-center justify-around p-1 bg-gray-300 rounded">
            {items.map((item) => (
                <button
                    key={item.id}
                    type="button"
                    className={`w-1/2 text-center rounded ${item.id === active.id ? 'bg-white ' : 'text-gray-600 hover:bg-white hover:text-black'}`}
                    onClick={() => setActive(item)}
                >
                    {item.name}
                </button>
            ))}
        </div>
    )
}

export default Tab
