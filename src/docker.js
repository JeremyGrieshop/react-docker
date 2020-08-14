
/**
 * Returns logs for a container.
 * 
 * @param {string} containerId - The id of the docker container.
 * @param {string} uriPrefix - The uri prefix for the Docker RESTful API.
 */
export async function logs(containerId, uriPrefix = "/docker") {
    const params = "?stdout=true&stderr=true"    
    const url = uriPrefix + "/v1.40/" + containerId + "/logs?" + params

    const response = await fetch(url)
    const buffer = await response.arrayBuffer()
    const bytes = new Uint8Array(buffer)

    let stdout = ""
    let stderr = ""

    let pos = 0
    while (pos < bytes.length) {
        const file = bytes[pos]

        // skip next 3 bytes
        pos += 4

        const count = (bytes[pos] << 24) | (bytes[pos+1] << 16) | (bytes[pos+2] << 8) | (bytes[pos+3])

        pos += 4 

        if (file === 1)
            stdout += new TextDecoder().decode( bytes.slice(pos, pos+count) )
        else if (file === 2)
            stderr += new TextDecoder().decode( bytes.slice(pos, pos+count) )

        pos += count
    }

    return { stdout, stderr }
}

/**
 * Inspects a container.
 * 
 * @param {string} containerId - The id of the docker container.
 * @param {string} uriPrefix - The uri prefix for the Docker RESTful API.
 */
export async function inspect(containerId, uriPrefix = "/docker") {

  const response = await fetch( uriPrefix + "/v1.40/containers/" + containerId + "/json")

  return response.json()
}

/**
 * Executes a command on container and returns the output.
 * 
 * @param {string} containerId - The id of the docker container.
 * @param {string} command - The command to execute.
 * @param {string} uriPrefix - The uri prefix for the Docker RESTful API.
 */
export async function exec(containerId, command, uriPrefix = "/docker") {

}

/**
 * Lists the containers.
 * 
 * @param {string} uriPrefix - The uri prefix for the Docker RESTful API.
 */
export async function containers(uriPrefix = "/docker") {

  const response = await fetch( uriPrefix + "/v1.40/containers/json" )
  
  return response.json()
}
