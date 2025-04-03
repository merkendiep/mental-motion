import React from "react"

const LogoClouds = () => {
  return (
    <div className="flex w-full items-center justify-center py-10">
      <div>
        <h2 className="text-base-400 mb-12 text-center text-lg font-semibold leading-8">
          In samenwerking met
        </h2>

        <div className="wrap flex flex-wrap justify-center gap-10 xl:gap-32">
          <img className="w-32 grayscale" src="/images/logo/google.svg" alt="google" />
          <img className="w-32 grayscale" src="/images/logo/microsoft.svg" alt="google" />
          <img className="w-32 grayscale" src="/images/logo/spotify.svg" alt="google" />
          <img className="w-32 grayscale" src="/images/logo/netflix.svg" alt="google" />
        </div>
      </div>
    </div>
  )
}

export default LogoClouds
