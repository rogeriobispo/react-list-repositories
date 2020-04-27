import React, { useCallback, useState, useEffect } from "react";
import { uuid } from 'uuidv4'
import Api from './services/api'

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {

    const loadRepositories = async () => {
      const response = await Api.get('/repositories')
      setRepositories(response.data)
    }

    loadRepositories()
  }, [])
  const handleAddRepository = useCallback(
    async () => {
      const response = await Api.post('/repositories', {
        id: uuid(),
        url: "https://github.com/josepholiveira",
        title: `Desafio ReactJS ${new Date()} `,
        techs: ["React", "Node.js"],
      })
      setRepositories([...repositories, response.data])
    },
    [repositories],
  )

  const handleRemoveRepository = useCallback(
    async (id) => {
      await Api.delete(`/repositories/${id}`)
      const filteredRepositories = repositories.filter(repo => repo.id !== id)
      await setRepositories(filteredRepositories)


    },
    [repositories],
  )
  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo => (
          <li key={repo.id}>
            {repo.title}

            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
          </button>
          </li>
        ))}

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
