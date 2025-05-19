'use server'

import { auth, db } from '@/firebase/admin'
import { cookies } from 'next/headers'


const ONE_WEEK = 60 * 60 * 24 * 7 * 1000

export async function signUp(params: SignUpParams) {
  const {uid, name, email} = params

  try {
    const userRecord = await db.collection('user').doc(uid).get()

    if (userRecord.exists) {
      return {
        success: false,
        message: 'User already exists, please Try to sign in.'
      }
    }

    await db.collection('user').doc(uid).set({
      name,
      email
    })


    return {
      success: true,
      message: 'User created successfully, Please sign in'
    }

  } catch(e) {

    if(e.code === 'auth/email-already-exists') {
      return {
        success: false,
        message: 'Email already in use'
      }
    }


    return {
      success: false,
      message: "Something went wrong"
    }
  }
}

export async function setSessionCookie(idToken: string) {
  const cookieStore = await cookies()

  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn: ONE_WEEK
  })

  cookieStore.set('session', sessionCookie, {
    maxAge: ONE_WEEK,
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    secure: process.env.NODE_ENV === 'production'
  })

}

export async function signIn(params: SignInParams) {
  const {email, idToken} = params

  try {
    const userRecord = await auth.getUserByEmail(email)

    if(!userRecord) {
      return {
        success: false,
        message: 'User not found'
      }
    }

    await setSessionCookie(idToken)

    return {
      success: true,
      message: 'User signed in successfully'
    }
  } catch (e) {
    console.log(e)
    return {
      success: false,
      message: 'Something went wrong'
    }

  }
}

export async function getCurrentUser(): Promise<{ uid: string; email?: string } | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('session')?.value;

  if (!sessionCookie) return null;

  try {
    const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);

    return {
      uid: decodedClaims.uid,
      email: decodedClaims.email,
    };
  } catch (e) {
    console.error('Session verification failed:', e);
    return null;
  }
}

export async function isAuthenticated(): Promise<boolean> {
  const user = await getCurrentUser();
  return !!user;
}
