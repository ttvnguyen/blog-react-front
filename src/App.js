import { useState, useEffect } from 'react'
import AllBlogs from './pages/AllBlogs';
import SingleBlog from './pages/SingleBlog';
import Form from './pages/Form';
import './App.css';
import { Route, Routes } from 'react-router-dom'

const apiURL = 'https://blogs-app1.herokuapp.com'

function App() {
  const [blogs, setBlogs] = useState([])

  const getBlogs = async () => {
    const response = await fetch(apiURL + '/blogs/')
    const data = await response.json()
    setBlogs(data)
  }

  useEffect(() => {
    getBlogs()
  }, [])

  const handleFormSubmission = async (data, type) => {
    if(type === 'new'){
      const response = await fetch(`${apiURL}/blogs/`, {
        method: 'post',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      })
      getBlogs()
    } else {
      const response = await fetch(`${apiURL}/blogs/${data.id}/`, {
        method: 'put',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      })
      getBlogs()
    }
  }

  const deleteBlog = async (id) => {
    const response = await fetch(`${apiURL}/blogs/${id}/`,
    {
      method: 'delete'
    })
    getBlogs()
  }

  return (
    <div className="App">
      <h1>My Blog List</h1>
      <Routes>
        <Route
          path='/'
          element={<AllBlogs blogs={blogs} />}/>
        <Route
          path='/blog/:id'
          element={<SingleBlog blogs={blogs} deleteBlog={deleteBlog}/>}
        />
        <Route
          path='/new'
          element={<Form blogs={blogs} handleSubmit={handleFormSubmission} buttonLabel='Add Blog' formType='new'/>}
        />
        <Route
          path='/edit/:id'
          element={<Form blogs={blogs} handleSubmit={handleFormSubmission} buttonLabel='Edit Blog' formType='edit'/>}
        />
      </Routes>
      
    </div>
  );
}

export default App;
