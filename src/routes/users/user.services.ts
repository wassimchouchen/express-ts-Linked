import jwt from 'jsonwebtoken'
import { User } from '../../models'


export const createUser = data => {
  
  return User.create(data)
}

export const getUser = async (email: string, password: string) => {
  const user = await User.findByEmail(email)
  console.log(user)
  if (!user) {
    return {
      error: 'User not found',
    }
  }

  const isValid = await user.verifyPassword(password)

  if (!isValid) {
    return {
      error: 'Invalid password',
    }
  }

  const token = await jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET
  )
  return { token: `fraise ${token}`, user: user}
}
