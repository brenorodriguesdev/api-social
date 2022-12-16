
import * as bcrypt from 'bcrypt'

const compare = async (string: string, stringHash: string): Promise<boolean> => await bcrypt.compare(string, stringHash)

const crypt = async (string: string): Promise<string> => await bcrypt.hash(string, 8)

export { compare, crypt }
