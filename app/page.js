'use client'
import { useState } from 'react'

export default function Home() {
  const [tasks, setTasks] = useState([])
  const [input, setInput] = useState('')
  const [editingIndex, setEditingIndex] = useState(null)

  const handleAddTask = () => {
    if (input.trim() === '') return

    if (editingIndex !== null) {
      const updatedTasks = [...tasks]
      updatedTasks[editingIndex] = input
      setTasks(updatedTasks)
      setEditingIndex(null)
    } else {
      setTasks([...tasks, input])
    }

    setInput('')
  }

  const handleEdit = (index) => {
    setInput(tasks[index])
    setEditingIndex(index)
  }

  const handleDelete = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index)
    setTasks(updatedTasks)
    if (editingIndex === index) {
      setInput('')
      setEditingIndex(null)
    }
  }

  return (
    <main style={styles.container}>
      <h1 style={styles.heading}>Task Manager</h1>

      <div style={styles.inputContainer}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter a task"
          style={styles.input}
        />
        <button onClick={handleAddTask} style={styles.button}>
          {editingIndex !== null ? 'Update' : 'Add'}
        </button>
      </div>

      <ul style={styles.list}>
        {tasks.map((task, index) => (
          <li key={index} style={styles.taskItem}>
            {task}
            <div>
              <button onClick={() => handleEdit(index)} style={styles.editBtn}>
                Edit
              </button>
              <button onClick={() => handleDelete(index)} style={styles.delBtn}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  )
}

const styles = {
  container: {
    maxWidth: '600px',
    margin: '50px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    fontFamily: 'Arial, sans-serif'
  },
  heading: {
    textAlign: 'center',
    fontSize: '32px',
    marginBottom: '20px'
  },
  inputContainer: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px'
  },
  input: {
    flex: 1,
    padding: '10px',
    fontSize: '16px'
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer'
  },
  list: {
    listStyle: 'none',
    padding: 0
  },
  taskItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    borderBottom: '1px solid #eee'
  },
  editBtn: {
    marginRight: '10px',
    padding: '5px 10px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    cursor: 'pointer'
  },
  delBtn: {
    padding: '5px 10px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    cursor: 'pointer'
  }
}
