import { useState, useEffect } from 'react'
import { Logo, FormRow } from '../components'
import { toast } from 'react-toastify'
import Wrapper from '../assets/wrappers/RegisterPage'
import { useSelector, useDispatch } from 'react-redux'
import { loginUser, registerUser } from '../features/user/userSlice'
import { useNavigate } from 'react-router-dom'

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
}

const Register = () => {
  const [values, setValues] = useState(initialState)
  const dispatch = useDispatch()
  const { isLoading, user } = useSelector((store) => store.user)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setValues({ ...values, [name]: value })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const { name, email, password, isMember } = values
    //(!isMember means we are registering and we showcase name field so that is the reason we have to club each other compulsorily)
    if (!email || !password || (!isMember && !name)) {
      toast.error('Please Fill Out All Fields')
      return
    }
    if (isMember) {
      dispatch(loginUser({ email, password }))
      return
    }
    dispatch(registerUser({ name, email, password }))
  }

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember })
  }

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/')
      }, 100)
    }
  }, [user, navigate])

  return (
    <Wrapper className='full-name'>
      <form className='form' onSubmit={onSubmit}>
        <Logo />
        <h3>{values.isMember ? 'Login' : 'Register'}</h3>
        {!values.isMember && (
          <FormRow
            type='text'
            name='name'
            value={values.name}
            handleChange={handleChange}
          />
        )}
        <FormRow
          type='email'
          name='email'
          value={values.email}
          handleChange={handleChange}
        />
        <FormRow
          type='password'
          name='password'
          value={values.password}
          handleChange={handleChange}
        />
        <button type='submit' className='btn btn-block' disabled={isLoading}>
          {isLoading ? 'loading...' : 'submit'}
        </button>
        <p>
          {values.isMember ? 'Not a member yet' : 'Already a member'}

          <button type='submit' onClick={toggleMember} className='member-btn'>
            {values.isMember ? 'Register' : 'Login'}
          </button>
        </p>
        <button
          type='button'
          className='btn btn-block btn-hipster'
          disabled={isLoading}
          onClick={() => {
            dispatch(loginUser({ email: 'testUser@test.com', password: 'secret' }));
          }}
        >
          {isLoading? 'loading...':'demo'}
        </button>
      </form>
    </Wrapper>
  )
}

export default Register
