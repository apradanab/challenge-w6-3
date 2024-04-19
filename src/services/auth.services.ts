/* eslint-disable @typescript-eslint/member-ordering */

import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";

export type Payload = { // Name, email
  id: string,
  role: string
} & jwt.JwtPayload;

export class Auth {

  static secret = process.env.SECRET_JWT;
  authentication: any;

  static async hash(value: string) {
    return hash(value, 10)
  }

  static async compare(value: string, hash: string) {
    return compare(value, hash)
  }

  static signJwt(payload: Payload) {
    if (!Auth.secret) throw new Error('JWT secret not set')
    return jwt.sign( payload, Auth.secret) 
  }

  static verifyJwt(token: string) {
    if(!Auth.secret) throw new Error('JWT secret not set')
    return jwt.verify(token, Auth.secret)
  }
}