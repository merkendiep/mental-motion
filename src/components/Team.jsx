import React from "react"

const team = [
  {
    name: "Marik",
    profile: "/images/mugshot-marik.jpeg",
    position: "De gedreven verbinder",
  },
  {
    name: "Sofia",
    profile: "/images/mugshot-sofia.jpeg",
    position: "De bedachtzame gesprekspartner"
  },
  {
    name: "Gijs",
    profile: "/images/mugshot-gijs.jpeg",
    position: "De Excel-koning",
  },
  {
    name: "Mieke",
    profile: "",
    position: "Powerbank van MM",
  },
]

const Team = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-center text-2xl font-semibold md:text-5xl">Wie zijn wij</h1>

        <span className="text-md mt-4 px-2 text-center md:mt-4 md:px-5 md:text-xl">
          Ontmoet het gepassioneerde team dat Mental Motion mogelijk maakt.
        </span>
      </div>

      <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {team.map((item, index) => (
          <div key={index} className="card w-80 border border-base-content/10 shadow-sm lg:w-96">
            <figure className="lpx-10 pt-10">
              <img src={item.profile} alt="Shoes" className="h-60 w-60 rounded-full object-cover" />
            </figure>

            <div className="card-body items-center text-center">
              <h2 className="card-title font-bold">{item.name}</h2>
              <h2 className="font-semibold opacity-70">{item.position}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Team
