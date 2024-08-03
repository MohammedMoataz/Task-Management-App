import * as bcrypt from 'bcrypt'
import { config } from 'dotenv'

config()
const SALT_ROUNDS = process.env.SALT_ROUNDS as string

/**
 * Encrypts a payload using bcrypt.
 *
 * @param payload The payload to be encrypted.
 * @param callback The function to be called when the encrypted payload has been successfully
 * generated. The callback will be passed two arguments: an error (which will be null if there were
 * no errors), and the encrypted payload.
 */
export const hashData = async (
  payload: string | Buffer,
  callback?: (err: Error | null, encrypted: string) => void,
): Promise<string> => {
  // Generate a salt with the specified number of rounds.
  const saltRounds = parseInt(SALT_ROUNDS)
  const salt = await new Promise<string>((resolve, reject) => {
    bcrypt.genSalt(saltRounds, (err: any, salt: string | PromiseLike<string>) => {
      err ? reject(err) : resolve(salt)
    })
  })

  // Generate the hashed payload using the generated salt.
  return new Promise<string>((resolve, reject) => {
    bcrypt.hash(payload, salt, (err: any, encrypted: string | PromiseLike<string>) => {
      err ? reject(err) : resolve(encrypted)
    })
  }).then((encrypted) => {
    // If a callback was specified, call it with the encrypted payload.
    if (callback) callback(null, encrypted)

    // Always return the encrypted payload.
    return encrypted
  })
}

/**
 * Compares a piece of data against a hash to see if the hash is relevant to the data.
 *
 * @param data The data to be compared against the hash. This should be the data that was originally
 * hashed. The data can be a string or a Buffer.
 * @param hash The hash to be compared against. This should be the hash that was generated when the
 * data was originally hashed.
 *
 * @returns Nothing. The result of the comparison will be returned via a callback.
 */
export const compareHashedData = async (
  data: string,
  encrypted: string,
): Promise<boolean> => {
  console.log({ data, encrypted })
  return await bcrypt.compare(data, encrypted)
}