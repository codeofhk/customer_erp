import React from 'react'

const Sidebar = () => {
  let menu = ['Financial',
              "Sales",
              "Marketing",
              "Production",
              "Inventory",
              "Human Resources",
              "Supply Chain",
              "Logistics",
              "Project Management",
              "Analytics",
              "Customizable Widgets",
              "Notifications"]
  return (
    <div className=''>
      <div className=' bg-slate-500 text-white font-semibold top-0 left-0 fixed w-52 max-'>
        <ul>
          {menu.map((name)=>(<li key={name} className='p-4' >{name}</li>))}
        </ul>
      </div>
    </div>
  )
}

export default Sidebar