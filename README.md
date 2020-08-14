# react-docker

> Functions and React Hooks for interacting with Docker REST API

[![NPM](https://img.shields.io/npm/v/docker.svg)](https://www.npmjs.com/package/docker) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save @memsetzero/react-docker
```

## Usage

```jsx
import React, { Component } from 'react'

import {useContainers} from 'docker'

class Example extends Component {
  const {containers} = useContainers();

  render() {
    return (
      <ul>
      {
        containers && containers.map((container, index) =>
          <li key={index}>{ container.id }</li>
        )
      }
      </ul>
    );
  }
}
```

## License

MIT © [jeremygrieshop](https://github.com/jeremygrieshop)
