import React, {useState, useEffect} from "react"

import {containers as fetchContainers} from "./docker"

export function useContainers(uriPrefix) {

  const [containers, setContainers] = useState()
  const [error, setError] = useState()
  const [isLoading, setIsLoading] = useState()

  useEffect(() => {
    setIsLoading(true)

    try {
      const containers = await fetchContainers(uriPrefix)
      setContainers(containers)
    } catch (error) {
      setError(error)
    }

    setIsLoading(true)
  }, [uriPrefix])


  return { containers, error, isLoading }
}
