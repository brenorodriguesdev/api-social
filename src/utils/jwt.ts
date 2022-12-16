import * as jwt from 'jsonwebtoken'

const compare = async (string: string): Promise<any> => {
  try {
    const decoded = await jwt.verify(string, process.env.APP_SECRET)
    return decoded
  } catch (error) {
    return undefined
  }
}

const generate = async (data: any): Promise<string> => jwt.sign({ data }, process.env.APP_SECRET, { expiresIn: '1h' })

export { compare, generate }
