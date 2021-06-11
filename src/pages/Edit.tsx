import React, { useEffect, useState } from 'react'
import { navigate, RouteComponentProps } from '@reach/router'
import Container from '../components/Container'
import { useDispatch } from 'react-redux'
import { EnqueueSnackbarAction } from '../redux'
import { Dispatch } from 'redux'
import axios from 'axios'
import { Post } from '../../DataStructure'

interface RouterParam {
  postId: Post['id']
}

const Edit: React.FC<RouteComponentProps<RouterParam>> = ({ postId }) => {
  const [title, setTitle] = useState<string | undefined>('')
  const [body, setBody] = useState<string | undefined>('')
  const dispatch: Dispatch<EnqueueSnackbarAction> = useDispatch()

  useEffect(() => {
    async function fetchPost() {
      try {
        const { data } = await axios.get<Post>(
          `${process.env.REACT_APP_API_ENDPOINT}/post/${postId}`
        )
        // @ts-ignore
        setTitle(data.title)
        // @ts-ignore
        setBody(data.body)
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error)
      }
    }
    fetchPost()
  }, [postId])

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    cb: React.Dispatch<React.SetStateAction<string | undefined>>
  ): void {
    e.preventDefault()
    cb(e.target.value)
  }

  async function execEdit() {
    try {
      const { status } = await axios.post(
        `${process.env.REACT_APP_API_ENDPOINT}/update`,
        {
          title,
          body,
          postId,
        }
      )

      if (status === 200) {
        dispatch({
          type: 'ENQUEUE_SNACKBAR_MESSAGE',
          payload: { message: 'Post Updated!', color: 'green' },
        })
        navigate(`/post/${postId}`)
      } else {
        dispatch({
          type: 'ENQUEUE_SNACKBAR_MESSAGE',
          payload: {
            message: `code:${status} Something Error Occuring.`,
            color: 'red',
          },
        })
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)
      dispatch({
        type: 'ENQUEUE_SNACKBAR_MESSAGE',
        payload: { message: error.message, color: 'red' },
      })
    }
  }

  return (
    <Container className="flex flex-col justify-start">
      <input
        type="text"
        className="mt-3"
        value={title}
        onChange={(e) => handleChange(e, setTitle)}
      />
      <textarea
        className="w-full h-60 mt-3"
        value={body}
        onChange={(e) => handleChange(e, setBody)}
      />
      <div className="flex gap-4 justify-end">
        <button
          onClick={execEdit}
          className="mt-3 shadow bg-green-400 hover:bg-green-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
        >
          Update
        </button>
      </div>
    </Container>
  )
}

export default React.memo(Edit)
